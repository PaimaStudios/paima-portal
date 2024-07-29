import { useQuery } from "@tanstack/react-query";
import { QueryKeys } from "@utils/queryKeys";
import axios from "axios";
import env from "@config/env";

type CommonItemProps = {
  id: string;
  name: string;
  description: string;
  image?: string;
};

type StandardItem = CommonItemProps & {
  // Map of token address to price of the item
  prices: Record<string, string>;
  // Referral discount override to the price of the item, expressed in basis points
  referralDiscountBps?: number;
};

type FreeRewardItem = CommonItemProps & {
  // Map of token address to amount per which the item is able to be claimed for free
  freeAt: Record<string, string>;
};

type ItemType = StandardItem | FreeRewardItem;

export type LaunchpadData = {
  id: string;
  name: string;
  // URL-friendly slug of the name
  slug: string;
  // Game description displayed in the launchpads list
  description: string;
  image?: string;
  items: ItemType[];
  // Default referral discount to the prices of items, expressed in basis points
  referralDiscountBps?: number;
};

type LaunchpadsResponse = {
  stats: LaunchpadData[];
};

export default function useGetAllLaunchpadsData() {
  return useQuery<LaunchpadData[] | null>({
    queryKey: [QueryKeys.LaunchpadData],
    queryFn: async () => {
      const response = await axios.get<LaunchpadsResponse>(
        `${env.REACT_APP_LAUNCHPAD_BACKEND_URL}/launchpads`,
      );
      return response.data?.stats ?? null;
    },
  });
}
