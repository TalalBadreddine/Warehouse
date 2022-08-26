import './index.css'
import Home from "./Routes/Visitor/Landing/Landing";
import { Routes, Route, Navigate } from "react-router-dom"
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
import SideBar from './Components/SideBar/SideBar'

import ManageUsers from './Routes/Admin/ManageUsers/ManageUsers';
import ViewWarehouseDetails from './Routes/WarehouseOwner/ViewWarehouseDetails/ViewWarehouseDetails';
import CustomerRequests from './Routes/Customer/CustomerRequests/CustomerRequests';
import UserDetails from './Components/UserDetails/UserDetails';
import WarehouseRequests from './Routes/Admin/WarehouseRequests/WarehouseRequests';
import ManageWarehouseOwner from './Routes/Admin/ManageWarehouseOwner/ManageWarehouseOwner'
import UserActivity from './Routes/Admin/UserActivity/UserActivity';
import Statistics from './Routes/Admin/Statistics/Statistics';
import WarehouseOwnerDetails from './Routes/Admin/WarehouseOwnerDetails/WarehouseOwnerDetails';
import LoginAdmin from './Routes/Admin/AdminLogin(Test)/LoginAdmin';

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
          <Route path='postNewWarehouse' element={<PostNewWarehouse></PostNewWarehouse>}></Route>

        </Route>


        {/* CUSTOMER PATH */}
        <Route path='customer/' element={<Navigationbar role='customer'></Navigationbar>}>

          <Route path='' element={<SearchWarehouse role={'customer'}></SearchWarehouse>}></Route>
          <Route path='warehouseDetails' element={<WarehouseDetails></WarehouseDetails>}></Route>
          <Route path='requests' element={<CustomerRequests></CustomerRequests>}></Route>

        </Route>


        {/* </Route> */}

        <Route path='owner/' element={<Navigationbar role="owner"></Navigationbar>}>

          <Route path='' element={<MyWarehouses></MyWarehouses>}></Route>
          <Route path='myWarehouses' element={<MyWarehouses></MyWarehouses>}></Route>
          <Route path='addWarehouse' element={<PostNewWarehouse></PostNewWarehouse>}></Route>
          <Route path='warehouseRequests' element={<ManageRequests> </ManageRequests>}></Route>
          <Route path='viewWarehouseDetails' element={<ViewWarehouseDetails></ViewWarehouseDetails>}></Route>

        </Route>


        <Route path='admin/' element={<SideBar></SideBar>}>

             <Route path='' element={<ManageUsers></ManageUsers>}></Route>
             <Route path='userdetails' element={<UserDetails></UserDetails>}></Route>
             <Route path='requests' element={<WarehouseRequests></WarehouseRequests>}></Route>
             <Route  path='manageOwner' element={<ManageWarehouseOwner></ManageWarehouseOwner>}></Route>
             <Route path = 'userActivity' element={<UserActivity></UserActivity>}></Route>
             <Route path='statistics' element={<Statistics></Statistics>}></Route>
             <Route path='WarehouseOwnerDetails' element={<WarehouseOwnerDetails></WarehouseOwnerDetails>}></Route>
             

        </Route>

       
        <Route path='adminLogin' element={<LoginAdmin></LoginAdmin>}></Route>
        {/* <Route path='*' element={<Navigate to='/' />} /> */}

      </Routes>

    </div>
  )
}

export default App;