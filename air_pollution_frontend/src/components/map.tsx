import React, { useEffect, useState } from 'react';
import { ComposableMap, Geographies, Geography, Marker } from 'react-simple-maps';
import * as d3 from 'd3';
import { getapi } from "../network/https";
import { pm2_5API } from "../network/api";
import { geoMercator } from 'd3-geo';

interface CustomTriangleProps {
  triangle: number[][];
}

const geoUrl = "https://raw.githubusercontent.com/deldersveld/topojson/master/continents/north-america.json";

const CustomTriangle: React.FC<CustomTriangleProps> = ({ triangle }) => {
  const points = triangle.map((point) => point.join(',')).join(' ');
  return <polygon points={points} fill="#FF2E2E80" stroke="#FF2E2E" />;
};

const getXYCoordinates = (projection:any, longitude:number, latitude:number) => {
  const [px, py] = projection([longitude, latitude]);
  return [px, py];
};


const MapChart: React.FC = () => {
  const [triangles, setTriangles] = useState<number[][][]>([]);
  const [result, setResult] = useState<any>(null);
  const projection = geoMercator().center([-98.583333, 39.833333]).scale(810).translate([379, 265]);

  useEffect(() => {
    const api = async () => {
      const data = await getapi(pm2_5API);
      setResult(data);
  
      const filteredData = data.filter((value: any) => value.pm2_5 > 12);
      let latLongArr:[number, number][] = [];
      await filteredData.map((value: any) => {
        const distances = data.map((location: any) => {
          const lat2 = location.lat;
          const lon2 = location.long;
          const distance = d3.geoDistance([value.long, value.lat], [lon2, lat2]);
          return { location, distance };
        });
        // Sort the distances in ascending order
        distances.sort((a:any, b:any) => a.distance - b.distance);
        if(distances[1].location.pm2_5 > 12) {
          let [x, y] = getXYCoordinates(projection, value.long, value.lat);
          latLongArr.push([x, y]);

          [x,y] = getXYCoordinates(projection, distances[1].location.long, distances[1].location.lat);
          latLongArr.push([x, y]);
        }
        
        if(distances[2].location.pm2_5 > 12) {
          let [x,y] = getXYCoordinates(projection, distances[2].location.long, distances[2].location.lat);
          latLongArr.push([x, y]);
        }

        return latLongArr;
      });

      const delaunay = d3.Delaunay.from(latLongArr); //actucal code should be like this but cannot calculate the right lat and long to xy coordinate
      const triangles = Array.from(delaunay.trianglePolygons());
      setTriangles(triangles);
    };
  
    api();
  }, []);

  return (
    <ComposableMap projection="geoAlbersUsa">
      <Geographies geography={geoUrl}>
        {({ geographies }) =>
          geographies.map((geo) => (
            <Geography key={geo.rsmKey} geography={geo} fill="#DDD" stroke="#FFF"/>
          ))
        }
      </Geographies>
      <g>
        {triangles.map((triangle, index) => (
          <CustomTriangle key={index} triangle={triangle} />
        ))}
      </g>
      {result?.map((value: any, key: number) => (
          <Marker key={key} coordinates={[value.long, value.lat]}>
            <circle r={10} fill={value.pm2_5 <= 12 ? "#50C878": value.pm2_5 >= 35 ? "#FF2E2E" : "#F9E076"} />
          </Marker>
        ))}

    </ComposableMap>
  );
};

export default MapChart;