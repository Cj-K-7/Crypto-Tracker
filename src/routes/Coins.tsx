import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

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
  margin-top: 30px;
  margin-left: 30px;
  font-size: 30px;
  font-weight: 600;
  letter-spacing: 10px;
`;
const CoinsList = styled.ul`
  padding: 20px;
`;
const Coin = styled.li`
  padding: 20px;
  margin-bottom: 15px;
  font-size: 20px;
  transition: 0.4s;
  letter-spacing: 5px;
  a {
    display: flex;
    flex-direction: row;
    align-items: center;
  }
  &:hover {
    margin-top: -3px;
    margin-left: -2px;
    box-shadow: 0px 1.6px 0px ${(props) => props.theme.hoverColor};
    transition: 0.4s;
    color: ${(props) => props.theme.hoverColor};
    a::after {
      content: "◥";
    }
  }
`;
const Title = styled.h1`
  font-size: 2em;
`;
const Icon = styled.img`
width: 26px;
height: 26px;
margin-right: 10px;
`;
const Loader = styled.h1`
  margin-top: 30px;
  font-size: 30px;
  font-weight: 600;
  text-align: center;
  letter-spacing: 10px;
`;

interface CoinInterface {
    id: string,
    name: string,
    symbol: string,
    rank: number,
    is_new: boolean,
    is_active: boolean,
    type: string,
}

function Coins () {
  const [coins, setCoins] = useState<CoinInterface[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(()=>{
    (async () =>{
      const data = await fetch("https://api.coinpaprika.com/v1/coins").then(res=>res.json())
      setCoins(data.slice(0, 100));
      setLoading(false);
      })();
  },[]) //only begging

  return (
    <Container>
      <Header>
        <Title>Coins</Title>
      </Header>
      {loading ? <Loader>"Loading..."</Loader> : <CoinsList>
        {coins.map((coin) => (
          <Coin key={coin.id}>
            <Link to={`/${coin.id}`}>
              <Icon src={`https://cryptoicon-api.vercel.app/api/icon/${coin.symbol.toLowerCase()}`}/>
              {coin.name}
              </Link>
          </Coin>
        ))}
      </CoinsList>}
    </Container>
  );
};

export default Coins;
