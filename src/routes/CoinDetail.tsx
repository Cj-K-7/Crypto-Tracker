import { useQuery } from "react-query";
import { Link, Route, Switch, useLocation, useParams, useRouteMatch } from "react-router-dom";
import styled from "styled-components";
import { fetchInfo, fetchPrice } from "../API";
import Chart from "./Chart";
import Price from "./Price";

interface RouteParams {
  coinId:string;
}
interface RouteState {
  name:string;
}
interface InfoData {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  is_new: boolean;
  is_active: boolean;
  type: string;
  description: string;
  message: string;
  open_source: boolean;
  started_at: string;
  development_status: string;
  hardware_wallet: boolean;
  proof_type: string;
  org_structure: string;
  hash_algorithm: string;
  first_data_at: string;
  last_data_at: string;
}
interface PriceData {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  circulating_supply: number;
  total_supply: number;
  max_supply: number;
  beta_value: number;
  first_data_at: string;
  last_updated: string;
  quotes: {
    USD: {
      ath_date: string;
      ath_price: number;
      market_cap: number;
      market_cap_change_24h: number;
      percent_change_1h: number;
      percent_change_1y: number;
      percent_change_6h: number;
      percent_change_7d: number;
      percent_change_12h: number;
      percent_change_15m: number;
      percent_change_24h: number;
      percent_change_30d: number;
      percent_change_30m: number;
      percent_from_price_ath: number;
      price: number;
      volume_24h: number;
      volume_24h_change_24h: number;
    };
  };
}

const Container = styled.div`
  max-width: 480px;
  margin: 0 auto;
  -webkit-touch-callout: none;
  -webkit-user-select: none;
  -khtml-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
`;
const Header = styled.header`
  display: flex;
  margin-top: 48px;
  margin-left: 30px;
  letter-spacing: 10px;
`;
const Title = styled.h1`
  font-size: 38px;
  font-weight: 600;
  color: ${props=> props.theme.highlightColor};
`;
const Loader = styled.h1`
  margin-top: 30px;
  font-size: 30px;
  font-weight: 600;
  text-align: center;
  letter-spacing: 10px;
`;
const Rank = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: flex-end;
  margin-right: 20px;
  font-weight: 700;
  span{
    font-size: 24px;
  }
`;
const Description = styled.p`
 padding: 20px 10px;
`;
const DashBoard = styled.div`
  margin: 20px;
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr 1fr;
  grid-gap: 16px;
`;
const GridElement = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;
  padding : 15px 0px;
  font-weight: 600;
  box-shadow: 8px 6px 16px black inset;
  border-radius: 6px;
  label{
    margin-bottom: 10px;
    font-size: 20px;
    color: ${prop=>prop.theme.highlightColor};
    text-shadow : 0px 0px 2px ${prop=>prop.theme.highlightColor};
  }
`;
const TABS = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  font-size: 20px;
  margin: 5px 10px;
`;
const TAB = styled.div<{ isActive : boolean }>`
  width: 100%;
  padding: 10px 0px;
  text-align: center;
  background-color: ${props=> props.isActive ? "black" : props.theme.backgroundColor};
  a{
    padding : 10px 20px;
    &:hover{
      color: ${prop=>prop.theme.highlightColor};
    }
  }`;

const CoinDetail = () => {
  const { coinId } = useParams<RouteParams>();
  const { state } = useLocation<RouteState>();

  //useQuery
  const {isLoading : infoLoading , data : coinInfo} = useQuery<InfoData>(["info",coinId], ()=> fetchInfo(coinId));
  const {isLoading : priceLoading , data : coinPrice} = useQuery<PriceData>(["price",coinId], ()=> fetchPrice(coinId));
  const priceMatch = useRouteMatch("/:coinId/price");
  const chartMatch = useRouteMatch("/:coinId/chart");

  const priceUSD = coinPrice?.quotes.USD;
  const loading : boolean = priceLoading || infoLoading;

  return (
    <Container>
      <Header>
        <Title>
          {" "}
          {state?.name
            ? state.name
            : loading
            ? "Loading..."
            : coinInfo?.name}{" "}
        </Title>
      </Header>
      {loading ? (
        <Loader>"Loading..."</Loader>
      ) : (
        <>
          <Rank>
            RANK <span>"{coinInfo?.rank}"</span>
          </Rank>
          <DashBoard>
            <GridElement>
              <label>PRICE</label> ${priceUSD?.price.toFixed(1)}
            </GridElement>
            <GridElement>
              <label>ALL-TIME-HIGH</label>${priceUSD?.ath_price.toFixed(1)}
            </GridElement>
            <GridElement>
              <label>TOTAL SUPPLY</label> {coinPrice?.total_supply}
            </GridElement>
            <GridElement>
              <label>MAX SUPPLY</label> {coinPrice?.max_supply}
            </GridElement>
            <GridElement>
              <label>SYMBOL</label> {coinInfo?.symbol}
            </GridElement>
            <GridElement>
              <label>
                {coinInfo?.open_source ? "Open Source" : "Closed Source"}
              </label>
            </GridElement>
          </DashBoard>
          <TABS>
            <TAB isActive={priceMatch !== null}>
              <Link
                to={{
                  pathname: `/${coinId}/price`,
                }}
              >
                PRICE
              </Link>
            </TAB>
            <TAB isActive={chartMatch !== null}>
              <Link
                to={{
                  pathname: `/${coinId}/chart`,
                }}
              >
                CHART
              </Link>
            </TAB>
          </TABS>
          <Switch>
            <Route path="/:coinId/price">
              <Price />
            </Route>
            <Route path="/:coinId/chart">
              <Chart />
            </Route>
          </Switch>
          <Description>{coinInfo?.description}</Description>
        </>
      )}
    </Container>
  );
};

export default CoinDetail;
