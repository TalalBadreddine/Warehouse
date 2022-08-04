import Home from "./Routes/Visitor/Home/Home";
import {BrowserRouter,Routes,Route} from "react-router-dom"


function App() {
  return (
    <div>
    
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
