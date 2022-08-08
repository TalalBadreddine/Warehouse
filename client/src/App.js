import './index.css'
import "../node_modules/react-bootstrap/dist/react-bootstrap.js"
import "../node_modules/bootstrap/dist/css/bootstrap.css"
import SearchWarehouse from "./Routes/Visitor/SearchWarehouse/SearchWarehouse";
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file



function App() {
  return (
    <div>

      <SearchWarehouse></SearchWarehouse>    
    </div>
  );
}

export default App;
