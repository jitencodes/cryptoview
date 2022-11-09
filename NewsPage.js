import React , { useEffect, useState } from 'react'
import axios from "axios";
import {News} from "../config/api";
import { Exchanges } from "../config/api";
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Modal from '@material-ui/core/Modal';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import { CryptoState } from "../CryptoContext";
import { doc, setDoc, addDoc } from "firebase/firestore";
import { db } from "../firebase";

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #fff',
  boxShadow: 24,
  p: 4,
};
const useStyles = makeStyles({
  newsPage:{
    // border: "2px solid blue",
    display:"flex",
    flexDirection:"column",
    justifyContent:"center",
    marginBottom:"40px"
  },
  heading:{
    display:"flex",
    fontSize:"60px",
    color: "#fff",
    fontWeight: "bold",
    margin: "30px",
    textJustify:"center",
    fontFamily:"open sans extra bold",
    // border: "2px solid red",
    justifyContent:"center",
  },
  main:{
    display:"grid",
    // border: "2px solid blue",
    gridTemplateColumns: "repeat(3, 1fr)",
    gap: "30px",
    gridAutoRows: "minmax(100px, auto)",
  },

  card: {
    backgroundColor:"#9c43cd",
    borderRadius:"10px",
    height :"220px",
    width :"320px",    
    color:"#fff",
  },
  media: {
    // border: "2px solid red",
    width :"320px",
    height: "120px",
    margin:"5px"
  },
  CardActionArea:{
    display:"flex",
    flexDirection:"row",
    // height:"200px"
  },
  CardContent:{
    paddingBottom:"0px",
    height:"90px",
  },
 
  cardDescription:{
    // overflow: "hidden",
    position: "relative", 
    // lineHeight: "1rem",
    // maxHeight: "2rem",
    textAlign: "justify",
    marginBottom:"0px"  
  },
  CardTitle:{
    overflow: "hidden",
    position: "relative", 
    lineHeight: "2rem",
    maxHeight: "2rem",
    textAlign: "left",
    marginBottom:"15px",
    textTransform:"capitalize"
  },
  
  button:{
    marginTop: "40px",
    marginLeft: "10px",
    color:"#42E452",
    
  }
});

const NewsPage = () => {
  const { currency, symbol,  loading, user } = CryptoState();

const [newsList, setNewsList] = useState([]);
const [country, setCountry] = useState();
const [open, setOpen] = React.useState(false);
const handleOpen = () => setOpen(true);
const handleClose = () => setOpen(false);
const classes = useStyles();

  const fetchNews = async () => {
    const { data } = await axios.get(News());
    const val =  data?.results;
    setNewsList(val);
    console.log(val);
    
  };
 
  useEffect(() => {
    fetchNews();
  }, []);

  const demoImg = [ "https://mma.prnewswire.com/media/1843289/Space_SIP_Version_2_0.jpg?p=original",
                    "https://media.gettyimages.com/photos/crypto-currency-picture-id914500450?s=612x612",
                    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQMV5h9XwkODvqVme1zpuoNgmrwu2r5sp3xew&usqp=CAU",
                    "https://www.google.com/imgres?imgurl=https%3A%2F%2Fwww.interactivebrokers.com%2Fimages%2Fweb%2Fcryptocurrency-hero.jpg&imgrefurl=https%3A%2F%2Fwww.interactivebrokers.com%2Fen%2Fpricing%2Fproducts-cryptocurrencies.php&tbnid=fWisji5pzQMzjM&vet=12ahUKEwiwzeiLlof5AhXcxKACHYJUADAQMygbegUIARCaAg..i&docid=eYLmV8wllEfGtM&w=1000&h=667&q=crypto%20images&ved=2ahUKEwiwzeiLlof5AhXcxKACHYJUADAQMygbegUIARCaAg",
                    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT-b18zliagq6sWs_tZmzdVx9cJ3rZEmwxy5g&usqp=CAU",
                    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRX5r_zQeJa_32Dy22qFKKz4jURS3Q2BUTyRg&usqp=CAU",
                    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSgh04eMSMPwAK_Glb4259zuw77tK17rQARCw&usqp=CAU",
                    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSsUhAm2fDcI8YsSPLDY7iXmR24EROfpv13Uw&usqp=CAU",

];

  return (
  <div className={classes.newsPage}>
      <Typography className={classes.heading}>
      Latest Crypto News
      </Typography>
    <div className={classes.main}>
      
    {newsList.map((row, id) => (
          <Card key={id} className={classes.card}>
            <CardActionArea className={classes.CardActionArea}>
              <CardContent className={classes.CardContent}>
                <Typography className={classes.CardTitle} gutterBottom variant="h5" component="h2">
                {row.source_id}
                </Typography>
                <Typography className={classes.cardDescription} variant="body2" component="p">
                  {row.title}
                </Typography>
              </CardContent>
              <CardMedia
                className={classes.media}
                image={row.image_url ? row.image_url : demoImg[6]}
              />
            </CardActionArea>
            <div className={classes.blank}>

            </div>
            <Button className={classes.button} onClick={handleOpen} size="small" color="primary">
              <a  style={{textDecoration:"none", color:"#0af16e",}} href={row.link}>Learn More</a>
            </Button>
          </Card>

            ))} 
    </div>
  </div>
  )
}

export default NewsPage