/* eslint-disable no-unused-vars */
import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import strings from '../assets/strings';
import theme from './theme'
import { ThemeProvider } from '@material-ui/core/styles';
import styles from '../assets/styles';
import Link from '@mui/material/Link';
import IconButton from '@mui/material/IconButton';
import Badge from '@mui/material/Badge';
import MoreIcon from '@mui/icons-material/MoreVert';
import AccountCircle from '@mui/icons-material/AccountCircle';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import LogoutIcon from '@mui/icons-material/Logout';
import { useState, useEffect } from "react"
import Cookies from 'js-cookie';
import axios from "axios";
import { useHistory } from 'react-router';



export default function ButtonAppBar() {

  const [callFlag,setCallFlag] = useState(false);
  const [errAlert,setErrAlert] = useState("");
  const [message,setMessage] = useState("");

  const history = useHistory();


  useEffect(() => {
    if(!Cookies.get('token')){
      setCallFlag(true)
      setErrAlert("error")
      setMessage("Invalid authentication")
    }
      }, [])

  async function logoutCustomer(){

    const Bearer = "Bearer "+ Cookies.get('token')
    let axiosConfig = {
     headers: {
         'Content-Type': 'application/json;charset=UTF-8',
         'Authorization' : Bearer 
     }
    };


    try{


      axios.post(`https://eshop-spot-backend.herokuapp.com/customer/logout`,axiosConfig,{
              withCredentials: true 
            })
                .then(response =>{ 
                  Cookies.remove()
                console.log("Customer Logged out ") 
              })
                .catch(error => {console.log(error)})
                history.push({
                  pathname: '/customer/login',
                });
    }
    catch(err){
      Cookies.remove()
      
      setErrAlert("error")
      setCallFlag(true)
      setMessage("Invalid Data")
      console.log("in error")
      console.log(err)
      history.push({
        pathname: '/customer/login',
      });
    }
  }


  return (
    <ThemeProvider theme={theme}>
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" style={styles.Header} color='primary'>
      <Toolbar style={styles.Toolbar}>
            
          <Typography  component="div" sx={{ flexGrow: 1 , fontSize:24}}>
            <Link 
              underline="none" 
              variant="h5" 
              color="inherit" 
              href="/customer/home"
              sx={{ fontSize: 24 }}>
            {strings.Common.websiteName}
            </Link>
          </Typography>

          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
            <IconButton 
              size="large" 
              aria-label="show number of products in cart" 
              color="inherit"
              href="/customer/cart">
              <Badge 
                  // badgeContent={4} 
                  color="secondary">
                <ShoppingCartIcon />
              </Badge>
            </IconButton>

            <IconButton
              size="large"
              aria-label="account of current user"
              href="/customer/profile"
              color="inherit"
            >
              <AccountCircle />
            </IconButton>

            <IconButton
              size="large"
              edge="end"
              onClick={() => logoutCustomer()}
              color="inherit"
            >
              <LogoutIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
    </ThemeProvider>

  );
}
