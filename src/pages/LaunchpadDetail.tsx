import { useEffect, useMemo, useState } from "react";
import clsx from "clsx";
import { Link, useParams } from "react-router-dom";

import useGetLaunchpadData from "@hooks/launchpad/useGetLaunchpadData";

import {
  PencilIcon,
  SingleArrowLeftIcon,
} from "@components/icons/GeneralIcons";
import LaunchpadItemCard from "@components/launchpad/LaunchpadItemCard";
import LaunchpadRewardsSection from "@components/launchpad/LaunchpadRewardsSection";
import LaunchpadOrderEmpty from "@components/launchpad/LaunchpadOrderEmpty";
import LaunchpadOrderItem from "@components/launchpad/LaunchpadOrderItem";
import Button from "@components/Button";
import { tokens } from "@config/tokens";
import type { StandardItem } from "@hooks/dex/useGetAllLaunchpadsData";
import { formatUnits } from "viem";
import { ZERO_ADDRESS } from "@utils/constants";
import useGetLaunchpadUserData from "@hooks/launchpad/useGetLaunchpadUserData";
import useConnectWallet from "@hooks/useConnectWallet";

export enum Currency {
  USDC = "USDC",
  ETH = "ETH",
}

const CurrencySelectorButton = ({
  text,
  isActive = false,
  onButtonClicked,
}: {
  text: string;
  isActive?: boolean;
  onButtonClicked?: () => void;
}) => {
  return (
    <button
      className={clsx(
        "min-w-[120px] flex items-center justify-center uppercase font-medium text-white text-heading5 px-6 py-3 border-2 rounded-xl w-full hover:cursor-pointer transition-colors duration-150 ease-in-out",
        isActive ? "border-brand" : "border-gray-800 hover:border-brand",
      )}
      onClick={onButtonClicked}
    >
      {text}
    </button>
  );
};

export default function LaunchpadDetail() {
  let urlParams = useParams();
  const launchpadSlug = urlParams.launchpad!;
  const { address: walletAddress } = useConnectWallet();
  const { data: launchpadData, isLoading: isLoadingLaunchpadData } =
    useGetLaunchpadData(launchpadSlug);
  const { data: userData } = useGetLaunchpadUserData(
    launchpadSlug,
    walletAddress,
  );
  console.log("userData", userData);

  const [activeCurrency, setActiveCurrency] = useState<string>(ZERO_ADDRESS);
  const [orderItems, setOrderItems] = useState<
    {
      itemID: number;
      quantity: number;
    }[]
  >([]);

  const handleIncreaseItemQuantityInOrder = (itemID: number) => {
    const existingItem = orderItems.find((item) => item.itemID === itemID);

    if (existingItem) {
      setOrderItems(
        orderItems.map((item) =>
          item.itemID === itemID
            ? { ...item, quantity: item.quantity + 1 }
            : item,
        ),
      );
    } else {
      setOrderItems([...orderItems, { itemID, quantity: 1 }]);
    }
  };

  const handleDecreaseItemQuantityInOrder = (itemID: number) => {
    const existingItem = orderItems.find((item) => item.itemID === itemID);

    if (existingItem) {
      if (existingItem.quantity > 1) {
        setOrderItems(
          orderItems.map((item) =>
            item.itemID === itemID
              ? { ...item, quantity: item.quantity - 1 }
              : item,
          ),
        );
      } else {
        setOrderItems(orderItems.filter((item) => item.itemID !== itemID));
      }
    }
  };

  const handleRemoveItemFromOrder = (itemID: number) => {
    setOrderItems(orderItems.filter((item) => item.itemID !== itemID));
  };

  const getItemCountFromOrder = (itemID: number) => {
    const existingItem = orderItems.find((item) => item.itemID === itemID);

    return existingItem ? existingItem.quantity : 0;
  };

  const standardItems = useMemo(() => {
    if (!launchpadData) return [];
    const standardItems = launchpadData.items.filter(
      (item): item is StandardItem => "prices" in item,
    );
    return standardItems;
  }, [launchpadData]);

  const currencies = useMemo(() => {
    if (!launchpadData) return [];
    const standardItem = standardItems[0];
    if (!standardItem) return [];
    return Object.keys(standardItem.prices);
  }, [launchpadData, standardItems]);

  useEffect(() => {
    setActiveCurrency(currencies[0]);
  }, [currencies]);

  useEffect(() => {
    if (!userData || !userData.user) return;
    const items = userData.items.map((item) => ({
      itemID: item.itemid,
      quantity: item.quantity,
    }));
    setOrderItems(items);
    setActiveCurrency(userData.user.paymenttoken);
  }, [userData]);

  return (
    <div className="w-full py-6 container">
      {isLoadingLaunchpadData ? (
        // TOOD: Handle loading state
        <div className="animate-pulse h-64 w-full bg-gray-900 rounded-xl" />
      ) : !launchpadData ? (
        // TOOD: Handle error state
        <>Data failed to load</>
      ) : (
        <div className="flex flex-col gap-20">
          <div className="flex flex-col gap-3">
            <div className="flex gap-1 pb-3">
              <div className="w-5 h-5 flex items-center justify-center text-brand">
                <SingleArrowLeftIcon />
              </div>
              <Link
                to={`/launchpad/${launchpadSlug}`}
                className="text-heading5 text-gray-200 hover:text-brand transition-colors duration-150 ease-in-out"
              >
                Back to game detail
              </Link>
            </div>
            <h2 className="text-heading3 tablet:text-displayXS font-formula font-bold">
              Launchpad
            </h2>
            <h1 className="text-heading2 tablet:text-displayS font-formula font-bold text-brand">
              {launchpadData.name}
            </h1>
          </div>
          <div className="flex flex-col gap-16">
            <h3 className="text-displayXS text-gray-50 font-formula font-bold">
              Buy game items
            </h3>
            <div className="flex flex-col-reverse laptop:flex-row gap-10 laptop:gap-20 laptop:items-start">
              <div className="flex flex-col gap-4">
                <h4 className="text-heading2 text-gray-50 font-bold">
                  Buy game items
                </h4>
                <p className="text-bodyL text-gray-100">
                  Dive into this revolutionary experience on the Xai network,
                  made seamless by Arbitrum Orbit and the powerful Paima Engine.
                  Best of all? Embark on this adventure without the hassle of
                  bridging, and kickstart your legend for free!
                </p>
              </div>
              <div className="flex gap-4">
                {currencies.map((currency) => (
                  <CurrencySelectorButton
                    key={currency}
                    text={tokens[currency]?.symbol}
                    isActive={activeCurrency === currency}
                    onButtonClicked={() => {
                      setActiveCurrency(currency);
                    }}
                  />
                ))}
              </div>
            </div>
            <div className="flex flex-col gap-6">
              <div className="flex flex-col gap-4">
                <h4 className="text-heading3 text-gray-50 font-bold">
                  Spend and get free rewards
                </h4>
                <p className="text-bodyL text-gray-100">
                  Dive into this revolutionary experience on the Xai network,
                  made seamless by Arbitrum Orbit and the powerful Paima Engine.
                  Best of all? Embark on this adventure without the hassle of
                  bridging, and kickstart your legend for free!
                </p>
              </div>
              <LaunchpadRewardsSection />
            </div>
            <div className="flex flex-col gap-6">
              <div className="flex flex-col gap-4">
                <h4 className="text-heading3 text-gray-50 font-bold">
                  Curated packages
                </h4>
                <p className="text-bodyL text-gray-100">
                  Dive into this revolutionary experience on the Xai network,
                  made seamless by Arbitrum Orbit and the powerful Paima Engine.
                  Best of all? Embark on this adventure without the hassle of
                  bridging, and kickstart your legend for free!
                </p>
              </div>
              <div className="grid grid-cols-2 laptop:grid-cols-4 gap-6">
                <LaunchpadItemCard
                  title="Package #1"
                  description="Combines Item #1, Item #2 and Item #3"
                  price={{
                    value: 0.0073233,
                    currency: Currency.ETH,
                  }}
                />
                <LaunchpadItemCard
                  title="Package #2"
                  description="Combines Item #1, Item #2 and Item #3"
                  price={{
                    value: 0.0073233,
                    currency: Currency.ETH,
                  }}
                />
                <LaunchpadItemCard
                  title="Package #3"
                  description="Combines Item #1, Item #2 and Item #3"
                  price={{
                    value: 0.0073233,
                    currency: Currency.ETH,
                  }}
                />
                <LaunchpadItemCard
                  title="Package #4"
                  description="Combines Item #1, Item #2 and Item #3"
                  price={{
                    value: 0.0073233,
                    currency: Currency.ETH,
                  }}
                />
              </div>
            </div>
            <div className="flex flex-col gap-6">
              <div className="flex flex-col gap-4">
                <h4 className="text-heading3 text-gray-50 font-bold">
                  Items for sale
                </h4>
                <p className="text-bodyL text-gray-100">
                  Dive into this revolutionary experience on the Xai network,
                  made seamless by Arbitrum Orbit and the powerful Paima Engine.
                  Best of all? Embark on this adventure without the hassle of
                  bridging, and kickstart your legend for free!
                </p>
              </div>
              <div className="grid grid-cols-2 tablet:grid-cols-3 laptop:grid-cols-4 gap-6">
                {standardItems.map((item) => {
                  const price = Number(
                    formatUnits(
                      BigInt(item.prices[activeCurrency]),
                      tokens[activeCurrency]?.decimals,
                    ),
                  );
                  return (
                    <LaunchpadItemCard
                      key={item.id}
                      imageURL={item.image}
                      title={item.name}
                      description={item.description}
                      price={
                        activeCurrency
                          ? {
                              value: price,
                              currency: tokens[activeCurrency]?.symbol,
                            }
                          : undefined
                      }
                      onItemCardClick={() => {
                        handleIncreaseItemQuantityInOrder(Number(item.id));
                      }}
                      isHighlighted={getItemCountFromOrder(Number(item.id)) > 0}
                      counter={getItemCountFromOrder(Number(item.id))}
                    />
                  );
                })}
              </div>
            </div>
            <div className="flex flex-col gap-10">
              <h3 className="text-heading2 text-brand font-bold">Your order</h3>
              <div className="flex gap-3">
                <div className="w-10 h-10 flex items-center justify-center border border-gray-400 rounded-lg p-2 text-brand shrink-0">
                  <PencilIcon />
                </div>
                <p className="text-bodyM text-gray-100">
                  Great news! Since you've placed an order (or multiple orders)
                  before, you can add even more items to your order. You can
                  also swap some things out, but remember the total amount needs
                  to be equal to or more than what you've already paid.
                </p>
              </div>
              <div className="flex flex-col laptop:flex-row gap-10 laptop:items-start">
                <>
                  {orderItems.length === 0 ? (
                    <LaunchpadOrderEmpty />
                  ) : (
                    <div className="flex-1 flex flex-col tablet:flex-row gap-10">
                      <div className="flex-1 flex flex-col gap-3">
                        <p className="text-heading6 font-bold text-gray-50 uppercase">
                          Items
                        </p>
                        {orderItems.map((item) => (
                          <LaunchpadOrderItem
                            key={item.itemID}
                            title={`Item #${item.itemID}`}
                            quantity={item.quantity}
                            price={
                              activeCurrency
                                ? {
                                    value: Number(
                                      formatUnits(
                                        BigInt(
                                          (
                                            launchpadData.items.find(
                                              (lpadItem) =>
                                                Number(lpadItem.id) ===
                                                item.itemID,
                                            ) as StandardItem
                                          ).prices[activeCurrency],
                                        ),
                                        tokens[activeCurrency]?.decimals,
                                      ),
                                    ),
                                    currency: tokens[activeCurrency]?.symbol,
                                  }
                                : undefined
                            }
                            onIncreaseQuantityClicked={() => {
                              handleIncreaseItemQuantityInOrder(item.itemID);
                            }}
                            onDecreaseQuantityClicked={() => {
                              handleDecreaseItemQuantityInOrder(item.itemID);
                            }}
                            onRemoveClicked={() => {
                              handleRemoveItemFromOrder(item.itemID);
                            }}
                          />
                        ))}
                      </div>
                      <div className="flex-1 flex flex-col gap-3">
                        <p className="text-heading6 font-bold text-gray-50 uppercase">
                          Rewards
                        </p>
                        <LaunchpadOrderItem
                          title="Reward #1"
                          quantity={1}
                          additionalText="Per 0.0001ETH"
                          onDecreaseQuantityClicked={() => {}}
                          onIncreaseQuantityClicked={() => {}}
                          onRemoveClicked={() => {}}
                        />
                        <LaunchpadOrderItem
                          title="Reward #2"
                          quantity={1}
                          additionalText="Per 0.001ETH"
                          onDecreaseQuantityClicked={() => {}}
                          onIncreaseQuantityClicked={() => {}}
                          onRemoveClicked={() => {}}
                        />
                      </div>
                    </div>
                  )}
                </>
                <div className="border border-brand rounded-2xl flex flex-col items-center justify-center laptop:w-1/3 divide-y divide-gray-600">
                  <div className="p-6 flex flex-col gap-4 flex-1 w-full">
                    <p className="text-heading6 font-bold text-gray-50 uppercase">
                      Summary
                    </p>
                    <p className="text-bodyM text-gray-100">
                      You can still claim rewards for 0.0000008 ETH.
                    </p>
                    <div className="flex flex-col gap-2">
                      <p className="text-bodyM text-gray-50">Items total</p>
                      <p className="text-heading5 font-bold text-brand uppercase">
                        0.000 ETH
                      </p>
                    </div>
                  </div>
                  <div className="p-6 flex flex-col gap-4 flex-1 w-full">
                    <div className="flex items-center justify-between">
                      <p className="text-heading5 font-bold text-gray-50">
                        Already paid
                      </p>
                      <p className="text-heading5 font-bold text-brand">
                        0.000 ETH
                      </p>
                    </div>
                    <div className="flex items-center justify-between">
                      <p className="text-heading5 font-bold text-gray-50">
                        Balance to pay
                      </p>
                      <p className="text-heading5 font-bold text-brand">
                        0.000 ETH
                      </p>
                    </div>
                    <Button text="Confirm and pay" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
