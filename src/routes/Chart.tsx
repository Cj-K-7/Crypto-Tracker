import { useQuery } from "react-query";
import { fetchOHLCV } from "../API";
import ApexChart from "react-apexcharts";
import styled from "styled-components";

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

function Chart({ coinId }: ChartProps) {
  const { isLoading, data } = useQuery<IData[]>(["ohlcv", coinId], () =>
    fetchOHLCV(coinId)
  );
  return (
    <ChartBox>
      {isLoading ? (
        "Loading chart..."
      ) : (
        <ApexChart
          type="line"
          series={[
            {
              name: "Price",
              data: data?.map((price) => price.close),
            },
          ]}
          options={{
            xaxis: {
              type: "datetime",
              categories: data?.map((price) => price.time_close),
              labels: { show: false },
              axisTicks: { show: false },
              axisBorder: { show: false },
            },
            yaxis: { show: false },
            fill: {
              type: "gradient",
              gradient: { gradientToColors: ["blue"], stops: [0, 100] },
            },
            colors: ["cyan"],
            grid: { borderColor: 'rgb(70,100,100)' },
            chart: {
              background: "transparent",
              height: 500,
              width: 480,
            },
            theme: { mode: "dark" },
            stroke: { curve: "smooth", width: 3 },
            tooltip: {
              y: { formatter: (value) => `$${value.toFixed(2)}` },
            },
          }}
        />
      )}
    </ChartBox>
  );
}

export default Chart;
