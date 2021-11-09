/* eslint-disable no-unused-vars */
import * as React from 'react';
import styles from '../assets/styles';
import { Button } from '@mui/material';
import Container from '@mui/material/Container';
import { Typography } from '@mui/material';
import { Grid } from '@mui/material';


export default function HomeLayout() {
    return (

        <Container style={styles.HomeBackground} maxWidth="sm">

        <Typography color="secondary.light" align="center" variant="h2" marked="center" style={{paddingTop:"100px"}}>
                Enjoy Gifts with us
        </Typography>
        <Typography
        color="secondary.light"
        align="center"
        variant="h5"
        sx={{ mb: 4 }}
      >
        Selling and Buying gifts made easy
      </Typography>

    <Grid sm={12} style={{ display:"flex", justifyContent:"center"}}>
      <Button
        color="secondary"
        variant="contained"
        size="large"
        component="a"
        href="customer/login"
        sx={{ minWidth: 200 , margin:"10px",textTransform:"none"}}
      >
        As Customer
      </Button>
      <Typography>
         
      </Typography>
      <Button
        color="secondary"
        variant="contained"
        size="large"
        component="a"
        href="vendor/login"
        sx={{ minWidth: 200 , margin:"10px", textTransform:"none"}}
      >
        As Vendor
      </Button>
      </Grid>
{/*  
        <div style={{ position:"absolute",top:"50%",left:"50%"}}>
            <Button href="customer/signup" variant="contained" color="secondary">Sign Up</Button>
        </div>
 */}

        </Container>

);
}