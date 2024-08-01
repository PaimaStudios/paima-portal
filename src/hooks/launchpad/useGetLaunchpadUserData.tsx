import env from "@config/env";
import { useQuery } from "@tanstack/react-query";
import { QueryKeys } from "@utils/queryKeys";
import axios from "axios";

export type LaunchpadUserData = {
  user?: {
    launchpad: string;
    participationvalid: boolean;
    paymenttoken: string;
    totalamount: string;
    wallet: string;
  };
  items: {
    itemid: number;
    launchpad: string;
    quantity: number;
    wallet: string;
  }[];
};

type LaunchpadUserItemsResponse = {
  stats: LaunchpadUserData | null;
};

export default function useGetLaunchpadUserData(
  launchpadSlug: string,
  wallet?: string,
) {
  return useQuery<LaunchpadUserData | null>({
    queryKey: [QueryKeys.LaunchpadData, launchpadSlug, wallet],
    queryFn: async () => {
      if (!wallet) return null;
      const response = await axios.get<LaunchpadUserItemsResponse>(
        `${
          env.REACT_APP_LAUNCHPAD_BACKEND_URL
        }/userData?wallet=${wallet.toLowerCase()}&launchpad=${launchpadSlug}`,
      );
      return response.data?.stats ?? null;
    },
  });
}
