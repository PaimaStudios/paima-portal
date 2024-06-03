import useGetAssetHistoricalData from "@hooks/dex/useGetAssetHistoricalData";
import { Skeleton, Stack, useTheme } from "@mui/material";
import { IChartApi, LineStyle, createChart } from "lightweight-charts";
import { useEffect, useRef, useState } from "react";
import { useResizeObserver } from "usehooks-ts";

export default function PriceChart() {
  const theme = useTheme();
  const { data } = useGetAssetHistoricalData();
  const chartContainerRef = useRef<HTMLDivElement>(null);
  const [chart, setChart] = useState<IChartApi>();
  const [chartSeries, setChartSeries] =
    useState<ReturnType<IChartApi["addCandlestickSeries"]>>();
  const { width = 0, height = 0 } = useResizeObserver({
    ref: chartContainerRef,
  });

  useEffect(() => {
    const chartContainer = document.getElementById("chartContainer");
    if (!data || !chartContainer || chartContainer.children.length !== 0)
      return;

    const chart = createChart(document.getElementById("chartContainer")!, {
      layout: {
        background: { color: theme.palette.background.default },
        textColor: theme.palette.text.primary,
      },
      grid: {
        horzLines: { style: LineStyle.SparseDotted },
        vertLines: { style: LineStyle.SparseDotted },
      },
      rightPriceScale: {
        borderColor: "transparent",
      },
      timeScale: {
        borderColor: "transparent",
      },
    });
    setChart(chart);
    const candleSeries = chart.addCandlestickSeries({
      priceFormat: { minMove: 0.000001 },
    });
    setChartSeries(candleSeries);
  }, [data]);

  useEffect(() => {
    if (!data || !chartSeries) return;
    if (chartSeries.data.length === 0) {
      chartSeries.setData(data.data as any);
    } else {
      const rawLastData = data.data[data.data.length - 1];
      const formattedData = {
        ...rawLastData,
        time: new Date(rawLastData.time).toISOString(),
      };
      chartSeries.update(formattedData);
    }
  }, [data, chartSeries]);

  useEffect(() => {
    if (!chart) return;
    chart.resize(width, height);
  }, [width, height]);

  return (
    <>
      {!data && <Skeleton variant="rectangular" height="100%" />}
      <Stack
        ref={chartContainerRef}
        id="chartContainer"
        sx={{ width: "100%", minHeight: 400 }}
      ></Stack>
    </>
  );
}
