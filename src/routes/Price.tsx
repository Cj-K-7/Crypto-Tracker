import ApexCharts from "react-apexcharts"
import { useQuery } from "react-query";
import styled from "styled-components";
import { fetchOHLCV } from "../API";

interface IData {
  close: Number;
  high: number;
  low: number;
  market_cap: number;
  open: number;
  time_close: string;
  time_open: string;
  volume: number;
}

interface PriceProps {
  coinId: string;
}
const Loader = styled.h1`
  margin-top: 30px;
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

function Price({ coinId }: PriceProps) {
  const { isLoading, data } = useQuery<IData[]>(
    ["ohlcv", coinId],
    () => fetchOHLCV(coinId, 28),
    { refetchInterval: 5000 }
  );
  return (
    <PriceBox>
      {isLoading ? (
        <Loader>
          "Loading Price info..."
        </Loader>
      ) : (
        <ApexCharts
          type="candlestick"
          series={[
            {
              name: "Price",
              data: data?.map(({ open, high, low, close, time_close }) => {
                return { x: new Date(time_close), y: [open, high, low, close] };
              }),
            },
          ]}
          options={{
            chart: {
              type: "candlestick",
              background: "transparent",
              height: 480,
              width: 480,
              toolbar: { show: false },
            },
            xaxis: {
              type: "datetime",
            },
            yaxis: {
              show: false,
              tooltip: {
                enabled: true,
              },
            },
            plotOptions: {
              bar: {
                columnWidth: "200%",
              },
            },
            grid: { show: false },
            theme: { mode: "dark" },
            stroke: { width: 1 },
            tooltip: {
              y: { formatter: (value) => `$${value.toFixed(2)}` },
            },
          }}
        />
      )}
    </PriceBox>
  );
}

export default Price;
