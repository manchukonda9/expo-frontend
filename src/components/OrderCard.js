import * as React from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Grid from '@mui/material/Grid';
import styles from '../assets/styles'
import { Divider } from '@mui/material';
import Cookies from 'js-cookie';
import { Button } from '@mui/material';
import axios from "axios";
import { useHistory } from 'react-router';


function refreshPage() {
  setTimeout(()=>{
    window.location.reload(true);
}, 1000);
console.log('page to reload')


  

}


const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));

export default function OrderCard(props) {
  const [expanded, setExpanded] = React.useState(false);
  
  const history = useHistory();

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const handleAddrTypeChange = async (row,item) => {
    
    console.log(row,item  ,"on click==========")

    const Bearer = "Bearer "+ Cookies.get('token')
    let axiosConfig = {
     headers: {
         'Content-Type': 'application/json;charset=UTF-8',
         "Authorization" : Bearer
     }
  };
  try{
   

    const statusUpdate={
        "product":item.id,
        "status":"Return Request Initiated"
    }
    console.log(row.order_id,"order")
    const hitback = await axios.patch(`https://eshop-spot-backend.herokuapp.com/order/status/${row.order_id}`,statusUpdate,axiosConfig,{
              withCredentials: true
          });
          console.log(hitback)
          if(hitback){
            
       

            // setInputs(null)
            refreshPage()
         
            history.push('/customer/profile/2') 

          }
          
  }
  catch(err){

    console.log("in error")
    console.log(err)
  }
}

  return (
    <Card >
      {  console.log(props.orderinfo,"--- order info")}

      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: '#ff3366'}} aria-label="recipe">
            <ShoppingCartIcon />
          </Avatar>
        }
        title={props.orderinfo.order_id}
        subheader="OrderId"
      />
    
 
      <CardActions disableSpacing>
      <CardContent>
        <Typography variant="h5" color="text.primary">
          ${props.orderinfo.totalPrice}
          </Typography>
      </CardContent>
        <ExpandMore
          expand={expanded}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </ExpandMore>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>

          <Grid item xs={12}> 
                  <Divider orientation="horizontal" flexItem/>
          </Grid>
            <Grid container direction="column" spacing={0} >
                {props.orderinfo.items.map(item => (
                  <Grid container direction="row"key={item} xs={12} sx={{p:2}}>
                        <Grid item xs={2} 
                           style={{ display: "flex" }}
                           alignItems="center"
                           justifyContent="flex-end"
                          > 
                            <Avatar variant="rounded" src={item.photo} ></Avatar>

                        </Grid>
                        <Grid item xs={7} 
                           style={{ display: "flex", paddingLeft:"15px", paddingRight:"15px" }}
                           direction="column"
                           justifyContent="center"

                          > 
                             <Typography variant="h6" color="text.primary" style={styles.textTransformNone}>
                              {item.name}
                              </Typography>
                          </Grid>
                          <Grid item xs={3} 
                                 style={{ display: "flex", paddingRight:"15px" }}
                                direction="column"
                                justifyContent="center"
                              >
                              <Typography variant="body1" color="text.primary" style={styles.textTransformNone}>
                              Quantity : {item.quantity}  
                              </Typography>


                              <Typography variant="body1" color="text.primary" style={styles.textTransformNone}>
                              Price : ${item.price}
                              </Typography>

                              <Typography variant="body1" color="text.primary" style={styles.textTransformNone}>
                              Status : {item.status}  
                           
                              </Typography>

                              {(item.status =="Return Request Initiated" || item.status =="Return Accepted" || item.status =="Return Rejected")?null:                         <Button
              type="submit"
              fullWidth
              value="Return Request Initiated"
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
          
              
              onClick={() => handleAddrTypeChange(props.orderinfo,item)}
            >
             Return Item
        </Button>}

        

                              {/* <Typography variant="body1" color="text.primary" style={styles.textTransformNone}>
                              {item.quantity*item.price}
                              </Typography> */}
                        </Grid>
                              
                  </Grid>
                  ))}
            </Grid>

        </CardContent>
      </Collapse>
    </Card>
  );
}
