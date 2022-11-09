import React, { useEffect, useState } from "react";


import { makeStyles } from "@material-ui/core/styles";
import Pagination from "@material-ui/lab/Pagination";
import {
  Container,
  createTheme,
  TableCell,
  LinearProgress,
  ThemeProvider,
  Typography,
  TextField,
  TableBody,
  TableRow,
  TableHead,
  TableContainer,
  Table,
  Paper,
} from "@material-ui/core";
import axios from "axios";
import { Exchanges } from "../config/api";
import { useHistory } from "react-router-dom";
import { CryptoState } from "../CryptoContext";

export function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

export default function ExchnagePage () {

  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");

  const { currency, symbol,  loading } = CryptoState();
 
  const useStyles = makeStyles({
    row: {
      backgroundColor: "#02183c",
      cursor: "pointer",
      "&:hover": {
        backgroundColor: "#02183cc7",
      },
      fontFamily: "Montserrat",
    },
    container:{
      width:"80%",
      marginTop:30
    },
    pagination: {
      "& .MuiPaginationItem-root": {
        color: "gold",
      },
    },
  });

  const classes = useStyles();
  // const history = useHistory();

  const darkTheme = createTheme({
    palette: {
      primary: {
        main: "#fff",
      },
      type: "dark",
    },
  });

  const [exchangesList, setExchangesList] = useState([]);
  const fetchExchanges = async () => {
    const { data } = await axios.get(Exchanges());
    console.log(data);
    setExchangesList(data);
    console.log(exchangesList);

  };
  
  useEffect(() => {
    fetchExchanges();
  }, []);


  const handleSearch = () => {
    return exchangesList.filter(
      (exch) =>
        exch.name.toLowerCase().includes(search) ||
        exch.id.toLowerCase().includes(search)
    );
  };

  return (
    <ThemeProvider theme={darkTheme} >
      <Container style={{ textAlign: "center" }} className={classes.container} >
        <Typography
          variant="h4"
          style={{ margin: 18, fontFamily: "Montserrat", color:"#fff" }}
        >
          Global Crypto Exchanges
        </Typography>
        <TextField
          label="Search For a Crypto Currency.."
          variant="outlined"
          style={{ marginBottom: 20, width: "100%" }}
          onChange={(e) => setSearch(e.target.value)}
        />
        <TableContainer component={Paper}>
          {loading ? (
            <LinearProgress style={{ backgroundColor: "gold" }} />
          ) : (
            <Table aria-label="simple table">
              <TableHead style={{ backgroundColor: "#199e53" }}>
                <TableRow>
                  {["Exchanges", "24h Volume" , "Country", "Links"].map((head) => (
                    <TableCell
                      style={{
                        color: "#010a1e",
                        fontWeight: "700",
                        fontFamily: "Montserrat",
                      }}
                      key={head}
                      align={head === "Exchanges" ? "" : "right"}
                    >
                      {head}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>

              <TableBody>
              {handleSearch()
                  .slice((page - 1) * 10, (page - 1) * 10 + 10)
                  .map((row) => (
                    <TableRow
                      className={classes.row}
                      key={row.name}
                    > 
                      <TableCell
                        component="th"
                        scope="row"
                        style={{
                          display: "flex",
                          gap: 15,
                        }}
                      > <div
                        style={{ display: "flex", justifyContent: "centre" }}
                        >{row.trust_score_rank+"."}
                        </div>
                        <img
                          src={row?.image}
                          alt={row?.name}
                          height="50"
                          style={{ marginBottom: 10, borderRadius:50 }}
                          />
                        <div
                          style={{ display: "flex", flexDirection: "column" }}
                        >
                          
                          <span style={{ color: "#fff", fontSize:20, }}>
                            {row.name}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell align="right">
                        {numberWithCommas(row.trade_volume_24h_btc.toFixed(2))}{" BTC"}
                      </TableCell>
                      
                      <TableCell align="right">
                        {
                          row.country
                        }
                        
                      </TableCell>
                      <TableCell
                        align="right"
                        style={{
                          color:"green",
                          fontWeight: 500,
                        }}
                      >
                        <a href={row.url}
                           style={{textDecoration:"none", color:"#fff", backgroundColor:"#199e53", padding:"5px", borderRadius:"5px"}}
                        >Go</a>
                      </TableCell>
                      </TableRow>           
              ))} 
            </TableBody>
            </Table>
          )}
        </TableContainer>

        {/* Comes from @material-ui/lab */}
        <Pagination
          count={(handleSearch()?.length / 10).toFixed(0)}
          style={{
            padding: 20,
            width: "100%",
            display: "flex",
            justifyContent: "center",
          }}
          classes={{ ul: classes.pagination }}
          onChange={(_, value) => {
            setPage(value);
            window.scroll(0, 450);
          }}
        />
      </Container>
    </ThemeProvider>
  );
}