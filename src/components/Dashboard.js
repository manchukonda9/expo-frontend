import * as React from 'react';
import { styled, createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { useEffect } from 'react';
import Box from '@mui/material/Box';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Badge from '@mui/material/Badge';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Link from '@mui/material/Link';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import NotificationsIcon from '@mui/icons-material/Notifications';
import theme from "./theme"


import Deposits from './Deposits';
import Orders from './Orders';
import CircularIndeterminate from './CircularIndeterminate';



const drawerWidth = 240;





export default function Dashboard(props) {
    const { tableData } = props.data;
    // const [fav] = useFav();
    const [loaded, setLoaded] = React.useState(false);
  const [open, setOpen] = React.useState(true);
//   const [tableData,setTableData] = React.useState(props.data)

//   useEffect(() => {
//     const fetchPlanetas = async () => {
//         setTableData(props.data)
//  // remove curly braces here
//     };    
//     fetchPlanetas()
// }, [props.data]);
useEffect(() => {
    setTimeout(setLoaded, 1000, true);
    console.log(props.data)
    // setLoaded(true);
  }, [tableData]);
  return (
   
    
  
    <ThemeProvider theme={theme}>

{console.log(props,"inside dashboard")}
    <Box
      component="main"

    >
      <Toolbar />
      <Container maxWidth="lg" sx={{ mb: 4 }}>
        <Grid container spacing={3}>
          {/* Chart */}
        
          {/* Recent Deposits */}
          <Grid item xs={12} md={4} lg={3}>
            <Paper
              sx={{
                p: 2,
                display: 'flex',
                flexDirection: 'column',
                height: 240,
              }}
            >
              <Deposits title="Turn over in dollars" data={props.total} />
            </Paper>
          </Grid>
          <Grid item xs={12} md={4} lg={3}>
            <Paper
              sx={{
                p: 2,
                display: 'flex',
                flexDirection: 'column',
                height: 240,
              }}
            >
        { props.productsSold &&  <Deposits title="Products Sold" data={props.productsSold}/> }
            </Paper>
          </Grid>   
          <Grid item xs={12} md={4} lg={3}>
            <Paper
              sx={{
                p: 2,
                display: 'flex',
                flexDirection: 'column',
                height: 240,
              }}
            >
              
           { props.popular.name &&  <Deposits title="Popular Product" data={props.popular.name}/> }
            </Paper>
          </Grid>
          <Grid item xs={12} md={4} lg={3}>
            <Paper
              sx={{
                p: 2,
                display: 'flex',
                flexDirection: 'column',
                height: 240,
              }}
            >
              <Deposits title="Total Orders" data={props.data.length}/>
            </Paper>
          </Grid>
          {/* Recent Orders */}
          <Grid item xs={12}>
            <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
              <Orders data={props.data} />
            </Paper>
          </Grid>
        </Grid>
      
      </Container>
    </Box>

  
    </ThemeProvider>
  );
}

// export default function Dashboard() {
//   return <DashboardContent />;
// }