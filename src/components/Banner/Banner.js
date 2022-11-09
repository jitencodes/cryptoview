import { Container, makeStyles, Typography } from "@material-ui/core";
import Carousel from "./Carousel";
import { Button } from "@material-ui/core";
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  banner: {
    height: 500,
    display: "flex",
    flex: '100%',
    flexDirection: "row",
    marginTop: "130px"
  },
  left_container: {
    display: "flex",
    width:"50%", 
    flexDirection: "column",
    justifyContent: "center",
  },
  right_container: {
    display: "flex",
    maxWidth:"50%", 
    justifyContent: "center",
    alignItems: 'center',
  },
  Button:{
    backgroundColor: "#42E452",
    border: "none",
    borderRadius: "5px",
    color: "#000",
    width: "200px",
    padding: " 15px 50px 15px 20px ",
    textAlign: 'center',
    fontWeight:"900",
    textDecoration: 'none',
    fontSize: 22,
    cursor: 'pointer',
    marginTop: "50px"

  },
    
}));

function Banner() {
  const classes = useStyles();

  return (
    <div className={classes.banner}>
        <div className={classes.left_container}>
        <Typography className={classes.cryptoviewText}
            variant="h3"
            style={{
              color:"#fff",
              fontWeight: 900,
              marginBottom: 30,
              fontSize: 70
            }}
          >
            Crypto View
          </Typography>
          <Typography
            variant="h5"
            style={{
              color: "#42E452",
              textTransform: "capitalize",
              fontFamily: "Montserrat",
              marginBottom: 20,
              fontSize:28,
              fontWeight: 900,
              textTransform:"none"
            }}
          >
            By jitendra
          </Typography>
          <Typography 
            variant="h5"
            style={{
              color: "#fff",
              textTransform: "none",
              fontWeight: 100,
              fontSize: 25,
            }}
          >
          A crypto currency price tracking web application.<br></br>
          Stay updated with latest crpto currency prices and news.          
          </Typography>
          <Link className={classes.Button} to="/Currency">Let's start!</Link>
        </div>
        <div className={classes.right_container}>
        <Carousel />
        </div>
    </div>
  );
}

export default Banner;