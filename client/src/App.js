// import react from 'react';

// import { Routes, Route } from "react-router-dom" 
// import Navbar from './components/Navbar';

// import AboutUs from './Routes/Visitor/AboutUs/AboutUs';
//  import Requests from './Routes/Visitor/Requests'

// import Contact from './Routes/Visitor/Contact/Contact'
// class App extends Component {
//   render() {
//     return (
      
//       <Routes>
//         <div className="App">
          
//           <Route path="/" exact strict component={AboutUs}/>
//           <Route path="/requests" exact strict component={Requests}/>
//           <Route path="/requests/contact" exact strict component={Contact}/>
         
//         </div>
//       </Routes>
//     );
//   }
// }

// export default App;
 
import React from 'react'
import Login from './Routes/Visitor/LoginBackup/Login'
// import Requests from "./Routes/Visitor/Requests/Requests"

const App = () => {
  return (
    <div>
      {/* <AboutUs/>  */}
      {/* <Requests/> */}
      {/* {/* <Contact/> */}
       {/* <Requests/> */}
      {/* <Contact/> */}
      <Login/>
      
    </div>
  )
}

export default App