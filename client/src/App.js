import Home from "./Routes/Visitor/Landing/Landing";
import { Routes, Route } from "react-router-dom"
import SignIn from "./Routes/Visitor/SignIn/SignIn";
import Navigationbar from "./Components/NavigationBar/NavigationBar";
import Landing from "./Routes/Visitor/Landing/Landing";
import Footer from "./Components/Footer/Footer";
import ManageRequests from "./Routes/WarehouseOwner/MangaRequests/ManageRequests";


function App() {
  return (
    <div>
      <Routes>
        
      <Route path="" element={<Footer></Footer>}>


       {/* VISITOR PATH */}
      <Route path='/' element={<Navigationbar></Navigationbar>}> 
      
          <Route path='' element={<Landing></Landing>}></Route>
          <Route path='login' element={<SignIn></SignIn>}></Route>
          <Route path='managerequests' element={<ManageRequests></ManageRequests>}></Route>
      </Route>




      </Route>

      </Routes>
    </div>
  )
}

export default App;
