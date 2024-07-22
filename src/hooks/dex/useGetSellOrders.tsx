import { useQuery } from "@tanstack/react-query";
import { DexOrdersResponse, SellOrder } from "@utils/dex/types";
import { QueryKeys } from "@utils/queryKeys";
import useGetGameAndAssetFromUrl from "./useGetGameAndAssetFromUrl";
import { gamesApi } from "@config/api";
import axios from "axios";

export default function useGetSellOrders(params?: { user?: `0x${string}` }) {
  const { game, asset } = useGetGameAndAssetFromUrl();
  return useQuery<SellOrder[] | null>({
    queryKey: [QueryKeys.SellOrders, params?.user],
    refetchInterval: 5000,
    queryFn: async () => {
      if (!game || !asset) return null;
      const gameApi = gamesApi[game];
      if (!gameApi) return null;
      let url = new URL(`${gameApi}/dex/${asset}/orders?limit=100`);
      if (params?.user) {
        url.searchParams.append("seller", params.user.toLowerCase());
      }
      // const response = await axios.get<DexOrdersResponse>(url.toString());
      const stats: SellOrder[] = [
        {
          orderId: 27,
          seller: "0x1946a1DD383FE3c3cd9ae3066C638EF6ed7E35e5",
          tokenId: 1,
          amount: 10,
          price: "100000000000000",
          makerFee: 30,
          takerFee: 70,
        },
      ];
      const response = {
        data: {
          stats,
        },
      };
      return response.data.stats;
    },
  });
}
