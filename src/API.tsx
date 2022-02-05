export const fetchCoins = () => {
  return fetch("https://api.coinpaprika.com/v1/coins").then((res) =>
    res.json()
  );
};

export const fetchInfo = (coinId:string) => {
  return fetch(`https://api.coinpaprika.com/v1/coins/${coinId}`).then((res) =>
    res.json()
  );
};

export const fetchPrice = (coinId:string) => {
  return fetch(`https://api.coinpaprika.com/v1/tickers/${coinId}`).then((res) =>
    res.json()
  );
};
