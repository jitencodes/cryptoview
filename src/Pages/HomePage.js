import React, { useEffect, useState } from "react";
import Banner from "../components/Banner/Banner";
import Banner2 from "../components/Banner/Banner2";
import Banner3 from "../components/Banner/Banner3";
import NewsPage from "./NewsPage";
import axios from "axios";

import { SingleCoin } from "../config/api";


const Homepage = () => {
  const [coin, setCoin] = useState();
  const chart  = "bitcoin";

  const fetchCoin = async () => {
    const { data } = await axios.get(SingleCoin(chart));

    setCoin(data);
    

  };

  useEffect(() => {
    fetchCoin();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

    console.log(chart);
    console.log( " data is here "+coin);
  return (
    <>
      <Banner />
      <Banner2 coin={coin} />
      <Banner3 />
    </>
  );
};

export default Homepage;