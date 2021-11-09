/* eslint-disable no-unused-vars */
import React, { Component } from "react";
import axios from "axios";
import RecipeReviewCard from "../components/RecipeReviewCard";
import Cookies from 'js-cookie';
import FloatingActionButtons from '../components/FloatingButton';
import CustomizedSnackbars from '../components/CustomizedSnackbars';
import BasicTable from "../components/ProductListTable";
import AppBarVendor from "../components/AppBarVendor"
import Container from '@mui/material/Container';
import theme from "../components/theme";
import { ThemeProvider } from '@material-ui/core/styles';
import withRoot from '../components/WithRoot';
import { CssBaseline } from "@mui/material";
import Grid from '@mui/material/Grid';
import { Box } from "@mui/system";
import styles from "../assets/styles";
import { Link } from "@mui/material";
import AddressCard from './AddressCard'
import { Button } from "@mui/material";
import Popup from "./popup";
import AddAddressForm from "./AddAddressForm";
import { useState, useEffect } from "react"




function ManageAddress() {
  const [openPopup, setOpenPopup] = useState(false);
  const [address, setAddress] = useState([]);
  const [callFlag,setCallFlag] = useState(false);
  const [user,setUser] = useState("");
  const [errAlert,setErrAlert] = useState("");
  const [message,setMessage] = useState("");
  const [deleteAddress,setDeleteAddress] = useState("");
  const [recordForEdit, setRecordForEdit] = useState(null)
  const [isEdit, setIsEdit] = useState(false)

  

  function refreshPage() {
    setTimeout(()=>{
        window.location.reload(true);
    }, 10);
    console.log('page to reload')
  }   

  const openInPopup = item => {
    setRecordForEdit(item)
    setOpenPopup(true)
}

  async function delAddress(address){
   
    setCallFlag(false)
    const Bearer = "Bearer "+ Cookies.get('token')
    console.log(Bearer)
    let axiosConfig = {
      headers: {
          'Content-Type': 'application/json;charset=UTF-8',
          "Authorization" : Bearer
      }
    };

    if(!Cookies.get('token')){
      setErrAlert("error")
      setMessage("Can not delete address")

     
  }
    try{
      const hitback =  await axios.delete(`https://eshop-spot-backend.herokuapp.com/address/${address._id}`,axiosConfig, {
        withCredentials: true
        
    });
    console.log(hitback.data)
    // this.setState({ products: hitback.data });
    setErrAlert("success")
    setMessage("Address deleted")
    setDeleteAddress(address.name)
    setCallFlag(true)
    refreshPage()
   
    
    

    }catch(e){
      setErrAlert("error")
      setCallFlag(true)
      setMessage("Something went wrong")
      console.log("in error")
      console.log(e)
    }
  }

  const getAddresses = async () => {

    const Bearer = "Bearer "+ Cookies.get('token')
    let axiosConfig = {
     headers: {
         'Content-Type': 'application/json;charset=UTF-8',
         "Authorization" : Bearer
     }
    };

    try{
       
       const hitback =  await axios.get("https://eshop-spot-backend.herokuapp.com/addresses/mine",axiosConfig, {
                 withCredentials: true
               });
               
               console.log(hitback)
               setAddress(hitback.data)
               console.log(address)
 
     }catch(e){
    
           this.setState.callFlag = true
           this.state.errAlert = "error"
           this.state.message ="Invalid Authentication"
           console.log("in error")
           console.log(e)
       }
     };

  useEffect(() => {
    if(!Cookies.get('token')){
        setCallFlag(true)
        setErrAlert("error")
        setMessage("Invalid authentication")
    }
    getAddresses();
  },[]);
 

  
      return(
         
        <ThemeProvider theme={theme}>
        <CssBaseline/>
        { callFlag && <CustomizedSnackbars errAlert={errAlert}message={message} /> } 
        <Container sx={{ py: 6 }} >
          <Grid container spacing={3} >
            {address.map(currentaddress => (
              <Grid item key={currentaddress} xs={3} style={styles.CardGridAddress}>
                  <AddressCard address={currentaddress}
                                delAddress={delAddress} 
                                openInPopup={openInPopup}/>
              </Grid>
            ))}
          </Grid>
        </Container>
            <Button onClick={() => setOpenPopup(true)} variant="body2">
                <FloatingActionButtons addIcon={true} text="Add Address" />
            </Button>

            <Popup
                title="Add Address"
                openPopup={openPopup}
                setOpenPopup={setOpenPopup}
            >
                <AddAddressForm 
                    recordForEdit={recordForEdit} 
                    setOpenPopup={setOpenPopup}
                    />
                
            </Popup>
        </ThemeProvider>
  );
    

}

export default withRoot(ManageAddress)