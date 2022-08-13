import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
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
import Link from '@mui/material/Link';



function SideBar() {

const [state, setState] = React.useState({
     top: false,
     left: false,
     bottom: false,
     right: false,
  });
  const toggleDrawer = (anchor, open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };
   const list = (anchor) => (
    <Box
      sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 250 }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List>
        {['Manage' ].map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton href="/manageusers" variant="contained">
             <ManageAccountsIcon  style={{color:'#54d494',  minWidth: '50px'}}/>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider />

              <List>
        {['Dashboard' ].map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton href="/2" variant="contained">
             <DashboardIcon style={{color:'#54d494' , minWidth: '50px'}}/>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider />

            
                  <List>
        {['Requests' ].map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton href="/3" variant="contained">
             <ArrowDownwardIcon style={{color:'#54d494' , minWidth: '50px'}}/>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider />
               <List>
        {['User Activity' ].map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton href="/4" variant="contained">
             <AccessibilityIcon style={{color:'#54d494' , minWidth: '50px'}}/>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider />
            



      <List>
        {['Logout'].map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton href="/5" variant="contained">
              <LogoutIcon style={{color:'#54d494' , minWidth: '50px'}}/>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <div>
       {[''].map((anchor) => (
        <React.Fragment key={anchor}>
          <Button  style={{color:"#54d494", height:"60px", width:"60px"}} 
          startIcon={<KeyboardArrowRightIcon style={{fontSize:"40px"}}/>} 
          onClick={toggleDrawer(anchor, true)}>
             
            {anchor}

            </Button>
          
          
          <Drawer
            anchor={anchor}
            open={state[anchor]}
            onClose={toggleDrawer(anchor, false)}
          >
            {list(anchor)}
          </Drawer>
        </React.Fragment>
      ))}
    </div>
  )
}

export default SideBar