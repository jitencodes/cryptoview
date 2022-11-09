
import {
  LinearProgress,
  makeStyles,
  Typography,
} from "@material-ui/core";
import axios from "axios";
import { useEffect, useState } from "react";
import CoinInfo from "../CoinInfo";
import { SingleCoin } from "../../config/api";
import { CryptoState } from "../../CryptoContext";
const Banner2 = () => {

  const [coin, setCoin] = useState();
  const id = "bitcoin";
  const fetchCoin = async () => {
    const { data } = await axios.get(SingleCoin(id));

    setCoin(data);

  };
 

  useEffect(() => {
    fetchCoin();
  }, []);

  const useStyles = makeStyles((theme) => ({
    banner: {
      height: 500,
      padding: " 50px 0px 50px 0px",
      display: "flex",
      width: '100%',
      flexDirection: "row",
      marginTop: "85px"
    },
    left_container: {
      backgroundColor: "hsla(223, 88%, 6%,0.3)",
      width:"35%", 
    },
    right_container: {
      display: "flex",
      width:"65%", 
      justifyContent: "center",
      alignItems: 'center',
    },
    
  }));

  const classes = useStyles();

  if (!coin) return (    
          <div className={classes.banner}>
            <LinearProgress style={{ backgroundColor: "#3eee1b" }} />
          </div>
  )

  ;

  return (<>
    <div className={classes.banner}>
    <div className={classes.left_container}>
        <Typography className={classes.cryptoviewText}
            variant="h3"
            style={{
              color:"#fff",
              fontWeight: 900,
              marginBottom: 30,
              textAlign: "center",
              fontSize: 40,
            }}
          >
            The Graph View
          </Typography>
          
          <Typography 
            variant="h5"
            style={{
              color: "#fff",
              textTransform: "none",
              fontWeight: 100,
              fontSize: 25,
              textAlign: "center"

            }}
          >
Charting interface with real-time market data from all major crypto currencies.<br></br>
monitor prices of different currencies in real time, see the past trends and make decisions by analyzing the market movement and historical data. 
          </Typography>
        </div>
      <div className={classes.right_container}>
      <CoinInfo coin={coin} />
      </div> 

    </div>
    
    </>
  );
};

export default Banner2;
