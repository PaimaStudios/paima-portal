import useGetAssetHistoricalData from "@hooks/dex/useGetAssetHistoricalData";
import useGetGameAssetMetadata from "@hooks/dex/useGetGameAssetMetadata";
import { Skeleton, Stack, Typography, useTheme } from "@mui/material";
import {
  formatEth,
  formatUnitsWithoutStrippingTrailingZeros,
} from "@utils/evm/utils";
import {
  BarPrice,
  CrosshairMode,
  HistogramData,
  IChartApi,
  LineStyle,
  Time,
  createChart,
} from "lightweight-charts";
import { useEffect, useRef, useState } from "react";
import { useResizeObserver } from "usehooks-ts";
import { formatEther } from "viem";
import { formatNumberWithSubscriptZeros } from "@haqq/format-number-with-subscript-zeros";

export default function PriceChart() {
  const theme = useTheme();
  const { data } = useGetAssetHistoricalData();
  const { data: assetMetadata } = useGetGameAssetMetadata();
  const chartContainerRef = useRef<HTMLDivElement>(null);
  const [chart, setChart] = useState<IChartApi>();
  const [chartSeries, setChartSeries] =
    useState<ReturnType<IChartApi["addCandlestickSeries"]>>();
  const [volumeSeries, setVolumeSeries] =
    useState<ReturnType<IChartApi["addHistogramSeries"]>>();
  const { width = 0, height = 0 } = useResizeObserver({
    ref: chartContainerRef,
  });
  const volumeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const chartContainer = document.getElementById("chartContainer");
    if (
      !data ||
      !assetMetadata ||
      !chartContainer ||
      chartContainer.children.length !== 0
    )
      return;

    const chart = createChart(chartContainer, {
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
      crosshair: {
        mode: CrosshairMode.Normal,
      },
      localization: {
        priceFormatter: (priceValue: BarPrice) => {
          if (!isFinite(priceValue)) return "";
          return `${formatNumberWithSubscriptZeros(
            formatUnitsWithoutStrippingTrailingZeros(
              BigInt(priceValue.toFixed(0)),
              18,
            ),
          )} ${assetMetadata?.toSym}`;
        },
      },
    });
    setChart(chart);
    const candleSeries = chart.addCandlestickSeries({});
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
        minMove: 0.000001,
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

    const volumeLabel = volumeRef.current;
    if (volumeLabel) {
      volumeLabel.innerHTML = formatEther(
        BigInt(data.data[data.data.length - 1].volumeTo),
      );
    }
    chart.subscribeCrosshairMove((param) => {
      let volumeFormatted = "";
      if (param.time) {
        const dataPoint = param.seriesData.get(histogramSeries) as
          | HistogramData<Time>
          | undefined;
        if (dataPoint) {
          volumeFormatted = formatEther(BigInt(dataPoint.value));
        }
      } else {
        volumeFormatted = formatEther(
          BigInt(data.data[data.data.length - 1].volumeTo),
        );
      }

      if (volumeLabel) {
        volumeLabel.innerHTML = volumeFormatted;
      }
      // legend is a html element which has already been created
      // legend.innerHTML = `${symbolName} <strong>${volumeFormatted}</strong>`;
    });
  }, [data, assetMetadata]);

  useEffect(() => {
    if (!data || !chartSeries || !volumeSeries) return;
    if (chartSeries.data.length === 0) {
      chartSeries.setData(data.data as any);
      volumeSeries.setData(
        data.data.map((d) => ({
          ...d,
          value: d.volumeTo,
          color: d.close < d.open ? "#ef535080" : "#26a69a80",
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
        value: formattedData.volumeTo,
        color:
          formattedData.close < formattedData.open ? "#ef535080" : "#26a69a80",
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
      <Stack sx={{ width: "100%", minHeight: 400, position: "relative" }}>
        <Stack
          ref={chartContainerRef}
          id="chartContainer"
          sx={{ width: "100%", minHeight: 400 }}
        ></Stack>
        <Stack
          sx={{
            position: "absolute",
            left: 4,
            top: 4,
            zIndex: 1,
            p: 1,
            bgcolor: "rgba(0,0,0,0.5)",
          }}
        >
          <Typography>
            Market Cap:{" "}
            {assetMetadata && data ? (
              `${formatEth(
                BigInt(
                  assetMetadata.totalSupply *
                    data.data[data.data.length - 1].close,
                ),
              )} ${assetMetadata.toSym}`
            ) : (
              <Skeleton
                variant="text"
                sx={{ display: "inline-block", width: 100 }}
              />
            )}
          </Typography>
          <Typography component="span" variant="caption">
            Volume{" "}
            <Typography
              ref={volumeRef}
              component="span"
              variant="caption"
            ></Typography>
            <Typography component="span" variant="caption">
              {" "}
              {assetMetadata?.toSym}
            </Typography>
          </Typography>
        </Stack>
      </Stack>
    </>
  );
}
