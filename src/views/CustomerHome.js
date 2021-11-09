import React, { Component } from "react";
import axios from "axios";
import RecipeReviewCard from "../components/RecipeReviewCard";
import Grid from '@mui/material/Grid';
import AppBarCus from "../components/AppBarCustomer";
import Container from '@mui/material/Container';
import theme from "../components/theme";
import { ThemeProvider } from '@material-ui/core/styles';
import withRoot from '../components/WithRoot';
import { CssBaseline, Typography } from "@mui/material";
import Cookies from 'js-cookie';



class CustomerHome extends Component {
  constructor(props) {
    super(props);
    this.state = {
      products: [],
      oldCart:{},
      productsAll: [],
      tableProd:[],
      loggedin:false,
      errAlert:'',
      noProducts:false
    };
  }

  componentDidMount () {
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


    axios
      .get(`https://eshop-spot-backend.herokuapp.com/product/all`)
      .then(response => {
        console.log("response" + response.data);
        this.setState({ products: response.data });
        this.setState({ productsAll: response.data });

        if(response.data.length == 0){
            this.setState({noProducts:true})
        }
        for(var i =0;i<this.state.productsAll.length;i++){
    
          for(var j=0;j<this.state.oldCart[0].productlist.length;j++){
              
            if(this.state.productsAll[i]._id == this.state.oldCart[0].productlist[j].product){
                var tempJson = {
                    "id":this.state.productsAll[i]._id,
                    "name": this.state.productsAll[i].name,
                    "photo": this.state.productsAll[i].photo,
                    "price": this.state.productsAll[i].price,
                    "quantity": this.state.oldCart[0].productlist[j].quantity,
                    "backQuantity":this.state.productsAll.quantity

                }
                this.setState({ tableProd: [...this.state.tableProd, tempJson] })

            }
            
          }
          console.log(this.state.tableProd,"tab")
      }
      })
      .catch(error => {
        console.log(error);
      });


  }


  render() {
      return(

    <ThemeProvider theme={theme}>
      <CssBaseline/>
      <AppBarCus/>
      <Container sx={{ py: 6 }} >
          {this.state.noProducts && <Typography> No Products Available</Typography>}
          <Grid container spacing={4} >
            {this.state.products.filter(product => product.quantity > 0).map(currentproduct => (
            
             <Grid item key={currentproduct} xs={3} >
                   <RecipeReviewCard oldCart={this.state.oldCart} product={currentproduct} />
              </Grid>
            ))}
          </Grid>
        </Container>
    </ThemeProvider>
      



  );
    
  }
}

export default withRoot(CustomerHome);
