import { useQuery } from "react-query";
import { fetchOHLCV } from "../API";
import ApexChart from "react-apexcharts";
import styled from "styled-components";
import { useState } from "react";

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

interface ChartProps {
  coinId: string;
}
const Loader = styled.h1`
  margin: 30px 0px;
  font-weight: 600;
  text-align: center;
  letter-spacing: 10px;
`;
const ChartBox = styled.div`
  background-color: transparent;
  border: 2px solid ${prop=>prop.theme.highlightColor};
  border-top: none;
  &::before {
    content: '';
    display: block;
    position: relative;
    top: 0;
    left: 0;
    width: 240px;
    border-top: 2px solid ${prop=>prop.theme.highlightColor};
  }
`;
const Toggle = styled.button`
  position: relative;
  top : 10px;
  left : 16px;
  padding : 6px;
  border : none;
  background-color: inherit;
  color : inherit;
  font-size : 20px;
`;

function Chart({ coinId }: ChartProps) {
  const { isLoading, data } = useQuery<IData[]>(
    ["ohlcv", coinId],
    () => fetchOHLCV(coinId, 14),
    { refetchInterval: 5000 }
  );
  return (
    <ChartBox>
      {isLoading ? (
        <Loader>"Loading chart..."</Loader>
      ) : (
        <ApexChart
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
            },
            fill: {
              type:"solid"
            },
            grid: { show: false },
            theme: { mode: "dark" },
            stroke: { width: 1 },
          }}
        />
      )}
    </ChartBox>
  );
}

export default Chart;
