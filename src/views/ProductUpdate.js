/* eslint-disable no-unused-vars */
import * as React from 'react';
import  { useState } from "react"
import  { useEffect,Component } from "react"
import Cookies from 'js-cookie';
import axios from "axios";
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { ThemeProvider } from '@mui/material/styles';
import FloatingActionButtons from '../components/FloatingButton';
import CustomizedSnackbars from '../components/CustomizedSnackbars';
import AppBar from '../components/AppBar';
import withRoot from '../components/WithRoot';
import theme from '../components/theme'
import strings from '../assets/strings';
import styles from '../assets/styles';
import FileBase from 'react-file-base64';
import { withRouter } from "react-router-dom";
import Paper from "./../components/Paper"





 class ProductUpdate extends Component {
    constructor(props) {
        super(props);
        this.state = {
            productId:this.props.recordForEdit._id,
            item:{},
          name: "",
          description:"",
          quantity:"",
          price:"",
          size:"",
          color:"",
          photo:"",
          loggedin:false,
          errAlert:"",
          message:"",
          loggedin:false,
          updateDate:{}
          
    
        };
      }

      update(e){
          this.setState({loggedin:false})
          var jusJson={}
        e.preventDefault();
        jusJson = {
                      name:this.state.name,
                      description:this.state.description,
                      quantity:this.state.quantity,
                      price:this.state.price,
                      photo:this.state.photo,
                      size:this.state.size,
                      color:this.state.color
                  }

          const Bearer = "Bearer "+ Cookies.get('token')
    let axiosConfig = {
     headers: {
         'Content-Type': 'application/json;charset=UTF-8',
         "Authorization" : Bearer
     }
   };

   axios.patch(`https://eshop-spot-backend.herokuapp.com/product/${this.state.productId}`,jusJson,axiosConfig,{
    withCredentials: true
}).then(response =>{


console.log("customer updated")

    this.setState({item:response.data})
    this.setState({loggedin:true})
    this.setState({errAlert:"success"})
    this.setState({message:"changes updated"})
   
      setTimeout(()=>{
          window.location.reload(true);
      }, 100);
      console.log('page to reload')


}).catch(error => {
    this.setState({loggedin:true})
    this.setState({errAlert:"error"})
    this.setState({message:"Something went wrong"})
    console.log("In error");
    console.log(error);

  });;




        
        console.log(jusJson)
      }


 componentDidMount (){

 
    const Bearer = "Bearer "+ Cookies.get('token')
    let axiosConfig = {
     headers: {
         'Content-Type': 'application/json;charset=UTF-8',
         "Authorization" : Bearer
     }
   };
 
          if(!Cookies.get('token')){
          this.setState.loggedin = true
          this.state.errAlert = "error"
          this.state.message ="Only vendors can add products"
         
      }
      axios.get(`https://eshop-spot-backend.herokuapp.com/products/${this.state.productId}`,axiosConfig,{
        withCredentials: true
    }).then(response =>{
        this.setState({
          name:response.data.name,
        description:response.data.description,
        quantity:response.data.quantity,
        price:response.data.price,
        photo:response.data.photo,
        size:response.data.size,
        color:response.data.color
      })
      


            console.log(this.state.name)
            console.log(this.state.photo)
        this.setState({item:response.data})
    }).catch(error => {
        console.log(error);
  });;
   
  
 


}


render(){

  return (
      <>
      
    <ThemeProvider theme={theme}>
      { this.state.loggedin && <CustomizedSnackbars errAlert={this.state.errAlert} message={this.state.message} user={this.state.firstName} /> }
      <Container component="main" maxWidth="xs">
        <Box
          sx={{
            // marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >  
 
        <Paper variant="outlined" src={this.state.photo} />
        
          <Box component="form" onSubmit={this.update.bind(this)} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
            
                <Grid item xs={12} sm={12}>
                <TextField
                  
                  fullWidth
                  id="name"
                  label="Product Name"
                  name="name"
                  autoComplete="family-name"
                  value={this.state.name}
                  onChange={(e) => this.setState({name:e.target.value})}
                />
              </Grid>
              <Grid item xs={12} sm={12}>
                <TextField
                  
                  fullWidth
                  id="description"
                  label="Descripiton"
                  name="description"
                  autoComplete="family-name"
                  value={this.state.description}
                  onChange={(e) => this.setState({description:e.target.value})}
                />
              </Grid>
        
          
              <Grid item xs={12} sm={6}>
                <TextField
                  
                  fullWidth
                  name="price"
                  label="price"
                  type="number"
                  id="price"
                  autoComplete="new-password"
                  value={this.state.price}
                  onChange={(e) => this.setState({price:e.target.value})}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  
                  fullWidth
                  name="quantity"
                  label="quantity"
                  type="number"
                  id="quantity"
                  autoComplete="new-password"
                  value={this.state.quantity}
                  onChange={(e) => this.setState({quantity:e.target.value})}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  
                  id="size"
                  label="Size"
                  name="size"
                  value={this.state.size}
                  onChange={(e) => this.setState({size:e.target.value})}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  
                  id="color"
                  label="Color"
                  name="color"
                  value={this.state.color}
                  onChange={(e) => this.setState({color:e.target.value})}
                />
              </Grid>
              <Grid item xs={12} sm={12} >
                <FileBase type="file" multiple={false} onDone={({ base64 }) => this.setState({photo:base64})} />
            </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              {strings.Common.update}
            </Button>
            <Grid container justifyContent="flex-end">
              
            </Grid>
          </Box>
        </Box>
        
      </Container>
    </ThemeProvider>
    </>
  );

}}
export default withRoot(ProductUpdate);