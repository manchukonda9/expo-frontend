import React, { Component } from "react";

import RecipeReviewCard from "../components/RecipeReviewCard";
import Grid from '@mui/material/Grid';
import AppBarCus from "../components/AppBarCustomer";
import Container from '@mui/material/Container';
import theme from "../components/theme";
import { ThemeProvider } from '@material-ui/core/styles';
import withRoot from '../components/WithRoot';
import { CssBaseline } from "@mui/material";
import Cookies from 'js-cookie';
import axios from "axios";
import OrderCard from "../components/OrderCard";




class CustomerOrders extends Component {
  constructor(props) {
    super(props);
    this.state = {
      products: [],
      oldCart:{},
      orders:[],
      productsAll: [],
      tableProd:[],
      loggedin:false,
      errAlert:'',
      notify:0,
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
        

        console.log(this.state.products,"from customer orders")
        console.log(this.state.orders[0].productlist,"orders from customer orders")



        var totalpri =0
    for(var i =0;i<this.state.orders.length;i++){
      var tempJson = {order_id:this.state.orders[i]._id,items:[],totalPrice:0}
      totalpri=0
      for(var j =0;j<this.state.orders[i].productlist.length;j++){
          console.log(this.state.orders[i].productlist[j].product,"sep prod from customer orders")
          
          for(var k=0;k<this.state.products.length;k++){
            
              if(this.state.products[k]._id == this.state.orders[i].productlist[j].product){
                                 var item={
                                      "id":this.state.products[k]._id,
                                      "name": this.state.products[k].name,
                                      "photo": this.state.products[k].photo,
                                      "price": this.state.products[k].price,
                                      "owner": this.state.products[k].owner,
                                      "status": this.state.orders[i].productlist[j].status,
                                      "quantity":this.state.orders[i].productlist[j].quantity
                                  }
                                  totalpri = totalpri + this.state.products[k].price
                                  tempJson.items.push(item)

              }
          }
      }
      tempJson.totalPrice = totalpri
      this.setState({ tableProd: [...this.state.tableProd, tempJson] })
  }
  console.log(this.state.tableProd,"dump from customer orders")

      })
      .catch(error => {
        console.log(error);
      });

      try{  
      
            axios.get("https://eshop-spot-backend.herokuapp.com/customers/myorders",axiosConfig, {
              withCredentials: true
        
              }).then(resposne =>{
                this.setState({ orders: resposne.data });
                console.log(this.state.orders,"after api")

              })
  
  }catch(e){
         
       
      this.setState.loggedin = true
      this.state.errAlert = "error"
      this.state.message ="Only vendors can add products"
      console.log("in error")
      console.log(e)
  }
  }


  render() {
    if(this.state.tableProd.length == 0){
      return <div className="App">No Data Available</div>;
  }
      return(
       

    <ThemeProvider theme={theme}>

      <Container sx={{ py: 6 }} >

          <Grid container spacing={4} >
              {console.log(this.state.tableProd, "-- table prod")}
            {this.state.tableProd.map(currentOrder => (
              <Grid item key={currentOrder} xs={3} style={{minWidth:"1000px"}}>
                  <OrderCard orderinfo={currentOrder} />
              </Grid>
            ))}
          </Grid>

        </Container> 
    </ThemeProvider>
      



  );
    
  }
}

export default withRoot(CustomerOrders);
