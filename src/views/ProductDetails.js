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
import AppBarCustomer from '../components/AppBarCustomer';





 class ProductDetails extends Component {
    constructor(props) {
        super(props);
        this.state = {
            productId:"",
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

      addtoCart(e){
          console.log("added to cart")
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
    this.setState({message:"changes updated for"})
}).catch(error => {
    this.setState({loggedin:true})
    this.setState({errAlert:"error"})
    this.setState({message:"Something went wrong"})
    console.log("In error");
    console.log(error);
  });




        
        console.log(jusJson)
      }
      




// });


 componentDidMount (){

    let paramProdId = this.props.match.params;
    this.setState({productId:paramProdId.id})
    console.log("oarams:",this.state.productId)
    console.log("oarams:",paramProdId.id)
  

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
      axios.get(`https://eshop-spot-backend.herokuapp.com/products/${paramProdId.id}`,axiosConfig,{
        withCredentials: true
    }).then(response =>{
        this.setState({name:response.data.name,
        description:response.data.description,
        quantity:response.data.quantity,
        price:response.data.price,
        photo:response.data.photo,
        size:response.data.size,
        color:response.data.color})

        this.setState({item:response.data})
    }).catch(error => {
        console.log(error);
      });;
    // this.setState.user = hitback
   
    
}

render(){

  const onAdd = async (product) => {

    var selectedProd = {
      "product":product._id,
    }

  const Bearer = "Bearer "+ Cookies.get('token')
  let axiosConfig = {
  headers: {
      'Content-Type': 'application/json;charset=UTF-8',
      "Authorization" : Bearer
    }
  };

  axios.patch(`https://eshop-spot-backend.herokuapp.com/cart/addProduct`,selectedProd,axiosConfig,{
    withCredentials: true })
    .then(response =>{ 
      console.log(response.data.productlist,"from api")
      

      })
      .catch(error => {console.log(error)})

}

  return (
      <>
      
    <ThemeProvider theme={theme}>
      { this.state.loggedin && <CustomizedSnackbars errAlert={this.state.errAlert} message={this.state.message} user={this.state.firstName} /> }
      <AppBarCustomer/>
      <Container component="main" maxWidth="xs">
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >  <Typography component="h1" variant="h5">
        Product Details
      </Typography>
        <Paper variant="outlined" src={this.state.photo} />
        

        
          <Box component="form" onSubmit={this.addtoCart.bind(this)} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
            
                <Grid item xs={12} sm={12}>
                <TextField
                  
                  fullWidth
                  id="name"
                  label="Product Name"
                  name="name"
                  autoComplete="family-name"
                  value={this.state.name}
                  
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
                  
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  
                  id="size"
                  label="Size"
                  name="size"
                  value={this.state.size}
                  
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  
                  id="color"
                  label="Color"
                  name="color"
                  value={this.state.color}
                  
                />
              </Grid>
              <Grid item xs={12} sm={12}>
           
           <Button fullWidth variant="contained" color="primary" onClick={() => onAdd(this.state.item)}>Add to Cart</Button>
            </Grid>
             
            </Grid>

          </Box>
        </Box>
        
      </Container>

    </ThemeProvider>
    </>
  );

}}
export default withRoot(ProductDetails);