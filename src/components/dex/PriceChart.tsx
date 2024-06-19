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
  const [volumeSeries, setVolumeSeries] =
    useState<ReturnType<IChartApi["addHistogramSeries"]>>();
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
        horzLines: { style: LineStyle.Solid, color: theme.palette.grey[900] },
        vertLines: { style: LineStyle.Solid, color: theme.palette.grey[900] },
      },
      rightPriceScale: {
        borderColor: "transparent",
      },
      timeScale: {
        borderColor: "transparent",
        timeVisible: true,
        secondsVisible: false,
      },
    });
    setChart(chart);
    const candleSeries = chart.addCandlestickSeries({
      priceFormat: { minMove: 0.00000001 },
    });
    candleSeries.priceScale().applyOptions({
      scaleMargins: {
        top: 0.1, // highest point of the series will be 10% away from the top
        bottom: 0.4, // lowest point will be 40% away from the bottom
      },
    });
    setChartSeries(candleSeries);
    const histogramSeries = chart.addHistogramSeries({
      priceFormat: {
        type: "volume",
      },
      priceScaleId: "", // set as an overlay by setting a blank priceScaleId
    });
    histogramSeries.priceScale().applyOptions({
      // set the positioning of the volume series
      scaleMargins: {
        top: 0.7, // highest point of the series will be 70% away from the top
        bottom: 0,
      },
    });
    setVolumeSeries(histogramSeries);
  }, [data]);

  useEffect(() => {
    if (!data || !chartSeries || !volumeSeries) return;
    if (chartSeries.data.length === 0) {
      chartSeries.setData(data.data as any);
      volumeSeries.setData(
        data.data.map((d) => ({
          ...d,
          value: d.volumeFrom,
          color: d.close < d.open ? "#ef5350" : "#26a69a",
        })) as any,
      );
      chart?.timeScale().fitContent();
    } else {
      const rawLastData = data.data[data.data.length - 1];
      const formattedData = {
        ...rawLastData,
        time: new Date(rawLastData.time).toISOString(),
      };
      chartSeries.update(formattedData);
      volumeSeries.update({
        ...formattedData,
        value: formattedData.volumeFrom,
        color: formattedData.close < formattedData.open ? "#ef5350" : "#26a69a",
      });
    }
  }, [data, chartSeries, volumeSeries]);

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
