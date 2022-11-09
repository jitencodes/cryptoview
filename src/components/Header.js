import {AppBar,Container,MenuItem,Select,Toolbar,Typography,Box,Avatar,Button} from "@material-ui/core";
import {createTheme,makeStyles,ThemeProvider} from "@material-ui/core/styles";
import { useHistory, useLocation } from "react-router-dom";
import { CryptoState } from "../CryptoContext";
import AuthModal from "./Authentication/AuthModal";
import UserSidebar from "./Authentication/UserSidebar";
import logo from '../assets/logo.png'; 

  const useStyles = makeStyles((theme) => ({

    toolbar:{
     display: "flex",
     position: "sticky",
    //  border: "2px solid #fff",
     width:"100%",
     flexDirection: "row",
    },
    Container_1:{
      display: "flex",
      // border: "2px solid green",
      flex: "25%",
      alignItems: "center",
    },
    Container_2:{
      // border:"2px solid gray",
      display: "flex",
      flex: "50%",  
      flexDirection: "row",
      justifyContent:"flex-end",
      alignItems: "flex-end",
      paddingBottom: "5px", 
    },
    
    Container_3:{
      // border:"2px solid gray",
      display: "flex",
      flex: "25%",  
      flexDirection: "row",
      justifyContent:"flex-end",
      alignItems: "flex-end",
      paddingBottom: "5px",
     },
    button: {
      display: "flex",
      flexDirection: "column",
      // border:"2px solid red",
      paddingRight: "30px",
      alignSelf: "flex-end",
      marginRight: "5px",
    },
    buttonText: {
      // border:"2px solid gray",
      backgroundColor:"transparent", 
      color: '#fff', 
      fontWeight: "bold", 
      fontSize:18, 
      textTransform: "none",
      cursor: "pointer",
      // borderBottom: "2px solid #fff",
    },
    ButtonBorder:{
      borderBottom: "2px solid #fff",
      marginTop: "5px",
      width :"35px",
    },
   buttonTextActive: {
      // border:"2px solid gray",
      backgroundColor:"transparent", 
      color: '#fff', 
      fontWeight: "bold", 
      fontSize:18, 
      textTransform: "none",
      cursor: "pointer",
      // borderBottom: "2px solid #fff",
    },
    ButtonBorderActive:{
      borderBottom: "2px solid #42E452",
      marginTop: "5px",
      width :"35px",
    },
   
  }));
  
  const darkTheme = createTheme({
    palette: {
      primary: {
        main: "#28e179",
      },
      type: "dark",
    },
  });
  
  function Header() {
    const classes = useStyles();
    const { currency, setCurrency, user } = CryptoState();
    const history = useHistory();

    //destructuring pathname from location
    const { pathname } = useLocation();
    
    //Javascript split method to get the name of the path in array
    const splitLocation = pathname.split("/");
    console.log(splitLocation);

    return (
      <ThemeProvider theme={darkTheme}>

            <div className={classes.toolbar}>
              
              <div className={classes.Container_1}>
                  <div className={classes.logoImg}>
                      <img style={{height: 50,width: 50,cursor: "pointer",}}
                            src={logo}
                            onClick={() => history.push(`/Home`)}
                              />
                  </div>
                  <div className={classes.logoName}>
                    <Typography  style={{
                        color: '#fff',
                        fontWeight: "Bold",
                        fontFamily: "Montserrat",
                        fontSize: 25,
                        marginLeft: "10px"
                      }}
                      onClick={() => history.push(`/Home`)}
                      variant="h6"
                      >Crypto View
                    </Typography>
                  </div>    
              </div>

              <div className={classes.Container_2}>
                <div className={classes.button}>
                  <p className={
                    splitLocation[1] === "Home" ? classes.buttonTextActive :  
                    classes.buttonText}
                    onClick={() => history.push("/Home")}
                    >Home</p>
                    
                  <div className={
                    splitLocation[1] === "Home" ? classes.ButtonBorderActive :  
                    classes.ButtonBorder}></div>
                </div>
                <div className={classes.button}>
                  <p className={
                    splitLocation[1] === "Currency" ? classes.buttonTextActive :  
                    classes.buttonText}                              
                    onClick={() => history.push("/Currency")}
                    >Currencies</p>
                  <div className={
                    splitLocation[1] === "Currency" ? classes.ButtonBorderActive :  
                    classes.ButtonBorder}></div>
                </div>
                <div className={classes.button}>
                  <p className={
                    splitLocation[1] === "Exchanges" ? classes.buttonTextActive :  
                    classes.buttonText}
                    onClick={() => history.push("/Exchanges")}
                    >Exchanges</p>
                  <div className={
                    splitLocation[1] === "Exchanges" ? classes.ButtonBorderActive :  
                    classes.ButtonBorder}></div>
                </div>
                <div className={classes.button}>
                  <p className={
                    splitLocation[1] === "News" ? classes.buttonTextActive :  
                    classes.buttonText}
                    onClick={() => history.push("/News")}
                    >News</p>
                  <div className={
                    splitLocation[1] === "News" ? classes.ButtonBorderActive :  
                    classes.ButtonBorder}></div>
                </div>                           
                {/* <div className={classes.button}>
                  <p className={
                    splitLocation[1] === "Portfolio" ? classes.buttonTextActive :  
                    classes.buttonText}
                    onClick={() => history.push("/Portfolio")}
                    >Portfolio</p>
                  <div className={
                    splitLocation[1] === "Portfolio" ? classes.ButtonBorderActive :  
                    classes.ButtonBorder}></div>
                </div>                            */}
              
              </div>

              <div className={classes.Container_3}>
                <Select
                      variant="outlined"
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={currency}
                      style={{ width: 100, height: 40, marginLeft: 15, }}
                      onChange={(e) => setCurrency(e.target.value)}
                    >
                      <MenuItem value={"USD"}>USD</MenuItem>
                      <MenuItem value={"INR"}>INR</MenuItem>
                </Select>
                {user ? <UserSidebar /> : <AuthModal />}
              </div>      
            </div>
      </ThemeProvider>
    );
  }
  
  export default Header;