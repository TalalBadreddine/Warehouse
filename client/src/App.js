import './index.css'
import Home from "./Routes/Visitor/Landing/Landing";
import { Routes, Route } from "react-router-dom"
import SignIn from "./Routes/Visitor/SignIn/SignIn";
import Navigationbar from "./Components/NavigationBar/NavigationBar";
import Landing from "./Routes/Visitor/Landing/Landing";
import Footer from "./Components/Footer/Footer";
import PostNewWarehouse from "./Routes/WarehouseOwner/PostNewWarehouse";
import SearchWarehouse from "./Routes/Visitor/SearchWarehouse/SearchWarehouse";
import "../node_modules/react-bootstrap/dist/react-bootstrap.js"
import "../node_modules/bootstrap/dist/css/bootstrap.css"
import 'react-date-range/dist/styles.css'; 
import 'react-date-range/dist/theme/default.css'; 
import AboutUs from './Routes/Visitor/AboutUs/AboutUs';
import ManageUsers from './Routes/Admin/ManageUsers/ManageUsers';


function App() {
  return (
    <div>
       <Routes>
        
      {/* <Route path="" element={<Footer></Footer>}> */}


       {/* VISITOR PATH */}
      <Route path='/' element={<Navigationbar role='visitor'></Navigationbar>}> 
      
          <Route path='' element={<Landing></Landing>}></Route>
          <Route path='login' element={<SignIn></SignIn>}></Route>
          <Route path='findASpace' element={<SearchWarehouse/>}></Route>
          <Route path='aboutUs' element={<AboutUs></AboutUs>}></Route>
          <Route path='manageusers' element={<ManageUsers></ManageUsers>}></Route>
      </Route>




      {/* </Route> */}

      </Routes> 


    </div>
  )
}

export default App;