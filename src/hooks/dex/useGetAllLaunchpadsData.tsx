import { useQuery } from "@tanstack/react-query";
import { QueryKeys } from "@utils/queryKeys";
import axios from "axios";
import env from "@config/env";
import { ZERO_ADDRESS } from "@utils/constants";

type CommonItemProps = {
  /**
   * Item ID that will be also emitted in the events
   */
  id: `${number}`;
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
   * Launchpad ID, preferably its contract address
   */
  id: string;
  /**
   * Launchpad name to be displayed on the frontend
   */
  name: string;
  /**
   * URL-friendly slug of the name
   */
  slug: string;
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
      id: `${number}`;
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
                [ZERO_ADDRESS]: "10000000000000",
                [MOCK_USDC]: "34681800000000000",
              },
              referralDiscountBps: 500,
            },
            {
              id: "2",
              name: "Item B",
              description: "Description of Item B",
              prices: {
                [ZERO_ADDRESS]: "20000000000000",
                [MOCK_USDC]: "69363600000000000",
              },
            },
            {
              id: "100",
              name: "Free Item X",
              description: "Description of Free Item X",
              freeAt: {
                [ZERO_ADDRESS]: "100000000000000",
                [MOCK_USDC]: "346818000000000000",
              },
            },
          ],
          timestampStartWhitelistSale: 1724743540,
          timestampStartPublicSale: 1724829940,
          timestampEndSale: 1724916340,
          whitelistedAddresses: ["0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266"],
          curatedPackages: [
            {
              name: "Package 1",
              description: "Description of Package 1",
              items: [
                {
                  id: "1",
                  quantity: 1,
                },
                {
                  id: "2",
                  quantity: 1,
                },
              ],
            },
            {
              name: "VIP Package",
              items: [
                {
                  id: "1",
                  quantity: 10,
                },
                {
                  id: "100",
                  quantity: 1,
                },
              ],
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
                [ZERO_ADDRESS]: "10000000000000",
                [MOCK_USDC]: "34681800000000000",
              },
            },
            {
              id: "2",
              name: "Item B",
              description: "Description of Item B",
              prices: {
                [ZERO_ADDRESS]: "20000000000000",
                [MOCK_USDC]: "69363600000000000",
              },
            },
          ],
          timestampStartWhitelistSale: 1724743540,
          timestampStartPublicSale: 1724829940,
          timestampEndSale: 1724916340,
          whitelistedAddresses: ["0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266"],
        },
      ];

      // return response.data?.stats ?? null;
    },
  });
}
