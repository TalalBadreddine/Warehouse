
import React from 'react'
import { Routes, Route } from "react-router-dom"
// import Login from './Routes/Visitor/LoginBackup/Login'
// import Requests from "./Routes/Visitor/Requests/Requests"
import ManageWarehouseOwner from './Routes/Admin/ManageWarehouseOwner/ManageWarehouseOwner'
import WarehouseOwnerDetails from './Routes/Admin/WarehouseOwnerDetails/WarehouseOwnerDetails'
const App = () => {
  return (
    <div>
      <Routes>
        <Route path='admin/WarehouseOwnerDetails' element={<WarehouseOwnerDetails></WarehouseOwnerDetails>}></Route>



      </Routes>

      <ManageWarehouseOwner />
      {/* <AboutUs/>  */}

      {/* <Requests/> */}

      {/* <Login/> */}
      
      {/* <WarehouseOwnerDetails /> */}
    </div>

  )
}

export default App






