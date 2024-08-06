import { useQuery } from "@tanstack/react-query";
import { QueryKeys } from "@utils/queryKeys";
import axios from "axios";
import env from "@config/env";
import { ZERO_ADDRESS } from "@utils/constants";

type CommonItemProps = {
  /**
   * Item ID that will be also emitted in the events
   */
  id: number;
  /**
   * Item name to be displayed on the frontend
   */
  name: string;
  /**
   * Item description displayed in the frontend
   */
  description: string;
  /**
   * Optional URL to the image displayed in the frontend
   */
  image?: string;
};

export type StandardItem = CommonItemProps & {
  /**
   * Map of payment token identifier (address) to price of the item
   */
  prices: Record<string, string>;
  /**
   * Optional override of the referral discount to the price of the item, expressed in basis points
   */
  referralDiscountBps?: number;
};

export type FreeRewardItem = CommonItemProps & {
  /**
   * Map of payment token identifier (address) to amount per which the item is able to be claimed for free
   */
  freeAt: Record<string, string>;
};

type ItemType = StandardItem | FreeRewardItem;

export type LaunchpadData = {
  /**
   * URL-friendly slug of the name
   */
  slug: string;
  /**
   * Launchpad contract address
   */
  address: string;
  /**
   * Launchpad name to be displayed on the frontend
   */
  name: string;
  /**
   * Game description displayed in the launchpads list
   */
  description: string;
  /**
   * URL to the image displayed in the launchpads list
   */
  image?: string;
  /**
   * List of items available for purchase in the launchpad
   */
  items: ItemType[];
  /**
   * Optional UNIX timestamp of the start of the whitelist sale, in seconds. Omit if there is no whitelist sale
   */
  timestampStartWhitelistSale?: number;
  /**
   * UNIX timestamp of the start of the public sale, in seconds
   */
  timestampStartPublicSale: number;
  /**
   * UNIX timestamp of the end of the sale, in seconds
   */
  timestampEndSale: number;
  /**
   * List of addresses that are whitelisted for the whitelist sale. Omit if there is no whitelist sale
   */
  whitelistedAddresses?: string[];
  /**
   * Default referral discount to the prices of items, expressed in basis points
   */
  referralDiscountBps?: number;
  /**
   * List of curated packages of items (basically just a shortcut to add multiple items to the cart)
   */
  curatedPackages?: {
    /**
     * Package name to be displayed on the frontend
     */
    name: string;
    /**
     * Optional package description displayed in the frontend, if omitted the enumeration of package items will be displayed
     */
    description?: string;
    /**
     * List of items that are part of the package
     */
    items: {
      /**
       * Item ID corresponding to the `items` array
       */
      id: number;
      /**
       * Quantity of the item in the package
       */
      quantity: number;
    }[];
  }[];
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

      const MOCK_USDC = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
      return [
        {
          slug: "test-launchpad-1",
          address: "0xd8058efe0198ae9dD7D563e1b4938Dcbc86A1F81",
          name: "Test Launchpad 1",
          description: "Description of Test Launchpad 1",
          image: "/images/game-icon-towerdefense.webp",
          referralDiscountBps: 100,
          items: [
            {
              id: 1,
              name: "Rare armor",
              description:
                "Set of rare helmet, shoulderpads, chestplate, leggings, and boots",
              prices: {
                [ZERO_ADDRESS]: "1000000000000000",
                [MOCK_USDC]: "3400000000000000000",
              },
            },
            {
              id: 2,
              name: "Rare weaponry",
              description: "Set of rare sword and shield",
              prices: {
                [ZERO_ADDRESS]: "1000000000000000",
                [MOCK_USDC]: "3400000000000000000",
              },
            },
            {
              id: 3,
              name: "Mythical armor",
              description:
                "Set of mythical helmet, shoulderpads, chestplate, leggings, and boots",
              prices: {
                [ZERO_ADDRESS]: "2000000000000000",
                [MOCK_USDC]: "6800000000000000000",
              },
            },
            {
              id: 4,
              name: "Mythical weaponry",
              description: "Set of mythical sword and shield",
              prices: {
                [ZERO_ADDRESS]: "2000000000000000",
                [MOCK_USDC]: "6800000000000000000",
              },
            },
            {
              id: 5,
              name: "Legendary armor",
              description:
                "Set of legendary helmet, shoulderpads, chestplate, leggings, and boots",
              prices: {
                [ZERO_ADDRESS]: "3000000000000000",
                [MOCK_USDC]: "10200000000000000000",
              },
            },
            {
              id: 6,
              name: "Legendary weaponry",
              description: "Set of legendary sword and shield",
              prices: {
                [ZERO_ADDRESS]: "3000000000000000",
                [MOCK_USDC]: "10200000000000000000",
              },
            },
            {
              id: 7,
              name: "Immortal armor",
              description:
                "Set of immortal helmet, shoulderpads, chestplate, leggings, and boots",
              prices: {
                [ZERO_ADDRESS]: "4000000000000000",
                [MOCK_USDC]: "13600000000000000000",
              },
            },
            {
              id: 8,
              name: "Immortal weaponry",
              description: "Set of immortal sword and shield",
              prices: {
                [ZERO_ADDRESS]: "4000000000000000",
                [MOCK_USDC]: "13600000000000000000",
              },
            },
            {
              id: 9,
              name: "Resurrection potion",
              description: "A rare potion that can bring you back to life",
              prices: {
                [ZERO_ADDRESS]: "1000000000000000",
                [MOCK_USDC]: "3400000000000000000",
              },
              referralDiscountBps: 500,
            },
            {
              id: 100,
              name: "1000 Gold",
              description: "A thousand shiny gold coins",
              freeAt: {
                [ZERO_ADDRESS]: "2000000000000000",
                [MOCK_USDC]: "6800000000000000000",
              },
            },
            {
              id: 101,
              name: "Commemorative hat",
              description: "A special hat cosmetic item",
              freeAt: {
                [ZERO_ADDRESS]: "5000000000000000",
                [MOCK_USDC]: "17000000000000000000",
              },
            },
            {
              id: 102,
              name: "Credits shoutout",
              description:
                "Your name will be immortalized in the game's credits",
              freeAt: {
                [ZERO_ADDRESS]: "20000000000000000",
                [MOCK_USDC]: "68000000000000000000",
              },
            },
          ],
          timestampStartWhitelistSale: 10,
          timestampStartPublicSale: 1724829940,
          timestampEndSale: 1724916340,
          whitelistedAddresses: ["0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266"],
          curatedPackages: [
            {
              name: "Rare set",
              description: "Rare armor and weaponry with free 1000 Gold",
              items: [
                {
                  id: 1,
                  quantity: 1,
                },
                {
                  id: 2,
                  quantity: 1,
                },
                {
                  id: 100,
                  quantity: 1,
                },
              ],
            },
            {
              name: "Mythical set",
              description: "Mythical armor and weaponry with free 2000 Gold",
              items: [
                {
                  id: 3,
                  quantity: 1,
                },
                {
                  id: 4,
                  quantity: 1,
                },
                {
                  id: 100,
                  quantity: 2,
                },
              ],
            },
            {
              name: "Legendary set",
              description: "Legendary armor and weaponry with free 3000 Gold",
              items: [
                {
                  id: 5,
                  quantity: 1,
                },
                {
                  id: 6,
                  quantity: 1,
                },
                {
                  id: 100,
                  quantity: 3,
                },
              ],
            },
            {
              name: "Immortal set",
              description: "Immortal armor and weaponry with free 4000 Gold",
              items: [
                {
                  id: 7,
                  quantity: 1,
                },
                {
                  id: 8,
                  quantity: 1,
                },
                {
                  id: 100,
                  quantity: 4,
                },
              ],
            },
            {
              name: "GOD Package",
              items: [
                {
                  id: 7,
                  quantity: 1,
                },
                {
                  id: 8,
                  quantity: 1,
                },
                {
                  id: 9,
                  quantity: 5,
                },
                {
                  id: 100,
                  quantity: 4,
                },
                {
                  id: 101,
                  quantity: 1,
                },
              ],
            },
          ],
        },
        {
          slug: "test-launchpad-2",
          address: "0x6D544390Eb535d61e196c87d6B9c80dCD8628Acd",
          name: "Test Launchpad 2",
          description: "Description of Test Launchpad 2",
          image: "/images/game-icon-junglewars.webp",
          items: [
            {
              id: 1,
              name: "Item A",
              description: "Description of Item A",
              prices: {
                [ZERO_ADDRESS]: "10000000000000",
                [MOCK_USDC]: "34681800000000000",
              },
            },
            {
              id: 2,
              name: "Item B",
              description: "Description of Item B",
              prices: {
                [ZERO_ADDRESS]: "20000000000000",
                [MOCK_USDC]: "69363600000000000",
              },
            },
          ],
          timestampStartWhitelistSale: 10,
          timestampStartPublicSale: 1724829940,
          timestampEndSale: 1724916340,
          whitelistedAddresses: ["0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266"],
        },
      ];

      // return response.data?.stats ?? null;
    },
  });
}
