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
      // const response = await axios.get<AssetMetadata>(
      //   `${gameApi}/dex/${asset}`,
      // );
      const data: AssetMetadata = {
        asset: "tgold",
        contractAsset: "0xA6fed8FB857e7c98afdd91f464298A3018e0c6c6",
        contractChain: "0x", //useless
        contractDex: "0xb6532bfc5ae1962d43207e7f409eec606fa5d71e",
        fromSym: "TGOLD",
        toSym: "ETH",
        totalSupply: 100000,
      };
      const response = {
        data,
      };
      return response.data;
    },
  });
}
