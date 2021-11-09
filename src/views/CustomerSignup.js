/* eslint-disable no-unused-vars */
import * as React from 'react';
import  { useState } from "react"
import Cookies from 'js-cookie';
import axios from "axios";
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
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
import styles from '../assets/styles';
import { string } from 'prop-types';
import strings from '../assets/strings';
import { useHistory } from "react-router-dom";


const CustomerSignUp = (callback) => {
  const [inputs, setInputs] = useState({});
  const [loggedin,setLoggedin] = useState(false);
  const [user,setUser] = useState("");
  const [errAlert,setErrAlert] = useState("");
  const [message,setMessage] = useState("");

  const history = useHistory();


  async function signup(event){
    if (event) {
      event.preventDefault();
      const signupData=inputs;
      console.log(signupData,"  --  ",inputs)

      try{
        setLoggedin(false)
        const hitback = await axios.post("https://eshop-spot-backend.herokuapp.com/customer/signup",signupData,{
                  withCredentials: true
              });
              console.log(hitback)
              if(hitback){
                
                setLoggedin(true)
                setErrAlert("success")
                setMessage("Welcome ",user.firstName)
                setUser(hitback.data.customer.firstName)
                history.push({
                  pathname: '/customer/home',
                  openSnackbar: true
                });
              }
              
      }
      catch(err){
        setUser("")
        setErrAlert("error")
        setLoggedin(true)
        setMessage("Invalid Data")
        console.log("in error")
        console.log(err)
    }

    }
  }


  const handleInputChange = (event) => {
    event.persist();
    setInputs(inputs => ({...inputs, [event.target.name]: event.target.value}));
  }


  return (
    <ThemeProvider theme={theme}>
      { loggedin && <CustomizedSnackbars errAlert={errAlert} message={message} user={user} /> }
    <AppBar/>
      <Container component="main" maxWidth="xs">
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar style={styles.Avatar} sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <PersonAddAltIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            {strings.SignUp.Labels.customerSignup}
          </Typography>
          <Box component="form"  onSubmit={signup} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="firstName"
                  required
                  fullWidth
                  id="firstName"
                  label={strings.SignUp.Labels.firstName}
                  autoFocus
                  onChange={handleInputChange}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="lastName"
                  label={strings.SignUp.Labels.lastName}
                  name="lastName"
                  autoComplete="family-name"
                  onChange={handleInputChange}

                />
              </Grid>
        
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label={strings.SignUp.Labels.email}
                  name="email"
                  autoComplete="email"
                  onChange={handleInputChange}

                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label={strings.SignUp.Labels.password}
                  type="password"
                  id="password"
                  autoComplete="new-password"
                  onChange={handleInputChange}

                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  id="age"
                  label={strings.SignUp.Labels.age}
                  name="age"
                  autoComplete="family-name"
                  onChange={handleInputChange}

                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="contact"
                  name="contact"
                  label={strings.SignUp.Labels.contact}
                  autoComplete="family-name"
                  onChange={handleInputChange}

                />
              </Grid>
            
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              {strings.Common.signup}
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="/customer/login" variant="body2">
                  {strings.SignUp.Labels.hasAccount}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        
      </Container>
      <Link href="/vendor/signup" variant="body2">
      <FloatingActionButtons  personIcon={true} text={strings.SignUp.Labels.asVendorSignup}/>
      </Link>
    </ThemeProvider>
  );
}

export default withRoot(CustomerSignUp);
