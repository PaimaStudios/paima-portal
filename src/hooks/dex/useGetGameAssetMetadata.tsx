import { gamesApi } from "@config/api";
import { useQuery } from "@tanstack/react-query";
import { QueryKeys } from "@utils/queryKeys";
import useGetGameAndAssetFromUrl from "./useGetGameAndAssetFromUrl";
import { AssetMetadata } from "@utils/dex/types";
import axios from "axios";

export default function useGetGameAssetMetadata(params?: {
  game: string;
  asset: string;
}) {
  const { game: gameFromUrl, asset: assetFromUrl } =
    useGetGameAndAssetFromUrl();

  const game = params?.game || gameFromUrl;
  const asset = params?.asset || assetFromUrl;

  return useQuery<AssetMetadata | null>({
    queryKey: [QueryKeys.GameMetadata, game, asset],
    queryFn: async () => {
      if (!game || !asset) return null;
      const gameApi = gamesApi[game];
      if (!gameApi) return null;
      const response = await axios.get<AssetMetadata>(
        `${gameApi}/dex/${asset}`,
      );
      return response.data;
    },
  });
}
