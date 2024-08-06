import type { LaunchpadData } from "./useGetAllLaunchpadsData";
import { QueryKeys } from "@utils/queryKeys";
import { useQuery } from "@tanstack/react-query";
import { ZERO_ADDRESS } from "@utils/constants";
import axios from "axios";
import env from "@config/env";

type LaunchpadResponse = {
  stats: LaunchpadData | null;
};

export default function useGetLaunchpadData(launchpadSlug: string | undefined) {
  return useQuery<LaunchpadData | null>({
    queryKey: [QueryKeys.LaunchpadData, launchpadSlug],
    queryFn: async () => {
      const response = await axios.get<LaunchpadResponse>(
        `${env.REACT_APP_LAUNCHPAD_BACKEND_URL}/launchpad?launchpad=${launchpadSlug}`,
      );

      // const MOCK_USDC = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
      // return {
      //   slug: "test-launchpad-1",
      //   address: "0xd8058efe0198ae9dD7D563e1b4938Dcbc86A1F81",
      //   name: "Test Launchpad 1",
      //   description: "Description of Test Launchpad 1",
      //   image: "/images/game-icon-towerdefense.webp",
      //   referralDiscountBps: 100,
      //   items: [
      //     {
      //       id: 1,
      //       name: "Rare armor",
      //       description:
      //         "Set of rare helmet, shoulderpads, chestplate, leggings, and boots",
      //       prices: {
      //         [ZERO_ADDRESS]: "1000000000000000",
      //         [MOCK_USDC]: "3400000000000000000",
      //       },
      //       purchased: 17,
      //     },
      //     {
      //       id: 2,
      //       name: "Rare weaponry",
      //       description: "Set of rare sword and shield",
      //       prices: {
      //         [ZERO_ADDRESS]: "1000000000000000",
      //         [MOCK_USDC]: "3400000000000000000",
      //       },
      //       purchased: 22,
      //     },
      //     {
      //       id: 3,
      //       name: "Mythical armor",
      //       description:
      //         "Set of mythical helmet, shoulderpads, chestplate, leggings, and boots",
      //       prices: {
      //         [ZERO_ADDRESS]: "2000000000000000",
      //         [MOCK_USDC]: "6800000000000000000",
      //       },
      //     },
      //     {
      //       id: 4,
      //       name: "Mythical weaponry",
      //       description: "Set of mythical sword and shield",
      //       prices: {
      //         [ZERO_ADDRESS]: "2000000000000000",
      //         [MOCK_USDC]: "6800000000000000000",
      //       },
      //     },
      //     {
      //       id: 5,
      //       name: "Legendary armor",
      //       description:
      //         "Set of legendary helmet, shoulderpads, chestplate, leggings, and boots",
      //       prices: {
      //         [ZERO_ADDRESS]: "3000000000000000",
      //         [MOCK_USDC]: "10200000000000000000",
      //       },
      //     },
      //     {
      //       id: 6,
      //       name: "Legendary weaponry",
      //       description: "Set of legendary sword and shield",
      //       prices: {
      //         [ZERO_ADDRESS]: "3000000000000000",
      //         [MOCK_USDC]: "10200000000000000000",
      //       },
      //     },
      //     {
      //       id: 7,
      //       name: "Immortal armor",
      //       description:
      //         "Set of immortal helmet, shoulderpads, chestplate, leggings, and boots",
      //       prices: {
      //         [ZERO_ADDRESS]: "4000000000000000",
      //         [MOCK_USDC]: "13600000000000000000",
      //       },
      //       supply: 5,
      //       purchased: 2,
      //     },
      //     {
      //       id: 8,
      //       name: "Immortal weaponry",
      //       description: "Set of immortal sword and shield",
      //       prices: {
      //         [ZERO_ADDRESS]: "4000000000000000",
      //         [MOCK_USDC]: "13600000000000000000",
      //       },
      //       supply: 5,
      //       purchased: 5,
      //     },
      //     {
      //       id: 9,
      //       name: "Resurrection potion",
      //       description: "A rare potion that can bring you back to life",
      //       prices: {
      //         [ZERO_ADDRESS]: "1000000000000000",
      //         [MOCK_USDC]: "3400000000000000000",
      //       },
      //       referralDiscountBps: 500,
      //     },
      //     {
      //       id: 100,
      //       name: "1000 Gold",
      //       description: "A thousand shiny gold coins",
      //       freeAt: {
      //         [ZERO_ADDRESS]: "2000000000000000",
      //         [MOCK_USDC]: "6800000000000000000",
      //       },
      //     },
      //     {
      //       id: 101,
      //       name: "Commemorative hat",
      //       description: "A special hat cosmetic item",
      //       freeAt: {
      //         [ZERO_ADDRESS]: "5000000000000000",
      //         [MOCK_USDC]: "17000000000000000000",
      //       },
      //     },
      //     {
      //       id: 102,
      //       name: "Credits shoutout",
      //       description: "Your name will be immortalized in the game's credits",
      //       freeAt: {
      //         [ZERO_ADDRESS]: "20000000000000000",
      //         [MOCK_USDC]: "68000000000000000000",
      //       },
      //     },
      //   ],
      //   timestampStartWhitelistSale: 10,
      //   timestampStartPublicSale: 1724829940,
      //   timestampEndSale: 1724916340,
      //   whitelistedAddresses: [
      //     "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266",
      //     "0x70997970C51812dc3A010C7d01b50e0d17dc79C8",
      //   ],
      //   curatedPackages: [
      //     {
      //       name: "Rare set",
      //       description: "Rare armor and weaponry with free 1000 Gold",
      //       items: [
      //         {
      //           id: 1,
      //           quantity: 1,
      //         },
      //         {
      //           id: 2,
      //           quantity: 1,
      //         },
      //         {
      //           id: 100,
      //           quantity: 1,
      //         },
      //       ],
      //     },
      //     {
      //       name: "Mythical set",
      //       description: "Mythical armor and weaponry with free 2000 Gold",
      //       items: [
      //         {
      //           id: 3,
      //           quantity: 1,
      //         },
      //         {
      //           id: 4,
      //           quantity: 1,
      //         },
      //         {
      //           id: 100,
      //           quantity: 2,
      //         },
      //       ],
      //     },
      //     {
      //       name: "Legendary set",
      //       description: "Legendary armor and weaponry with free 3000 Gold",
      //       items: [
      //         {
      //           id: 5,
      //           quantity: 1,
      //         },
      //         {
      //           id: 6,
      //           quantity: 1,
      //         },
      //         {
      //           id: 100,
      //           quantity: 3,
      //         },
      //       ],
      //     },
      //     {
      //       name: "Immortal set",
      //       description: "Immortal armor and weaponry with free 4000 Gold",
      //       items: [
      //         {
      //           id: 7,
      //           quantity: 1,
      //         },
      //         {
      //           id: 8,
      //           quantity: 1,
      //         },
      //         {
      //           id: 100,
      //           quantity: 4,
      //         },
      //       ],
      //     },
      //     {
      //       name: "GOD Package",
      //       items: [
      //         {
      //           id: 7,
      //           quantity: 1,
      //         },
      //         {
      //           id: 8,
      //           quantity: 1,
      //         },
      //         {
      //           id: 9,
      //           quantity: 5,
      //         },
      //         {
      //           id: 100,
      //           quantity: 4,
      //         },
      //         {
      //           id: 101,
      //           quantity: 1,
      //         },
      //       ],
      //     },
      //   ],
      // };

      return response.data?.stats ?? null;
    },
  });
}
