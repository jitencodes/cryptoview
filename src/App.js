import { makeStyles } from "@material-ui/core";
import Homepage from "./Pages/HomePage";
import { BrowserRouter, Redirect, Route, } from "react-router-dom";
import CoinPage from "./Pages/CoinPage.js";
import Header from "./components/Header";
import Alert from "./components/Alert";
import NewsPage from "./Pages/NewsPage";
import CurrencyPage from "./Pages/CurrencyPage";
import ExchnagePage from "./Pages/ExchangePage";
import BgImg from "./assets/BgImg.png";
import { GithubOutlined } from "@ant-design/icons";

import "./index.css";


const useStyles = makeStyles(() => ({
  App: {
    // border: "2px solid green",
    backgroundColor: "#020a1e",
    minHeight: "200vh",
    maxHeight:"250vh"

  },
  Blank:{
    backgroundColor: "#020a1e",
    height: "45px",
  },
  Header:{
    backgroundColor: "#020a1e",
    display : "flex",
    position: "sticky",
    width: "100%",
    zIndex: 3,
    top: 0,
    height: "10%",
    alignItems: "flex-end",
    padding: "25px 70px 10px 70px ",
  },
  routes:{
    display: "flex",
    width :"100%",
    flexDirection: "column",
    minHeight: "80%",
    justifyContent: "center",
    alignItems: "center",
    position :"absolute",
    zIndex: 2,
    padding: "0px 70px 0px 70px ",

  },
  BgImg:{
    position: "fixed",
    bottom: "-190px",
    left: "-180px",
  width: "700px",
  zIndex:1,
  }
  
}));

function App() {
  const classes = useStyles();

  return (
    <BrowserRouter>
      <div className={classes.App}>
        <div className={classes.Blank}>
        </div>
        <div className={classes.Header}>
          <Header />
        </div>
        <div className={classes.routes}>
        <Route
                exact
                path="/"
                render={() => {
                    return (
                      <Redirect to="/Home" /> 
                    )
                }}
              />
        <Route path="/Home" component={Homepage} exact />
        <Route path="/Exchanges" component={ExchnagePage} exact />
        <Route path="/Currency" component={CurrencyPage} exact /> 
        <Route path="/News" component={NewsPage} exact />
        <Route path="/coins/:id" component={CoinPage} exact />
        </div>
      </div>
    <Alert />
       <img className={classes.BgImg} src={BgImg}/>
       <div className="footer">
        <a className="footerText" target="blank" href="https://github.com/jitencodes">
          Developed with <span></span> by Jitendra  
        </a> 
        <a target="blank" href="https://github.com/jitencodes" ><GithubOutlined style={{color:"#fff", fontSize:"20px"}}/></a>
        </div>

     </BrowserRouter>
     
  );
}
export default App;