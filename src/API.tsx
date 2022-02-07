const coinpaprikaApiURL =  "https://api.coinpaprika.com/v1";

export const fetchCoins = () => {
  return fetch(`${coinpaprikaApiURL}/coins`).then((res) =>
    res.json()
  );
};

export const fetchInfo = (coinId:string) => {
  return fetch(`${coinpaprikaApiURL}/coins/${coinId}`).then((res) =>
    res.json()
  );
};

export const fetchPrice = (coinId:string) => {
  return fetch(`${coinpaprikaApiURL}/tickers/${coinId}`).then((res) =>
    res.json()
  );
};

export const fetchOHLCV = (coinId:string, day:number) => {
  const end= Math.floor(Date.now()/1000); //seconds
  const start= end - 60*60*24*day;
  return fetch(`${coinpaprikaApiURL}/coins/${coinId}/ohlcv/historical?start=${start}&end=${end}`).then((res) =>
  res.json()
);
}