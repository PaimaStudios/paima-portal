import { useQuery } from "@tanstack/react-query";
import axios from "axios";

import { QueryKeys } from "@utils/queryKeys";

export type Achievement = {
  id: number;
  order_: number;
  x: number;
  y: number;
  objective_type: string;
  objective: string;
  count: number;
  is_active: boolean;
  visible: boolean;
};

export type MyAchievement = {
  achievement_id: number;
  wallet: string;
  completed: boolean;
  count: number;
};

type AchievementsResponse = {
  achievements: Achievement[];
  myAchievements: MyAchievement[];
};

export default function useGetAchievements(params?: {
  address?: `0x${string}`;
}) {
  return useQuery<AchievementsResponse | null>({
    queryKey: [QueryKeys.Achievements, params?.address],
    refetchInterval: 5000,
    queryFn: async () => {
      if (!params?.address) return null;

      let url = new URL(
        `https://tarochi-backend-xai-mainnet.paimastudios.com/achievements?wallet=${params.address}`,
      );

      const response = await axios.get<AchievementsResponse>(url.toString());
      return response.data;
    },
  });
}
