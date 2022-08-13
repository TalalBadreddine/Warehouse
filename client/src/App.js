import './index.css'
import Home from "./Routes/Visitor/Landing/Landing";
import { Routes, Route } from "react-router-dom"
import SignIn from "./Routes/Visitor/SignIn/SignIn";
import Navigationbar from "./Components/NavigationBar/NavigationBar";
import Landing from "./Routes/Visitor/Landing/Landing";
import Footer from "./Components/Footer/Footer";
import PostNewWarehouse from "./Routes/WarehouseOwner/PostNewWarehouse/PostNewWarehouse";
import SearchWarehouse from "./Routes/Visitor/SearchWarehouse/SearchWarehouse";
import "../node_modules/react-bootstrap/dist/react-bootstrap.js"
import "../node_modules/bootstrap/dist/css/bootstrap.css"
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import AboutUs from './Routes/Visitor/AboutUs/AboutUs';
import WarehouseDetails from './Routes/Customer/WarehouseDetails/WarehouseDetails';
import ManageRequests from './Routes/WarehouseOwner/MangaRequests/ManageRequests'
import MyWarehouses from './Routes/WarehouseOwner/MyWarehouses/MyWarehouses';


function App() {
  return (
    <div>
      <Routes>

        {/* <Route path="" element={<Footer></Footer>}> */}


        {/* VISITOR PATH */}
        <Route path='/' element={<Navigationbar role='visitor'></Navigationbar>}>

          <Route path='' element={<Landing></Landing>}></Route>
          <Route path='login' element={<SignIn></SignIn>}></Route>
          <Route path='findASpace' element={<SearchWarehouse role={'visitor'} />}></Route>
          <Route path='aboutUs' element={<AboutUs></AboutUs>}></Route>

        </Route>

        {/* CUSTOMER PATH */}
        <Route path='customer/' element={<Navigationbar role='customer'></Navigationbar>}>

          <Route path='' element={<SearchWarehouse role={'customer'}></SearchWarehouse>}></Route>
          <Route path='warehouseDetails' element={<WarehouseDetails></WarehouseDetails>}></Route>



        </Route>


        {/* </Route> */}

        <Route path='owner/' element={<Navigationbar role="owner"></Navigationbar>}>

          <Route path='' element={<MyWarehouses></MyWarehouses>}></Route>
          <Route path='addWarehouse' element={<PostNewWarehouse></PostNewWarehouse>}></Route>
          <Route path='warehouseRequests' element={<ManageRequests> </ManageRequests>}></Route>

        </Route>


      </Routes>

    </div>
  )
}

export default App;