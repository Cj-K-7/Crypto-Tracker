import { useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import styled from "styled-components";

interface RouteParams {
  coinId:string;
}
interface RouteState {
  name:string;
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
  margin-top: 30px;
  margin-left: 30px;
  font-size: 30px;
  font-weight: 600;
  letter-spacing: 10px;
`;
const Title = styled.h1`
  font-size: 28px;
  color: ${props=> props.theme.highlightColor};
`;
const Loader = styled.h1`
  margin-top: 30px;
  font-size: 30px;
  font-weight: 600;
  text-align: center;
  letter-spacing: 10px;
`;

const CoinDetail = () => {
  const [loading, setLoading] = useState(true);
  const { coinId } = useParams<RouteParams>();
  const { state } = useLocation<RouteState>();

  return (
    <Container>
    <Header>
      <Title> {state?.name || "Please Back to Home"} </Title>
    </Header>
    {loading ? (
      <Loader>"Loading..."</Loader>
    ):(  null   )}
    </Container>
  )
};

export default CoinDetail;
