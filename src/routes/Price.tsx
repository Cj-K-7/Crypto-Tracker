import { useQuery } from "react-query";
import styled from "styled-components";
import { fetchPrice } from "../API";
import { PriceData } from "./CoinDetail";

interface PriceProps {
  coinId: string;
}
const Loader = styled.h1`
  margin: 30px 0px;
  font-weight: 600;
  text-align: center;
  letter-spacing: 10px;
`;
const PriceBox = styled.div`
  background-color: transparent;
  border: 2px solid ${prop=>prop.theme.highlightColor};
  border-top: none;
  &::before {
    content: '';
    display: block;
    position: relative;
    top: 0;
    left : 236px;
    width: 240px;
    border-top: 2px solid ${prop=>prop.theme.highlightColor};
  }
`;
const Content =styled.div`
  padding: 30px 20px;
`;
const Header = styled.h1`
  margin-bottom : 30px;
  font-size : 36px;
  font-weight : 600;
`;
const Tablet = styled.div`
  h1{
    margin-top : 18px;
    margin-bottom : 10px;
    font-size : 22px;
    font-weight : 600;
  }
`;
const HL = styled.span`
  font-size : 28px;
  line-height : 38px;
  color: ${prop=>prop.theme.highlightColor};
`;
function Price({ coinId }: PriceProps) {
  const { isLoading , data } = useQuery<PriceData>(["price",coinId], ()=> fetchPrice(coinId),{refetchInterval: 3000});
  const priceList = data?.quotes.USD;
  return (
    <PriceBox>
      { isLoading ? (
        <Loader>
          "Loading Price info..."
        </Loader>
      ) : (
        <Content>
          <Header>${priceList?.price.toFixed(4)} [<HL>{priceList?.percent_change_24h}%</HL>]</Header>
          <hr></hr>
          <Tablet>
            <h1>MARKET CAP :<br/> <HL> ${priceList?.market_cap}</HL></h1>
            <p> the total value of all a company's shares of stock</p>
            <h1>VOLUME :<br/> <HL>{priceList?.volume_24h}</HL></h1>
            <p> the sum total of actual trades taking place within 24h</p>
          </Tablet>
        </Content>
      )}
    </PriceBox>
  );
}

export default Price;
