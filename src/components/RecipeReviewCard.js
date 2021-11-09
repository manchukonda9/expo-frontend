import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import trimWords from 'trim-words';
import styles from '../assets/styles';
import  { useState , useEffect} from "react"
import Cookies from 'js-cookie';

import axios from "axios";

export default function RecipeReviewCard(props) {
  var base64Icon = `${props.product.photo}`;
  // const [cartItems, setCartItems] = useState(props.oldCart[0].productlist);
  const [errAlert,setErrAlert] = useState("");
  const [message,setMessage] = useState("");
  const [callBack,setCallBack] = useState(false);
  

  console.log(props.product)
  useEffect(() => {
    const fetchPlanetas = async () => {
        
        // setCartItems(props.oldCart[0].productlist) // remove curly braces here
    };    
    fetchPlanetas()
}, []);


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
          setErrAlert("success")
          setMessage("Product Added to Cart Successfully!!")
          setCallBack(true)

          })
          .catch(error => {console.log(error)})

    }
  


  return (
    <Card sx={{ minWidth:250, maxWidth:275, maxHeight:300 }}>
      <CardMedia
        component="img"
        height="140"
        image={base64Icon}
        alt="product Image"
      />
      
      <CardContent  sx={{ flexGrow: 1 }}>
        <Typography gutterBottom >
          <Link underline="none" href={`/productS/${props.product._id}`} variant="h5" color="inherit" >
          {trimWords(props.product.name, 2, '...')}
          </Link>
        </Typography>
        <Typography variant="h5" color="secondary" style={styles.ProductPrice}>
         $ {props.product.price}
        </Typography>
      </CardContent>
      <CardActions>

        <Button style={styles.CardButton} size ="small" variant="outlined" color="secondary" onClick={() => onAdd(props.product)}>Add to Cart</Button>
        
      </CardActions>
    </Card>
  );
}