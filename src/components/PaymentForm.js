import * as React from 'react';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Link from '@mui/material/Link';
import Container from '@mui/material/Container';
import { useHistory } from 'react-router';
import  { useState } from "react"





export default function PaymentForm(props) {
  const [inputs, setInputs] = useState({});


  const handleInputChange = (event) => {
    event.persist();
    setInputs(inputs => ({...inputs, [event.target.name]: event.target.value}));
  }



  console.log(props, "--- payment")
  const moveOn = () => {
    props.setPaymentDetails(inputs)
    props.handleNext()

  }
  return (
    <Container component="main" maxWidth="sm" sx={{ mb: 4 }}>
    <Paper variant="outlined" sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Payment method
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <TextField
            id="cardName"
            label="Name on card"
            fullWidth
            autoComplete="cc-name"
            variant="standard"
            onChange={handleInputChange}
            name = "cardName"
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            id="cardNumber"
            label="Card number"
            fullWidth
            autoComplete="cc-number"
            variant="standard"
            onChange={handleInputChange}
            name = "cardNumber"
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            id="expDate"
            label="Expiry date"
            fullWidth
            autoComplete="cc-exp"
            variant="standard"
            onChange={handleInputChange}
            name = "expDate"
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            
            id="cvv"
            label="CVV"
            helperText="Last three digits on signature strip"
            fullWidth
            autoComplete="cc-csc"
            variant="standard"
            onChange={handleInputChange}
            name = "cvv"
          />
        </Grid>
        <Grid item xs={12}>
          <FormControlLabel
            control={<Checkbox color="secondary" name="saveCard" value="yes" />}
            label="Remember credit card details for next time"
          />
        </Grid>
      </Grid>
      <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                 
               

                  <Button
                    variant="contained"
                    sx={{ mt: 3, ml: 1 }}
                    onClick={() => moveOn()}
                  >
                    Make Payment
                  </Button>
                  
                </Box>
    </React.Fragment>
    </Paper>
    </Container>
  );
}
