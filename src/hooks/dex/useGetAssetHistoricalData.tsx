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

  return useQuery<AssetHistoricalData | undefined>({
    queryKey: [QueryKeys.AssetHistoricalData],
    refetchInterval: 10000,
    queryFn: async () => {
      if (!game || !asset) return undefined;
      const gameApi = gamesApi[game];
      if (!gameApi) return undefined;
      const response = await axios.get<AssetHistoricalData>(
        `${gameApi}/dex/${asset}/historical_price`,
      );
      return {
        ...response.data,
        data: response.data.data.map((dat) => ({
          close: Number(formatEther(BigInt(dat.close))),
          high: Number(formatEther(BigInt(dat.high))),
          low: Number(formatEther(BigInt(dat.low))),
          open: Number(formatEther(BigInt(dat.open))),
          volumeTo: Number(formatEther(BigInt(dat.volumeTo))),
          volumeFrom: Number(dat.volumeFrom),
          time: dat.time,
        })),
      };
    },
  });
}
