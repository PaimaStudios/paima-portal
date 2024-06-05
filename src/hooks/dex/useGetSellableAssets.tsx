import { useQuery } from "@tanstack/react-query";
import { DexValidMintedAssetsResponse } from "@utils/dex/types";
import { QueryKeys } from "@utils/queryKeys";
import { useAccount } from "wagmi";
import useGetGameAndAssetFromUrl from "./useGetGameAndAssetFromUrl";
import { gamesApi } from "@config/api";
import axios from "axios";

export default function useGetSellableAssets() {
  const { game, asset } = useGetGameAndAssetFromUrl();
  const { address } = useAccount();

  return useQuery<DexValidMintedAssetsResponse | undefined>({
    queryKey: [QueryKeys.SellableAssets, game, asset, address],
    queryFn: async () => {
      if (!game || !asset || !address) return undefined;
      const gameApi = gamesApi[game];
      if (!gameApi) return undefined;
      const response = await axios.get<DexValidMintedAssetsResponse>(
        `${gameApi}/dex/${asset}/wallet/${address?.toLowerCase()}`,
      );
      return response.data;
    },
  });
}
