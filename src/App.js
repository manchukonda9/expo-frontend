/* eslint-disable no-unused-vars */
import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Route } from "react-router-dom";



// Importing components

//Vendor
import Home from "./views/Home";
import VendorLogin from "./views/VendorLogin";
import VendorSignup from "./views/VendorSignup";
// import VendorSales from "./components/VendorSales"
import VendorHome from './views/VendorHome';
import VendorUpdate from './components/VendorUpdate';
import VendorProfile from './views/VendorProfile';
import ProductUpdate from './views/ProductUpdate';

//Customer
import CustomerSignup from "./views/CustomerSignup";
import CustomerLogin from "./views/CustomerLogin";
import CustomerHome from './views/CustomerHome';
import AddressAdd from './components/AddAddressForm'
import CustomerUpdate from './components/CustomerUpdate';
import CustomerProfile from './views/CustomerProfile';
import CustomerCart from './views/CustomerCart';
import CustomerPayment from './views/CustomerPayment';

//Common
import ProductDetails from './views/ProductDetails';
import CustomerCheckout from './views/CustomerCheckout';
import CustomerOrders from './views/CustomerOrders';
import Dashboard from './components/Dashboard';
import VendorSales from './views/VendorSales';




 



function App() {
  return (
    <Router>
        <Route exact path="/" component={Home} />
        <Route path="/vendor/login" component={VendorLogin} />
        <Route path="/vendor/signup"  component={VendorSignup} />
        <Route path="/vendor/home" component={VendorHome} />
        {/* <Route path="/vendor/sales"  component={VendorSales} /> */}
        <Route path="/vendor/profile"  component={VendorProfile} />



        <Route path="/customer/login" component={CustomerLogin} />
        <Route path="/customer/signup"  component={CustomerSignup} />
        <Route path="/customer/home"  component={CustomerHome} />
        
        <Route path="/customer/update" component={CustomerUpdate} />
        <Route path="/vendor/update" component={VendorUpdate} />
        <Route path="/products/update/:id" component={ProductUpdate} /> 
        <Route path="/products/:id" component={ProductDetails} /> 
        <Route path="/customer/profile/:index?"  component={CustomerProfile} />
        <Route path="/customer/cart"  component={CustomerCart} />
        
        <Route path="/address/add" component={AddressAdd} />




{/* app js new components by gopi */}
        <Route path="/customer/checkout" component={CustomerCheckout} />
        <Route path="/customer/payment" component={CustomerPayment} />
        <Route path="/customer/orders" component={CustomerOrders} />
        <Route path="/vendor/sales" component={VendorSales} />
        




    </Router>
  );
}

export default App;
