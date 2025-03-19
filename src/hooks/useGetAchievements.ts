import { useQuery } from "@tanstack/react-query";
import axios from "axios";

import { QueryKeys } from "@utils/queryKeys";
import type { AchievementPublicList, PlayerAchievements } from "src/data/achievement-types";
import tarochiAchievements from "src/data/tarochi-achievements.json";

// note: Tarochi predates the achievement standard, so it works a bit differently
export type TarochiAchievement = {
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
export type TarochiMyAchievement = {
  achievement_id: number;
  wallet: string;
  completed: boolean;
  count: number;
};

type TarochiAchievementsResponse = {
  achievements: TarochiAchievement[];
  myAchievements: TarochiMyAchievement[];
};

type UserAndGame = {
  user: PlayerAchievements,
  game: Omit<AchievementPublicList, 'achievements'>,
  metadata: Record<string, AchievementPublicList['achievements'][number]>
}
type AllGamesAchievements = Record<string, UserAndGame>;

export default function useGetAchievements(params?: {
  address?: string;
}) {
  return useQuery<AllGamesAchievements | null>({
    queryKey: [QueryKeys.Achievements, params?.address],
    refetchInterval: 5000,
    queryFn: async () => {
      if (!params?.address) return null;

      const response: AllGamesAchievements = {
        'tarochi': await getTarochiAchievements(params.address),
        'paima-wrath-of-the-jungle-tower-defense': await getPrcAchievements('https://tower-defense-backend.paimastudios.com', params.address)
      };


      return response;
    },
  });
}

async function getTarochiAchievements(address: string): Promise<UserAndGame> {
  let tarochiUrl = new URL(
    `https://tarochi-backend-xai-mainnet.paimastudios.com/achievements?wallet=${address}`,
  );

  let tarochiResponse: TarochiAchievementsResponse;
  try {
    tarochiResponse = (await axios.get<TarochiAchievementsResponse>(tarochiUrl.toString())).data;
  } catch (error) {
    // tarochi throws a 500 error for wallets that don't exist
    tarochiResponse = {
      achievements: [],
      myAchievements: [],
    } satisfies TarochiAchievementsResponse;
  }

  const tarochiMetadata = tarochiResponse.achievements.reduce((acc, curr) => {
    acc[curr.id.toString()] = curr;
    return acc;
  }, {} as Record<string, TarochiAchievement>);
  const user: PlayerAchievements = {
    completed: tarochiResponse.myAchievements.filter(a => a.completed).length,
    achievements: tarochiResponse.myAchievements.map(a => {
      const achievementMetadata = tarochiMetadata[a.achievement_id.toString()];
      return {
        name: String(a.achievement_id),
        completed: a.completed,
        completedRate: achievementMetadata?.count != null ? {
          progress: a.count,
          total: achievementMetadata?.count ?? 0,
        } : undefined,
        
      };
    }),
    block: 0,
    caip2: 'eip155:42161',
    wallet: address,
  }

  const metadata =  tarochiAchievements.achievements.map(a => ({
    name: a.name,
    score: a.score,
    category: tarochiMetadata[a.name]?.objective_type,
    isActive: a.isActive,
    displayName: a.displayName,
    description: '',
    iconURI: '/images/game-icon-tarochi.webp',
  } satisfies AchievementPublicList['achievements'][number])).reduce((acc, curr) => {
    acc[curr.name] = curr;
    return acc;
  }, {} as Record<string, AchievementPublicList['achievements'][number]>);
  return {
    user,
    game: {
      id: tarochiAchievements.id,
      name: tarochiAchievements.name,
      block: tarochiAchievements.block,
      caip2: tarochiAchievements.caip2,
    },
    metadata,
  };
}
async function getPrcAchievements(
  baseUrl: string,
  address: string
): Promise<UserAndGame> {
  let gameUrl = new URL(
    `${baseUrl}/achievements/wallet/${address}`,
  );
  let publicMetadataUrl = new URL(
    `${baseUrl}/achievements/public/list`,
  );

  const metadata = (await axios.get<AchievementPublicList>(publicMetadataUrl.toString())).data;

  return {
    user: (await axios.get<PlayerAchievements>(gameUrl.toString())).data,
    game: {
      id: metadata.id,
      name: metadata.name,
      block: metadata.block,
      caip2: metadata.caip2,
    },
    metadata: metadata.achievements.reduce((acc, curr) => {
      if (curr.iconURI == null) {
        if (metadata.id === 'paima-wrath-of-the-jungle-tower-defense') {
          curr.iconURI = `/images/game-icon-towerdefense.webp`;
        }
      }
      acc[curr.name] = curr;
      return acc;
    }, {} as Record<string, AchievementPublicList['achievements'][number]>),
  }
}