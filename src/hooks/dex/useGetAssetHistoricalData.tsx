import { useQuery } from "@tanstack/react-query";
import { Asset, AssetHistoricalData } from "@utils/dex/types";
import { QueryKeys } from "@utils/queryKeys";
import { useParams } from "react-router-dom";

function randomIntFromInterval(min: number, max: number) {
  // min and max included
  return Math.floor(Math.random() * (max - min + 1) + min);
}

const mockData: AssetHistoricalData = {
  timeFrom: 1716968241,
  timeTo: 1717054641,
  data: new Array(24).map((_, i) => {
    const high = randomIntFromInterval(1000, 1e18);
    const low = randomIntFromInterval(0, high);
    const open = randomIntFromInterval(low, high);
    const close = randomIntFromInterval(low, high);
    return {
      time: 1716968241 + i * 3600,
      high,
      low,
      open,
      close,
      volumeFrom: randomIntFromInterval(1, 1e18),
      volumeTo: randomIntFromInterval(1, 1e18),
    };
  }) as AssetHistoricalData["data"],
};

export default function useGetAssetHistoricalData(params?: {
  game: string;
  asset: string;
}) {
  const { game: gameFromUrl, asset: assetFromUrl } = useParams();

  const game = params?.game || gameFromUrl;
  const asset = params?.asset || assetFromUrl;

  return useQuery<AssetHistoricalData>({
    queryKey: [QueryKeys.SellableAssets],
    queryFn: async () => {
      return mockData;
    },
  });
}
