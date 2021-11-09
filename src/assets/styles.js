import bgimage from "./images/bg7.jpg";




const Header = {
    padding: "10px 20px",
    textAlign: "left",
    height: "60px",
  }

  const Toolbar = {
    minHeight:"45px",
  }

  const HeaderIcons = {
    padding: "10px 20px",
    textAlign: "center",
    ml: 3,
    fontSize: 16,
    textTransform: "none",
  }
  
  const ErrorMessage = {
    color: "white",
    fontSize: "13px"
  }

  const Avatar ={
    height: "40px",
    width: "40px",
    m: 2
  }

  const MyProfileTabsBox ={
    height: "100vh",
    width: "200px",
    borderRight: 1,
    borderColor: 'divider',
  }

  const MyProfileTab = {
    textTransform: "none",
    padding: "15px",
    fontSize: "16px"
  }

  const MyProfileTabAdddress = {
    textTransform: "none",
    padding: "15px",
    fontSize: "16px"
  }


  const ProductListBox ={
    display: "inline-block" ,
    position:"relative",
    top:"30px",
    left:"5%",
    width: "90%",
  }

  const ProductTableCell = {
    textAlign: "center",
  }

  const ProductTableCell_First = {
    textAlign: "left",
  }
  const HomeBackground = {
    backgroundImage: `url(${bgimage})`,
    backgroundPosition: 'center',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    width: '100vw',
    height: '100vh',
    backgroundColor: 'Red',
    maxWidth:"none"

}

const HomeContainer = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
}

const ProductPrice = {
  // fontSize: '22px',
  fontFamily: "Trirong",
  fontWeight: "Bold",
}
  
const CardButton = {
    flex: 1,
    justifyContent: 'center'
}

const CheckoutCard={
  direction:"column",
  alignItems:"center",
  justify:"center",
}


const TypographyTabContainer = {
  // position: "relative",
  //   top: "10%",
  //   left: "20%",
  //   padding: "24"
  // margin: "auto",
}

const TabContainer ={
  position: "absolute",
  top: "50px",
  left: "40%"
}

const CartButton ={
  padding : "0",
}

const CartPrice = {
  position : "relative",
  flexGrow: 1,
  ml:2
}

const ManageAddressContainer={
  maxWidth : "300px",
  pr : 6,
  pb :6

}

const CardGridAddress={
  maxWidth : "inherit"
}

const HeadingCheckout={
  textTransform:'none'
}

const titleCheckout={
  textTransform:'none',
  textAlign: "center",
}

const textTransformNone={
  textTransform:'none'
}

  const styles = {
    Header: Header,
    ErrorMessage: ErrorMessage,
    HeaderIcons: HeaderIcons,
    HomeBackground:HomeBackground,
    HomeContainer:HomeContainer,
    Avatar:Avatar,
    ProductPrice:ProductPrice,
    CardButton:CardButton,
    Toolbar:Toolbar,
    MyProfileTabsBox:MyProfileTabsBox,
    MyProfileTab:MyProfileTab,
    ProductListBox:ProductListBox,
    ProductTableCell:ProductTableCell,
    ProductTableCell_First:ProductTableCell_First,
    TabContainer:TabContainer,
    MyProfileTabAdddress:MyProfileTabAdddress,
    TypographyTabContainer:TypographyTabContainer,
    CartButton:CartButton,
    CartPrice:CartPrice,
    ManageAddressContainer:ManageAddressContainer,
    CardGridAddress:CardGridAddress,
    titleCheckout:titleCheckout,
    HeadingCheckout:HeadingCheckout,
    textTransformNone:textTransformNone,
    CheckoutCard:CheckoutCard
  }

  export default styles
  
