import React from 'react';
import { useState } from 'react';
import { Link } from "react-router-dom";
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import { Dashboard, Dvr, JoinFull, LeakAdd, ManageSearch, PersonAdd, PostAdd, Store  } from '@mui/icons-material';
import styled from 'styled-components'
import { ListItem } from '@mui/material';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import logo from "../imgs/muljis_logo.png"
import AirplaneTicketIcon from '@mui/icons-material/AirplaneTicket';
import CheckIcon from '@mui/icons-material/Check';



const drawerWidth = 280;

function Sidebar(props) {

    const Links = styled(Link)`
    width:100%;
    height:35px;
    padding:4px 0 0 6px;
    text-decoration:none;
    color:black;
    line-height:30px;
    &:hover{
        color:white;
    `
    const List = styled.div`
    &:hover{
        background-color:#3596d9;
        color:white;
    }
    `

    const Profile = styled.div`{
        background-color:beige;
        font-size:25px;
        color:grey;
        position:relative;
    }
    `



    const { window } = props;
    const [mobileOpen, setMobileOpen] = useState(false);
    const [selector, setSelector] = useState(0);

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    const handleSelect = (event, index) => {
        setSelector(index)
       
    }

     console.log(selector, "selector")


    const drawerList = (
        <div>
            <Profile>
                <ListItem>
                    <img src={logo}  height={50} width={60} />
                    <p style={{paddingTop:"0", position:"absolute",top:"28%",left:"30%", color:"#bd9334"}}>Bullion</p>
                </ListItem>
            </Profile>
            <List className={selector == 1 ? "selector_color" : ""} onClick={(e, index) => handleSelect(e, 1)}>
                <ListItem onClick={(e, index) => handleSelect(e, 1)}>
                    <Dashboard />
                    <Links to='/home'>Dashboard</Links>
                </ListItem>
            </List>
            <Divider />
            <List className={selector == 2 ? "selector_color" : ""} onClick={(e, index) => handleSelect(e, 2)}>
                <ListItem>
                    <JoinFull />
                    <Links to='/'>Products</Links>
                </ListItem>
            </List>
            <Divider />
            <List>
                <ListItem>
                    <LeakAdd />
                    <Links to='/Bullion_Sold_Product'>Orders</Links>
                </ListItem>
            </List>
            <Divider />
            <List>
                <ListItem>
                    <PersonAdd />
                    <Links to='/userformaddsupplier'>Add Supplier</Links>
                </ListItem>
            </List>
            <Divider />
            <List>
                <ListItem >
                    <PersonOutlineIcon />
                    <Links to='/Client_balance'>Client Balance</Links>
                </ListItem>
            </List>
            <Divider />
            <List>
                <ListItem >
                    <AirplaneTicketIcon />
                    <Links to='/ordertosupplier'>Order To Supplier</Links>
                </ListItem>
            </List>
            <Divider />
            <List>
                <ListItem >
                    <CheckIcon />
                    <Links to='/clientpurchase'>Client purchase</Links>
                </ListItem>
            </List>
            <List>
                <ListItem>
                    <PostAdd />
                    <Links to='/Sale_Reciept' >Sale Reciept</Links>
                
                </ListItem>
            </List>
            <Divider />
        </div >
    );

    const container = window !== undefined ? () => window().document.body : undefined;

    return (
        <>
            <CssBaseline />
            {/* <AppBar
                position="fixed"
                sx={{
                    width: { sm: `100%` },
                    ml: { sm: `${drawerWidth}px` },
                    backgroundColor: "#2196f3"
                }}
            >
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        edge="start"
                        onClick={handleDrawerToggle}
                        sx={{ mr: 2, display: { sm: 'none' } }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography
                        variant="h6"
                        noWrap
                        component="div"
                    >
                        Bullion Dashboard
                    </Typography>
                </Toolbar>
            </AppBar> */}
            <Box sx={{ display: 'flex', }}>
                <Box
                    component="nav"
                    sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
                    aria-label="mailbox folders"
                >
                    {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
                    <Drawer
                     style={{overflow:"auto"}}
                        container={container}
                        variant="temporary"
                        open={mobileOpen}
                        onClose={handleDrawerToggle}
                        ModalProps={{
                            keepMounted: false, // Better open performance on mobile.
                        }}
                        sx={{
                            display: { xs: 'block', sm: 'none' },
                            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth, }
                        }}
                    >
                        {drawerList}
                    </Drawer>
                    <Drawer
                    
                        variant="permanent"
                        sx={{
                            display: { xs: 'none', sm: 'block' },
                            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth, marginTop: "", zIndex: "45",overflowY:"auto",height:"100vh" },
                        }}
                        open
                    >
                        {drawerList}
                    </Drawer>
                </Box>

            </Box>
        </>
    );
}

Sidebar.propTypes = {
    /**
     * Injected by the documentation to work in an iframe.
     * You won't need it on your project.
     */
    window: PropTypes.func,
};
export default Sidebar;