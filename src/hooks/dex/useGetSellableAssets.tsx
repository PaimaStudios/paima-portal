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

  return useQuery<DexValidMintedAssetsResponse | null>({
    queryKey: [QueryKeys.SellableAssets, game, asset, address],
    queryFn: async () => {
      if (!game || !asset || !address) return null;
      const gameApi = gamesApi[game];
      if (!gameApi) return null;
      // const response = await axios.get<DexValidMintedAssetsResponse>(
      //   `${gameApi}/dex/${asset}/wallet/${address?.toLowerCase()}`,
      // );
      const data: DexValidMintedAssetsResponse = {
        total: 0,
        stats: [
          {
            tokenId: 1,
            amount: 1454,
          },
        ],
      };
      const response = {
        data,
      };
      return response.data;
    },
  });
}
