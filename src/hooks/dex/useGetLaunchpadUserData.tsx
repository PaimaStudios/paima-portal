import env from "@config/env";
import { useQuery } from "@tanstack/react-query";
import { QueryKeys } from "@utils/queryKeys";
import axios from "axios";

export type LaunchpadUserData = {
  user: {
    launchpad: string;
    participationvalid: boolean;
    paymenttoken: string;
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
  stats: LaunchpadUserData;
};

export default function useGetLaunchpadUserData(
  launchpad: string,
  wallet: string,
) {
  return useQuery<LaunchpadUserData | null>({
    queryKey: [QueryKeys.LaunchpadData, launchpad, wallet],
    queryFn: async () => {
      const response = await axios.get<LaunchpadUserItemsResponse>(
        `${env.REACT_APP_LAUNCHPAD_BACKEND_URL}/userItems?wallet=${wallet}&launchpad=${launchpad}`,
      );
      return response.data?.stats ?? null;
    },
  });
}
