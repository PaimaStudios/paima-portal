import { useQuery } from "@tanstack/react-query";
import { DexOrdersResponse, SellOrder } from "@utils/dex/types";
import { QueryKeys } from "@utils/queryKeys";
import useGetGameAndAssetFromUrl from "./useGetGameAndAssetFromUrl";
import { gamesApi } from "@config/api";
import axios from "axios";

export default function useGetSellOrders(params?: { user?: `0x${string}` }) {
  const { game, asset } = useGetGameAndAssetFromUrl();
  return useQuery<SellOrder[] | undefined>({
    queryKey: [QueryKeys.SellOrders, params?.user],
    queryFn: async () => {
      if (!game || !asset) return undefined;
      const gameApi = gamesApi[game];
      if (!gameApi) return undefined;
      let url = new URL(`${gameApi}/dex/${asset}/orders`);
      if (params?.user) {
        url.searchParams.append("seller", params.user.toLowerCase());
      }
      const response = await axios.get<DexOrdersResponse>(url.toString());
      return response.data.stats;
    },
  });
}
