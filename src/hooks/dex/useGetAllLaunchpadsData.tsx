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
      // const response = await axios.get<LaunchpadsResponse>(
      //   `${env.REACT_APP_LAUNCHPAD_BACKEND_URL}/launchpads`,
      // );

      return [
        {
          id: "0xd8058efe0198ae9dD7D563e1b4938Dcbc86A1F81",
          name: "Test Launchpad 1",
          slug: "test-launchpad-1",
          description: "Description of Test Launchpad 1",
          image: "/images/game-icon-towerdefense.webp",
          referralDiscountBps: 100,
          items: [
            {
              id: "1",
              name: "Item A",
              description: "Description of Item A",
              prices: {
                "0x0000000000000000000000000000000000000000": "10000000000000",
                "0xusdc": "34681800000000000",
              },
              referralDiscountBps: 500,
            },
            {
              id: "2",
              name: "Item B",
              description: "Description of Item B",
              prices: {
                "0x0000000000000000000000000000000000000000": "20000000000000",
                "0xusdc": "69363600000000000",
              },
            },
            {
              id: "100",
              name: "Free Item X",
              description: "Description of Free Item X",
              freeAt: {
                "0x0000000000000000000000000000000000000000": "100000000000000",
                "0xusdc": "346818000000000000",
              },
            },
          ],
        },
        {
          id: "0x6D544390Eb535d61e196c87d6B9c80dCD8628Acd",
          name: "Test Launchpad 2",
          slug: "test-launchpad-2",
          description: "Description of Test Launchpad 2",
          image: "/images/game-icon-junglewars.webp",
          items: [
            {
              id: "1",
              name: "Item A",
              description: "Description of Item A",
              prices: {
                "0x0000000000000000000000000000000000000000": "10000000000000",
                "0xusdc": "34681800000000000",
              },
            },
            {
              id: "2",
              name: "Item B",
              description: "Description of Item B",
              prices: {
                "0x0000000000000000000000000000000000000000": "20000000000000",
                "0xusdc": "69363600000000000",
              },
            },
          ],
        },
      ];

      // return response.data?.stats ?? null;
    },
  });
}
