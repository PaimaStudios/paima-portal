import useGetAssetHistoricalData from "@hooks/dex/useGetAssetHistoricalData";
import { Stack, useTheme } from "@mui/material";
import { IChartApi, LineStyle, createChart } from "lightweight-charts";
import { useEffect, useState } from "react";

export default function PriceChart() {
  const theme = useTheme();
  const { data } = useGetAssetHistoricalData();
  const [chartSeries, setChartSeries] =
    useState<ReturnType<IChartApi["addCandlestickSeries"]>>();

  useEffect(() => {
    const chartContainer = document.getElementById("chartContainer");
    if (!chartContainer || chartContainer.children.length !== 0) return;

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
    const candleSeries = chart.addCandlestickSeries({
      priceFormat: { minMove: 0.000001 },
      //   upColor: theme.palette.primary.main,
      //   downColor: "#ff6666",
      //   wickUpColor: theme.palette.primary.main,
      //   wickDownColor: "#ff6666",
      //   borderVisible: false,
    });
    setChartSeries(candleSeries);
  }, []);

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
  return (
    <Stack id="chartContainer" sx={{ width: "100%", minHeight: 400 }}></Stack>
  );
}
