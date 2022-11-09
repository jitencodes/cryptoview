
import {
  Button,
  LinearProgress,
  makeStyles,
  Typography,
} from "@material-ui/core";
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ReactHtmlParser from "react-html-parser";
import CoinInfo from "../components/CoinInfo";
import { SingleCoin } from "../config/api";
import CoinsTable, { numberWithCommas } from "../components/CoinsTable";
import { CryptoState } from "../CryptoContext";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../firebase";
import { StarFilled, StarOutlined } from "@ant-design/icons"
const CoinPage = () => {
  const { id } = useParams();
  const [coin, setCoin] = useState();

  const { currency, symbol, user, setAlert, watchlist } = CryptoState();
 
  const fetchCoin = async () => {
    const { data } = await axios.get(SingleCoin(id));

    setCoin(data);
  };

  useEffect(() => {
   
    fetchCoin();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [useParams()]);
  
  const inWatchlist = watchlist.includes(coin?.id);

  const addToWatchlist = async () => {
    const coinRef = doc(db, "watchlist", user.uid);
    try {
      await setDoc(
        coinRef,
        { coins: watchlist ? [...watchlist, coin?.id] : [coin?.id] },
        { merge: true }
      );

      setAlert({
        open: true,
        message: `${coin.name} Added to the Watchlist !`,
        type: "success",
      });
    } catch (error) {
      setAlert({
        open: true,
        message: error.message,
        type: "error",
      });
    }
  };


  const removeFromWatchlist = async () => {
    const coinRef = doc(db, "watchlist", user.uid);
    try {
      await setDoc(
        coinRef,
        { coins: watchlist.filter((wish) => wish !== coin?.id) },
        { merge: true }
      );

      setAlert({
        open: true,
        message: `${coin.name} Removed from the Watchlist !`,
        type: "success",
      });
    } catch (error) {
      setAlert({
        open: true,
        message: error.message,
        type: "error",
      });
    }
  };
  

  const useStyles = makeStyles((theme) => ({
    main:{
      display: "flex",
      width :"100%",
      flexDirection:"column",
    },
    container: {
      display: "flex",
      width :"100%",

      [theme.breakpoints.down("md")]: {
        flexDirection: "column",
        alignItems: "center",
        width:"100%"
      },
    },
    sidebar: {
      width: "35%",
      [theme.breakpoints.down("md")]: {
        width: "80%",
      },
      display: "flex",
      flexDirection: "column",
      color: "#fff",
      alignItems: "center",
      marginTop: 25,
    },
    right_container:  {
      display :" flex",
      width:"65%",
      [theme.breakpoints.down("md")]: {
        width: "90%",
      },

    },
    search_container:{
      display:"flex",
      width:"100%",
    },
    heading: {
      fontWeight: "bold",
      marginBottom: 20,
      fontFamily: "Montserrat",
      cursor: "pointer"
    },
    description: {
      width: "100%",
      fontFamily: "Montserrat",
      padding: 25,
      paddingBottom: 15,
      paddingTop: 0,
      textAlign: "justify",
    },
    marketData: {
      alignSelf: "start",
      paddingTop: 0,
      width: "100%",
      [theme.breakpoints.down("md")]: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      },
      [theme.breakpoints.down("xs")]: {
        alignItems: "start",
      },
    },
  }));

  const classes = useStyles();

  if (!coin) return <LinearProgress style={{ backgroundColor: "gold" }} />;

  return (

    <div className={classes.main}>
        <div className={classes.container}>
            <div className={classes.sidebar}>
              <img
                src={coin?.image.large}
                alt={coin?.name}
                height="110"
                style={{ marginBottom: 20, borderRadius:75 }}
              />
              <Typography variant="h5" className={classes.heading} onClick={inWatchlist ? removeFromWatchlist : addToWatchlist}>
                {user ? (inWatchlist ? <StarFilled 
                  style={{
                    color: "gold",
                  }}
                />: <StarOutlined 
                style={{
                  color: "gold",
                }}
              />):<StarOutlined 
              style={{
                color: "gold",
              }}
            />}
              
              {" "}
                  {coin?.name}
              </Typography>

              <Typography variant="subtitle2" className={classes.description}>
                {ReactHtmlParser(coin?.description.en.split(". ")[0])}.
              </Typography>
              <div className={classes.marketData}>
                <span style={{ display: "flex" }}>
                  <Typography variant="h6" className={classes.heading}>
                    Rank:
                  </Typography>
                  &nbsp; &nbsp;
                  <Typography
                    variant="h5"
                    style={{
                      fontFamily: "Montserrat",
                    }}
                  >
                    {numberWithCommas(coin?.market_cap_rank)}
                  </Typography>
                </span>
                <span style={{ display: "flex" }}>
                  <Typography variant="h6" className={classes.heading}>
                    Current Price:
                  </Typography>
                  &nbsp; &nbsp;
                  <Typography
                    variant="h6"
                    style={{
                      fontFamily: "Montserrat",
                    }}
                  >
                    {symbol}{" "}
                    {numberWithCommas(
                      coin?.market_data.current_price[currency.toLowerCase()]
                    )}
                  </Typography>
                </span>
                <span style={{ display: "flex" }}>
                  <Typography variant="h6" className={classes.heading}>
                    Market Cap:
                  </Typography>
                  &nbsp; &nbsp;
                  <Typography
                    variant="h6"
                    style={{
                      fontFamily: "Montserrat",
                    }}
                  >
                    {symbol}{" "}
                    {numberWithCommas(
                      coin?.market_data.market_cap[currency.toLowerCase()]
                        .toString()
                        .slice(0, -6)
                    )}
                    M
                  </Typography>
                </span>
                
                  <a style={{textDecoration:"none"}}
                  href="https://www.binance.com/en/activity/referral/offers/claim?ref=CPA_00CGCSAS1P"><Button
                    variant="outlined"
                    style={{
                      width: "100%",
                      height: 40,
                      backgroundColor: "#28e179",
                    }}
                  >
                      BUY/SELL
                  </Button></a>
                  

              </div>
            </div>
            <div className={classes.right_container}>
            <CoinInfo coin={coin} />
            </div>
        </div>
        <div className={classes.search_container}>
            <CoinsTable />
            </div>
    </div>
  );
};

export default CoinPage;
