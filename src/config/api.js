
  export const CoinList = (currency) =>
  `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency}&order=market_cap_desc&per_page=100&page=1&sparkline=false`;

  export const SingleCoin = (id) =>
  `https://api.coingecko.com/api/v3/coins/${id}`;

  export const HistoricalChart = (id, days = 365, currency) =>
  `https://api.coingecko.com/api/v3/coins/${id}/market_chart?vs_currency=${currency}&days=${days}`;

  export const News = () =>
  `https://newsdata.io/api/1/news?apikey=pub_7321273884be5525a24f53fe310d3f6df662&q=crypto&language=en`;

  export const Exchanges = () =>
  `https://api.coingecko.com/api/v3/exchanges`;

  export const TrendingCoins = (currency) =>
  `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency}&order=gecko_desc&per_page=10&page=1&sparkline=false&price_change_percentage=24h`;

