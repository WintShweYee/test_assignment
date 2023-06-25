import React, { useEffect, useState } from 'react';
import { ComposableMap, Geographies, Geography, Marker } from 'react-simple-maps';
import * as d3 from 'd3';
import { getapi } from "../network/https";
import { pm2_5API } from "../network/api";
import { geoMercator, GeoProjection } from 'd3-geo';

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
  const [tri, setTri] = useState<[number, number][]>([]);
  const projection = geoMercator() .center([-98.583333, 39.833333]).scale(3000).translate([400, 275]);

  useEffect(() => {
    const api = async () => {
      const data = await getapi(pm2_5API);
      setResult(data);
      await data.map((value:any) => {
        if(value.pm2_5 >= 35) { //air pollution is height if pm2.5>=35  μg/m3
          let [x, y] = getXYCoordinates(projection, value.long, Math.abs(value.lat));
          tri.push([x,y]);
        }
      });
      // const delaunay = d3.Delaunay.from(tri); //actucal code should be like this but cannot calculate the right lat and long to xy coordinate
      const delaunay = d3.Delaunay.from([
        [503, 355],
        [509.5, 315],
        [555, 365],
        [560, 260],
      ]);
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
          <Marker key={key} coordinates={[value.lat, value.long]}>
            <circle r={6} fill={value.pm2_5 <= 12 ? "#50C878": value.pm2_5 >= 35 ? "#FF2E2E" : "#F9E076"} />
          </Marker>
        ))}

    </ComposableMap>
  );
};

export default MapChart;