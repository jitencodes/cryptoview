
import {
  Button,
  LinearProgress,
  makeStyles,
  Typography,
} from "@material-ui/core";
import axios from "axios";
import { useEffect, useState } from "react";
import {  Link } from "react-router-dom";
import { SingleCoin } from "../../config/api";
import { CryptoState } from "../../CryptoContext";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../../firebase";
import NewsPage from "../../Pages/NewsPage";
const Banner3 = () => {
  const id = "bitcoin";
  const [coin, setCoin] = useState();

// getting bitcoin live data for home banner component
  const fetchCoin = async () => {
    const { data } = await axios.get(SingleCoin(id));
    setCoin(data);
  };

  useEffect(() => {
    fetchCoin();
  }, []);

  const useStyles = makeStyles((theme) => ({
    banner:{
      display:"flex",
      flexDirection:"column",
      alignItems:"center",
      width:"100%"
    },
    news: {
      height: 500,
      overflow:"hidden",
      alignItems:"center",
      justifyItems:"center",
      width: '100%',
      flexDirection: "row",
    },
    
    Button:{
      backgroundColor: "#42E452",
      border: "none",
      borderRadius: "5px",
      color: "#000",
      width: "250px",
      padding: " 15px 60px 15px 20px ",
      textAlign: 'center',
      fontWeight:"900",
      textDecoration: 'none',
      fontSize: 22,
      cursor: 'pointer',
      marginTop:"40px",
      marginBottom:"40px"

  
    },
    
  }));

  const classes = useStyles();

  if (!coin) return <LinearProgress style={{ backgroundColor: "gold" }} />;

  return (<>
    <div className={classes.banner}>
    <div className={classes.news}>
      <NewsPage />
      </div>
      <Link className={classes.Button} to="/News">Explore News!</Link>

    </div>
    
    </>
  );
};

export default Banner3;
