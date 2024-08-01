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
import type {
  FreeRewardItem,
  LaunchpadData,
  StandardItem,
} from "@hooks/dex/useGetAllLaunchpadsData";
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
      id: number;
      quantity: number;
    }[]
  >([]);

  const handleIncreaseItemQuantityInOrder = (
    itemID: number,
    increaseBy = 1,
  ) => {
    const existingItem = orderItems.find((item) => item.id === itemID);

    if (existingItem) {
      setOrderItems((orderItems) =>
        orderItems.map((item) =>
          item.id === itemID
            ? { ...item, quantity: item.quantity + increaseBy }
            : item,
        ),
      );
    } else {
      setOrderItems((orderItems) => [
        ...orderItems,
        { id: itemID, quantity: increaseBy },
      ]);
    }
  };

  const handleDecreaseItemQuantityInOrder = (itemID: number) => {
    const existingItem = orderItems.find((item) => item.id === itemID);

    if (existingItem) {
      if (existingItem.quantity > 1) {
        setOrderItems(
          orderItems.map((item) =>
            item.id === itemID
              ? { ...item, quantity: item.quantity - 1 }
              : item,
          ),
        );
      } else {
        setOrderItems(orderItems.filter((item) => item.id !== itemID));
      }
    }
  };

  const handleRemoveItemFromOrder = (itemID: number) => {
    setOrderItems(orderItems.filter((item) => item.id !== itemID));
  };

  const handleAddCuratedPackageToOrder = (
    curatedPackage: NonNullable<LaunchpadData["curatedPackages"]>[number],
  ) => {
    curatedPackage.items.forEach((item) => {
      handleIncreaseItemQuantityInOrder(item.id, item.quantity);
    });
  };

  const getItemCountFromOrder = (itemID: number) => {
    const existingItem = orderItems.find((item) => item.id === itemID);

    return existingItem ? existingItem.quantity : 0;
  };

  const getTotalPriceOfItems = (items: typeof orderItems) => {
    if (!launchpadData) return 0n;
    return items.reduce(
      (acc, item) =>
        acc +
        BigInt(
          launchpadData.items.find(
            (lpadItem): lpadItem is StandardItem => lpadItem.id === item.id,
          )?.prices?.[activeCurrency] ?? 0,
        ) *
          BigInt(item.quantity),
      0n,
    );
  };

  const standardItems = useMemo(() => {
    if (!launchpadData) return [];
    const standardItems = launchpadData.items.filter(
      (item): item is StandardItem => "prices" in item,
    );
    return standardItems;
  }, [launchpadData]);

  const freeRewards = useMemo(() => {
    if (!launchpadData) return [];
    const standardItems = launchpadData.items.filter(
      (item): item is FreeRewardItem => "freeAt" in item,
    );
    return standardItems;
  }, [launchpadData]);

  const orderStandardItems = useMemo(() => {
    if (!launchpadData) return [];
    return orderItems.filter((orderItem) =>
      standardItems.find((standardItem) => standardItem.id === orderItem.id),
    );
  }, [orderItems, launchpadData, standardItems]);

  const orderFreeRewards = useMemo(() => {
    if (!launchpadData) return [];
    return orderItems.filter((orderItem) =>
      freeRewards.find((freeReward) => freeReward.id === orderItem.id),
    );
  }, [orderItems, launchpadData, freeRewards]);

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
    const items: typeof orderItems = userData.items.map((item) => ({
      id: item.itemid,
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
              <LaunchpadRewardsSection
                activeCurrency={activeCurrency}
                freeRewards={freeRewards}
              />
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
                {launchpadData.curatedPackages?.map((curatedPackage) => {
                  const price = getTotalPriceOfItems(curatedPackage.items);
                  return (
                    <LaunchpadItemCard
                      title={curatedPackage.name}
                      description={
                        curatedPackage.description ||
                        `Combines ${curatedPackage.items
                          .map(
                            (item) =>
                              `${launchpadData.items.find(
                                (lpadItem) => lpadItem.id === item.id,
                              )?.name} x${item.quantity}`,
                          )
                          .join(", ")}`
                      }
                      price={{
                        value: Number(
                          formatUnits(price, tokens[activeCurrency]?.decimals),
                        ),
                        currency: tokens[activeCurrency]?.symbol,
                      }}
                      onItemCardClick={() => {
                        handleAddCuratedPackageToOrder(curatedPackage);
                      }}
                    />
                  );
                })}
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
                        {orderStandardItems.map((item) => (
                          <LaunchpadOrderItem
                            key={item.id}
                            title={`Item #${item.id}`}
                            quantity={item.quantity}
                            price={
                              activeCurrency
                                ? {
                                    value: Number(
                                      formatUnits(
                                        BigInt(
                                          standardItems.find(
                                            (standardItem) =>
                                              standardItem.id === item.id,
                                          )?.prices[activeCurrency] ?? 0,
                                        ),
                                        tokens[activeCurrency]?.decimals,
                                      ),
                                    ),
                                    currency: tokens[activeCurrency]?.symbol,
                                  }
                                : undefined
                            }
                            onIncreaseQuantityClicked={() => {
                              handleIncreaseItemQuantityInOrder(item.id);
                            }}
                            onDecreaseQuantityClicked={() => {
                              handleDecreaseItemQuantityInOrder(item.id);
                            }}
                            onRemoveClicked={() => {
                              handleRemoveItemFromOrder(item.id);
                            }}
                          />
                        ))}
                      </div>
                      <div className="flex-1 flex flex-col gap-3">
                        <p className="text-heading6 font-bold text-gray-50 uppercase">
                          Rewards
                        </p>
                        {orderFreeRewards.map((item) => {
                          const itemData = freeRewards.find(
                            (freeReward) => freeReward.id === item.id,
                          )!;
                          return (
                            <LaunchpadOrderItem
                              title={itemData.name}
                              quantity={item.quantity}
                              additionalText={`Per ${formatUnits(
                                BigInt(itemData.freeAt[activeCurrency]),
                                tokens[activeCurrency].decimals,
                              )} ${tokens[activeCurrency].symbol}`}
                              onDecreaseQuantityClicked={() => {
                                handleDecreaseItemQuantityInOrder(item.id);
                              }}
                              onIncreaseQuantityClicked={() => {
                                handleIncreaseItemQuantityInOrder(item.id);
                              }}
                              onRemoveClicked={() => {
                                handleRemoveItemFromOrder(item.id);
                              }}
                            />
                          );
                        })}
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
