import Home from "./Routes/Visitor/Home/Home";
import {BrowserRouter,Routes,Route} from "react-router-dom"
import SignIn from "./Routes/Visitor/SignIn/SignIn";


function App() {
  return (
    <div>

      <SignIn/>
      
    
     <BrowserRouter>
     <Routes>
     <Route path="/Home" element= {<Home/>} />
     {/* <Route path="" element= {} />
     <Route path="" element= {} /> */}



     </Routes>
     
     
     
     
     </BrowserRouter>
    </div>
  )
}

export default App;
 