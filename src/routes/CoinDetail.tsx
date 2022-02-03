import { useParams } from "react-router-dom";

interface RouteParams {
  coinId:string;
}

const CoinDetail = () => {
  const { coinId } = useParams<RouteParams>();
  return <div> Coin: {coinId} </div>;
};

export default CoinDetail;
