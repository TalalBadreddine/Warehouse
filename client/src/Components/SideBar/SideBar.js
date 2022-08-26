import * as React from 'react'; 
import Box from '@mui/material/Box'; 
import Drawer from '@mui/material/Drawer'; 
import Button from '@mui/material/Button'; 
// import List from '@mui/material/List'; 
import Divider from '@mui/material/Divider'; 
// import ListItem from '@mui/material/ListItem'; 
import ListItemButton from '@mui/material/ListItemButton'; 
import ListItemIcon from '@mui/material/ListItemIcon'; 
import ListItemText from '@mui/material/ListItemText'; 
import InboxIcon from '@mui/icons-material/MoveToInbox'; 
import MailIcon from '@mui/icons-material/Mail'; 
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts'; 
import DashboardIcon from '@mui/icons-material/Dashboard'; 
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward'; 
import AccessibilityIcon from '@mui/icons-material/Accessibility'; 
import LogoutIcon from '@mui/icons-material/Logout'; 
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight'; 
import ui from '../../themes'
import { 
  LineStyle, 
  Timeline, 
  TrendingUp, 
  Group, 
  Info, 
  Storefront, 
  AttachMoney, 
  BarChart, 
  MailOutline, 
  DynamicFeed, 
  ChatBubbleOutline, 
  WorkOutline 
} from "@material-ui/icons"; 
 
// import Link from '@mui/material/Link'; 
import { Outlet, useNavigate } from 'react-router-dom'; 
import axios from 'axios'; 
import { 
  Container, 
  Wrapper, 
  SidebarMenu, 
  Title, 
  List, 
  ListItem 
} from "./SideBarStyles"; 
 
import { Link } from "react-router-dom"; 
 
 
 
// TODO:add link from router-dom 
function SideBar() { 
  const navigate = useNavigate() 
 
  const Logout = () => { 
    axios.get('/logout').then((data) => { 
      navigate('/') 
    }) 
  } 
 
// const [state, setState] = React.useState({ 
//      top: false, 
//      left: false, 
//      bottom: false, 
//      right: false, 
//   }); 
  // const toggleDrawer = (anchor, open) => (event) => { 
  //   if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) { 
  //     return; 
  //   } 
 
  //   setState({ ...state, [anchor]: open }); 
  // }; 
  //  const list = (anchor) => ( 
  //   <Box 
  //     sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 250 }} 
  //     role="presentation" 
  //     onClick={toggleDrawer(anchor, false)} 
  //     onKeyDown={toggleDrawer(anchor, false)} 
  //   > 
       
    
 
  return ( 
   <div className='col-12 d-flex'>
    <div className='col-3'> 
     
        <SidebarMenu style={{  backgroundColor:`${ui.searchesInput}`, width:'300px' ,height:'100%'}}> 
        <Title>Dashboard</Title> 
        <List> 
        {['Home' ].map((text, index) => ( 
          <ListItem key={text} disablePadding> 
            <Link to="/AdminHome" style={{color:'white' }} className="link">  
            
              <ListItem> 
                <LineStyle className="icon" /> 
                <div>{text}</div> 
              </ListItem> 
            </Link> 
          </ListItem> 

        ))} 
      </List> 
      <List> 
        {['Manage Users' ].map((text, index) => ( 
          <ListItem key={text} disablePadding> 
            <Link to="/admin/manageUsers" style={{color:'white' }} className="link">  
            
              <ListItem> 
                <Timeline className="icon" /> 
                <div>{text}</div> 
              </ListItem> 
            </Link> 
          </ListItem> 
        ))} 
      </List> 
      <List> 
        {['Users' ].map((text, index) => ( 
          <ListItem key={text} disablePadding> 
            <Link to="/admin/userdetails" style={{color:'white' }} className="link">  
            
              <ListItem> 
                <Group className="icon" /> 
                <div>{text}</div> 
              </ListItem> 
            </Link> 
          </ListItem> 
        ))} 
      </List> 
      <Title>Quick Menu</Title> 
      <List> 
        {['Manage warehouse Owner' ].map((text, index) => ( 
          <ListItem key={text} disablePadding> 
            <Link to="/admin/manageowner" style={{color:'white' }} className="link">

            <ListItem> 
                <WorkOutline className="icon" /> 
                <div>{text}</div>
</ListItem> 
            </Link> 
          </ListItem> 
        ))} 
      </List> 
      <Divider /> 
 
            
      <Divider /> 
 
             
                  <List> 
        {['Requests' ].map((text, index) => ( 
          <ListItem key={text} disablePadding> 
          <Link to="/admin/requests" style={{color:'white' }} className="link">  

            <ListItem> 
              <Timeline className="icon" /> 
              <div>{text}</div> 
            </ListItem> 
          </Link> 
        </ListItem> 
        ))} 
      </List> 
      <List> 
        {['Warehouses' ].map((text, index) => ( 
          <ListItem key={text} disablePadding> 
          <Link to="/warehouses" style={{color:'white' }} className="link">  
           
            <ListItem> 
              <Storefront className="icon" /> 
              <div>{text}</div> 
            </ListItem> 
          </Link> 
        </ListItem> 
        ))} 
      </List> 
      <Divider /> 
               <List> 
        {['User Activity' ].map((text, index) => ( 
          <ListItem key={text} disablePadding> 
          <Link to="/admin/userActivity" style={{color:'white' }} className="link">  
            <ListItem> 
              <AccessibilityIcon className="icon" /> 
              <div>{text}</div> 
            </ListItem> 
          </Link> 
        </ListItem> 
        ))} 
      </List> 
      <Divider /> 
             
 
 
      <Title>Notifications</Title> 
      <List> 
        {['Feedback' ].map((text, index) => ( 
          <ListItem key={text} disablePadding> 
          <Link to="/feedback" style={{color:'white' }} className="link">  
            <ListItem> 
              <DynamicFeed className="icon" /> 
              <div>{text}</div> 
            </ListItem> 
          </Link> 
        </ListItem> 
        ))} 
      </List> 
      <List> 
        {['Messages' ].map((text, index) => ( 
          <ListItem key={text} disablePadding> 
          <Link to="/4" style={{color:'white' }} className="link">  
            <ListItem> 
              <ChatBubbleOutline className="icon" /> 
              <div>{text}</div> 
            </ListItem> 
          </Link> 
        </ListItem> 
        ))} 
      </List> 
      <List> 
 
      <ListItem disablePadding> 
          <Link to="/4" style={{color:'white' }} className="link">  
          
            <ListItem> 
<ListItemText primary={'Logout'}  onClick={(e) =>{ 
                e.preventDefault() 
                Logout() 
                } }/> 
              <LogoutIcon className="icon" /> 
             
            </ListItem> 
          </Link> 
        </ListItem> 
      </List> 
      </SidebarMenu> 
       
    </div> 
    <div className='col-9'>
    <Outlet></Outlet></div>
    </div>
)} 
 
export default SideBar