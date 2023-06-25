import './App.css';
import ExportToPdf from './generatePdf';
import MapChart from './components/map';

function App() {
  return (
    <div className="App">
      <div id="map">
        <MapChart />
      </div>
      <button className="default-button" onClick={ExportToPdf}>Export</button>
    </div>
  );
}

export default App;

