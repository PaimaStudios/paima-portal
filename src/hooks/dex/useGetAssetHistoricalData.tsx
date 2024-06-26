import { gamesApi } from "@config/api";
import { useQuery } from "@tanstack/react-query";
import { AssetHistoricalData } from "@utils/dex/types";
import { QueryKeys } from "@utils/queryKeys";
import axios from "axios";
import useGetGameAndAssetFromUrl from "./useGetGameAndAssetFromUrl";
import { formatEther } from "viem";

export default function useGetAssetHistoricalData(params?: {
  game: string;
  asset: string;
}) {
  const { game: gameFromUrl, asset: assetFromUrl } =
    useGetGameAndAssetFromUrl();

  const game = params?.game || gameFromUrl;
  const asset = params?.asset || assetFromUrl;

  return useQuery<AssetHistoricalData | null>({
    queryKey: [QueryKeys.AssetHistoricalData],
    refetchInterval: 10000,
    queryFn: async () => {
      if (!game || !asset) return null;
      const gameApi = gamesApi[game];
      if (!gameApi) return null;
      const response = await axios.get<AssetHistoricalData>(
        `${gameApi}/dex/${asset}/historical_price`,
      );
      return {
        ...response.data,
        data: response.data.data.map((dat) => ({
          close: dat.close,
          high: dat.high,
          low: dat.low,
          open: dat.open,
          volumeTo: dat.volumeTo,
          volumeFrom: dat.volumeFrom,
          time: dat.time,
        })),
      };
    },
  });
}
