import { Ref, useCallback, useEffect, useMemo, useRef, useState } from "react";
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
} from "@hooks/launchpad/useGetAllLaunchpadsData";
import { formatUnits, isAddress } from "viem";
import { ZERO_ADDRESS } from "@utils/constants";
import useGetLaunchpadUserData from "@hooks/launchpad/useGetLaunchpadUserData";
import useConnectWallet from "@hooks/useConnectWallet";
import useSubmitLaunchpadPurchase from "@hooks/launchpad/useSubmitLaunchpadPurchase";
import ReferralCodeInput from "@components/ReferralCodeInput";
import IsConnectedWrapper from "@components/common/IsConnectedWrapper";
import useSetPageNetworkTypes from "@hooks/useSetPageNetworkTypes";
import { NetworkType } from "@utils/types";
import LaunchpadPurchaseSuccessDialog from "@components/launchpad/LaunchpadPurchaseSuccessDialog";
import useGetItemQuantityLeft from "@hooks/launchpad/useGetItemQuantityLeft";
import CopyButton from "@components/CopyButton";
import useGetSaleStatus from "@hooks/launchpad/useGetSaleStatus";
import { launchpadsInformationData } from "@config/launchpad";

export enum Currency {
  USDC = "USDC",
  ETH = "ETH",
}

const CurrencySelectorButton = ({
  text,
  isActive = false,
  disabled = false,
  onButtonClicked,
}: {
  text: string;
  isActive?: boolean;
  disabled?: boolean;
  onButtonClicked?: () => void;
}) => {
  return (
    <button
      className={clsx(
        "min-w-[120px] flex items-center justify-center uppercase font-medium text-white text-heading5 px-6 py-3 border-2 rounded-xl w-full transition-colors duration-150 ease-in-out",
        isActive ? "border-brand" : "border-gray-800 ",
        disabled
          ? "hover:cursor-not-allowed"
          : "hover:cursor-pointer hover:border-brand",
      )}
      onClick={disabled ? undefined : onButtonClicked}
    >
      {text}
    </button>
  );
};

export default function LaunchpadDetail() {
  let urlParams = useParams();
  const queryParameters = new URLSearchParams(window.location.search);
  const launchpadSlug = urlParams.launchpad!;
  const referrer = queryParameters.get("referral");
  const { address: walletAddress } = useConnectWallet();
  const { data: launchpadData, isLoading: isLoadingLaunchpadData } =
    useGetLaunchpadData(launchpadSlug);
  const { data: userData } = useGetLaunchpadUserData(
    launchpadSlug,
    walletAddress,
  );
  const { isSaleLive, isSaleInWhitelist } = useGetSaleStatus(launchpadSlug);
  const pageNetworkTypes: Ref<NetworkType[]> = useRef(["evm"]);
  useSetPageNetworkTypes(pageNetworkTypes.current);

  const [referralCode, setReferralCode] = useState(referrer ?? "");
  const [activeCurrency, setActiveCurrency] = useState<string>(ZERO_ADDRESS);
  const [orderItems, setOrderItems] = useState<
    {
      id: number;
      quantity: number;
    }[]
  >([]);

  const { getItemQuantityLeft } = useGetItemQuantityLeft(
    launchpadSlug,
    orderItems,
  );

  const applyReferralDiscount =
    isAddress(referralCode, { strict: false }) &&
    referralCode !== ZERO_ADDRESS &&
    referralCode.toLowerCase() !== walletAddress?.toLowerCase();

  const launchpadInformationData = launchpadSlug
    ? launchpadsInformationData[launchpadSlug]
    : null;

  const handleIncreaseItemQuantityInOrder = (
    itemID: number,
    increaseBy = 1,
  ) => {
    const existingItem = orderItems.find((item) => item.id === itemID);

    if (existingItem) {
      setOrderItems((orderItems) =>
        orderItems
          .map((item) =>
            item.id === itemID
              ? { ...item, quantity: item.quantity + increaseBy }
              : item,
          )
          .sort((item1, item2) => item1.id - item2.id),
      );
    } else {
      setOrderItems((orderItems) =>
        [...orderItems, { id: itemID, quantity: increaseBy }].sort(
          (item1, item2) => item1.id - item2.id,
        ),
      );
    }
  };

  const handleDecreaseItemQuantityInOrder = (itemID: number) => {
    const existingItem = orderItems.find((item) => item.id === itemID);

    if (existingItem) {
      if (existingItem.quantity > 1) {
        setOrderItems((orderItems) =>
          orderItems
            .map((item) =>
              item.id === itemID
                ? { ...item, quantity: item.quantity - 1 }
                : item,
            )
            .sort((item1, item2) => item1.id - item2.id),
        );
      } else {
        setOrderItems((orderItems) =>
          orderItems
            .filter((item) => item.id !== itemID)
            .sort((item1, item2) => item1.id - item2.id),
        );
      }
    }
  };

  const handleRemoveItemFromOrder = (itemID: number) => {
    setOrderItems((orderItems) =>
      orderItems.filter((item) => item.id !== itemID),
    );
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

  const getPriceOfItem = useCallback(
    (item?: StandardItem) => {
      if (!launchpadData || !item) return 0n;
      let price = BigInt(item.prices[activeCurrency] ?? 0);
      const itemReferralDiscountBps = !applyReferralDiscount
        ? 0
        : item.referralDiscountBps ?? launchpadData.referralDiscountBps ?? 0;
      price -= (price * BigInt(itemReferralDiscountBps)) / 10000n;
      return price;
    },
    [activeCurrency, applyReferralDiscount, launchpadData],
  );

  const getTotalPriceOfItems = useCallback(
    (items: typeof orderItems, includeFreeAt = false) => {
      if (!launchpadData) return 0n;
      return items.reduce((acc, item) => {
        const lpadItem = launchpadData.items.find(
          (lpadItem) => lpadItem.id === item.id,
        );
        if (!lpadItem) return acc;
        if ("prices" in lpadItem) {
          const price = getPriceOfItem(lpadItem);
          return acc + price * BigInt(item.quantity);
        } else if ("freeAt" in lpadItem && includeFreeAt) {
          return (
            acc +
            BigInt(lpadItem.freeAt[activeCurrency] ?? 0) * BigInt(item.quantity)
          );
        }
        return acc;
      }, 0n);
    },
    [activeCurrency, getPriceOfItem, launchpadData],
  );

  const getPackageQuantityLeft = useCallback(
    (curatedPackage: NonNullable<LaunchpadData["curatedPackages"]>[number]) => {
      const packageQuantityLeft = curatedPackage.items.reduce((acc, item) => {
        const itemQuantityLeft = getItemQuantityLeft(item.id);
        return Math.min(acc, itemQuantityLeft ?? Infinity);
      }, Infinity);
      return packageQuantityLeft === Infinity ? undefined : packageQuantityLeft;
    },
    [getItemQuantityLeft],
  );

  const isWalletWhitelisted = useMemo(() => {
    if (!launchpadData || !walletAddress) return false;
    return launchpadData.whitelistedAddresses
      ?.map((addr) => addr.toLowerCase())
      .includes(walletAddress.toLowerCase());
  }, [launchpadData, walletAddress]);

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

  const cheapestFreeReward = useMemo(() => {
    if (!launchpadData) return 0n;
    return freeRewards.reduce(
      (acc, item) => {
        if (!item.freeAt[activeCurrency]) return acc;
        const price = BigInt(item.freeAt[activeCurrency]);
        return price < acc ? price : acc;
      },
      BigInt(freeRewards[0]?.freeAt[activeCurrency] ?? 0),
    );
  }, [activeCurrency, freeRewards, launchpadData]);

  const surplusForRewards = useMemo(() => {
    return (
      getTotalPriceOfItems(orderStandardItems) -
      getTotalPriceOfItems(orderFreeRewards, true)
    );
  }, [getTotalPriceOfItems, orderStandardItems, orderFreeRewards]);

  useEffect(() => {
    if ((!userData || !userData.user) && currencies[0]) {
      setActiveCurrency(currencies[0]);
    }
  }, [currencies, userData]);

  useEffect(() => {
    if (!userData || !userData.user) return;
    const items: typeof orderItems = userData.items.map((item) => ({
      id: item.itemid,
      quantity: item.quantity,
    }));
    setOrderItems(items);
    setActiveCurrency(userData.user.paymenttoken);
    if (userData.user.lastreferrer !== ZERO_ADDRESS) {
      setReferralCode(userData.user.lastreferrer);
    }
  }, [userData]);

  const amountToPay =
    getTotalPriceOfItems(orderItems) - BigInt(userData?.user?.totalamount ?? 0);
  const formHasError = surplusForRewards < 0n || amountToPay < 0n;
  const noActionToDo =
    amountToPay === 0n &&
    userData?.items.length === orderItems.length &&
    userData.items.every((item) =>
      orderItems.some(
        (orderItem) =>
          orderItem.id === item.itemid && orderItem.quantity === item.quantity,
      ),
    );

  const {
    submitLaunchpadPurchase,
    isLoading: isLoadingSubmit,
    isPending: isPendingSubmit,
    isSuccess: isSuccessSubmit,
    hash: hashSubmit,
  } = useSubmitLaunchpadPurchase({
    currency: activeCurrency,
    launchpadSlug,
    orderItems,
    value: amountToPay,
    referrer: referralCode.length > 0 ? referralCode : undefined,
  });

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
                  {launchpadInformationData?.detail?.buyItemsTitle ??
                    `Buy game items`}
                </h4>
                <p className="text-bodyL text-gray-100">
                  {launchpadInformationData?.detail?.buyItemsText ??
                    `Purchase in-game items for the game ${launchpadData.name}. Items will be delivered after the sale ends.`}
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
                    disabled={
                      userData?.user?.paymenttoken !== undefined &&
                      currency !== activeCurrency
                    }
                  />
                ))}
              </div>
            </div>
            <div className="flex flex-col gap-6">
              <div className="flex flex-col gap-4">
                <h4 className="text-heading3 text-gray-50 font-bold">
                  {launchpadInformationData?.detail?.freeRewardsTitle ??
                    `Spend and get free rewards`}
                </h4>
                <p className="text-bodyL text-gray-100">
                  {launchpadInformationData?.detail?.freeRewardsText ??
                    `The more you spend, the more you get! Spend a certain amount to get free rewards.`}
                </p>
              </div>
              <LaunchpadRewardsSection
                activeCurrency={activeCurrency}
                freeRewards={freeRewards}
                handleIncreaseItemQuantityInOrder={
                  handleIncreaseItemQuantityInOrder
                }
                orderFreeRewards={orderFreeRewards}
                launchpadSlug={launchpadSlug}
              />
            </div>
            <div className="flex flex-col gap-6">
              <div className="flex flex-col gap-4">
                <h4 className="text-heading3 text-gray-50 font-bold">
                  {launchpadInformationData?.detail?.curatedPackagesTitle ??
                    `Curated packages`}
                </h4>
                <p className="text-bodyL text-gray-100">
                  {launchpadInformationData?.detail?.curatedPackagesText ??
                    `Choose one or more of our curated packages to get started with your journey.`}
                </p>
              </div>
              <div className="grid grid-cols-2 laptop:grid-cols-4 gap-6">
                {launchpadData.curatedPackages?.map((curatedPackage) => {
                  const price = getTotalPriceOfItems(curatedPackage.items);
                  return (
                    <LaunchpadItemCard
                      key={curatedPackage.name}
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
                      onItemCardClick={
                        isSaleLive
                          ? () => {
                              handleAddCuratedPackageToOrder(curatedPackage);
                            }
                          : undefined
                      }
                      quantityLeft={getPackageQuantityLeft(curatedPackage)}
                      showCounter={false}
                      showQuantityLeft={false}
                      showAdded={true}
                    />
                  );
                })}
              </div>
            </div>
            <div className="flex flex-col gap-6">
              <div className="flex flex-col gap-4">
                <h4 className="text-heading3 text-gray-50 font-bold">
                  {launchpadInformationData?.detail?.itemsForSaleTitle ??
                    `Items for sale`}
                </h4>
                <p className="text-bodyL text-gray-100">
                  {launchpadInformationData?.detail?.itemsForSaleText ??
                    `Pick and choose from a variety of items available for sale. Get your journey started exactly the way you want!`}
                </p>
              </div>
              <div className="grid grid-cols-2 tablet:grid-cols-3 laptop:grid-cols-4 gap-6">
                {standardItems.map((item) => {
                  const price = Number(
                    formatUnits(
                      getPriceOfItem(item),
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
                      onItemCardClick={
                        isSaleLive
                          ? () => {
                              handleIncreaseItemQuantityInOrder(item.id);
                            }
                          : undefined
                      }
                      isHighlighted={getItemCountFromOrder(item.id) > 0}
                      counter={getItemCountFromOrder(item.id)}
                      quantityLeft={getItemQuantityLeft(item.id)}
                      supply={item.supply}
                    />
                  );
                })}
              </div>
            </div>
            <div className="flex flex-col gap-10">
              <h3 className="text-heading2 text-brand font-bold">Your order</h3>
              {BigInt(userData?.user?.totalamount ?? 0) > 0n && (
                <div className="flex gap-3">
                  <div className="w-10 h-10 flex items-center justify-center border border-gray-400 rounded-lg p-2 text-brand shrink-0">
                    <PencilIcon />
                  </div>
                  <p className="text-bodyM text-gray-100">
                    Great news! Since you've placed an order (or multiple
                    orders) before, you can add even more items to your order.
                    You can also swap some things out, but remember the total
                    amount needs to be equal to or more than what you've already
                    paid.
                  </p>
                </div>
              )}
              <div className="flex flex-col laptop:flex-row gap-10 laptop:items-start">
                <>
                  {orderItems.length === 0 ? (
                    <LaunchpadOrderEmpty />
                  ) : (
                    <div className="flex-1  flex flex-col gap-10">
                      <div className="flex flex-col tablet:flex-row gap-10">
                        <div className="flex-1 flex flex-col gap-3">
                          <p className="text-heading6 font-bold text-gray-50 uppercase">
                            Items
                          </p>
                          {orderStandardItems.length === 0 && (
                            <p className="text-bodyM text-gray-200">
                              You haven't selected any items yet.
                            </p>
                          )}
                          {orderStandardItems.map((item) => {
                            const itemData = standardItems.find(
                              (standardItem) => standardItem.id === item.id,
                            )!;
                            return (
                              <LaunchpadOrderItem
                                key={item.id}
                                title={itemData.name}
                                quantity={item.quantity}
                                price={
                                  activeCurrency
                                    ? {
                                        value: Number(
                                          formatUnits(
                                            getPriceOfItem(
                                              standardItems.find(
                                                (standardItem) =>
                                                  standardItem.id === item.id,
                                              ),
                                            ),
                                            tokens[activeCurrency]?.decimals,
                                          ),
                                        ),
                                        currency:
                                          tokens[activeCurrency]?.symbol,
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
                                quantityLeft={getItemQuantityLeft(item.id)}
                                canChangeQuantity={isSaleLive}
                              />
                            );
                          })}
                        </div>
                        <div className="flex-1 flex flex-col gap-3">
                          <p className="text-heading6 font-bold text-gray-50 uppercase">
                            Rewards
                          </p>
                          {surplusForRewards !== 0n && (
                            <div
                              className={clsx(
                                "border rounded-2xl p-6 gap-4 flex flex-col items-center justify-center divide-y divide-gray-600",
                                surplusForRewards < 0n
                                  ? "border-error"
                                  : "border-brand",
                              )}
                            >
                              {surplusForRewards !== 0n && (
                                <p className="text-bodyL font-semibold text-gray-50">
                                  {surplusForRewards < 0n
                                    ? `You need to purchase items for ${formatUnits(
                                        -surplusForRewards,
                                        tokens[activeCurrency]?.decimals,
                                      )} more ${tokens[activeCurrency]
                                        ?.symbol} to be able to claim selected rewards`
                                    : surplusForRewards < cheapestFreeReward
                                    ? `You will be eligible for ${
                                        orderFreeRewards.length === 0
                                          ? "a"
                                          : "an another"
                                      } free reward if you spend ${formatUnits(
                                        cheapestFreeReward - surplusForRewards,
                                        tokens[activeCurrency]?.decimals,
                                      )} more ${tokens[activeCurrency]
                                        ?.symbol}.`
                                    : `You can still claim rewards for ${formatUnits(
                                        surplusForRewards,
                                        tokens[activeCurrency]?.decimals,
                                      )} ${tokens[activeCurrency]?.symbol}.`}
                                </p>
                              )}
                            </div>
                          )}
                          {orderFreeRewards.map((item) => {
                            const itemData = freeRewards.find(
                              (freeReward) => freeReward.id === item.id,
                            )!;
                            return (
                              <LaunchpadOrderItem
                                key={item.id}
                                title={itemData.name}
                                quantity={item.quantity}
                                additionalText={`Per ${formatUnits(
                                  BigInt(itemData.freeAt[activeCurrency]),
                                  tokens[activeCurrency]?.decimals,
                                )} ${tokens[activeCurrency]?.symbol}`}
                                onDecreaseQuantityClicked={() => {
                                  handleDecreaseItemQuantityInOrder(item.id);
                                }}
                                onIncreaseQuantityClicked={() => {
                                  handleIncreaseItemQuantityInOrder(item.id);
                                }}
                                onRemoveClicked={() => {
                                  handleRemoveItemFromOrder(item.id);
                                }}
                                quantityLeft={getItemQuantityLeft(item.id)}
                                canChangeQuantity={isSaleLive}
                              />
                            );
                          })}
                        </div>
                      </div>
                      <div>
                        <div className="flex-1 flex flex-col gap-3">
                          <div className="flex justify-between">
                            <div className="flex-1 flex flex-col gap-3">
                              <p className="text-heading6 font-bold text-gray-50 uppercase">
                                Referral code
                              </p>
                              <p className="text-bodyM text-gray-100">
                                Enter a referral code to get discount on your
                                order items
                              </p>
                            </div>
                            {walletAddress && (
                              <CopyButton
                                buttonProps={{
                                  outlineVariant: true,
                                }}
                                text={"Copy your link"}
                                valueToCopy={`${window.location.href}?referral=${walletAddress}`}
                              />
                            )}
                          </div>
                          <ReferralCodeInput
                            placeholder="Wallet address as referral code"
                            validityFeedback={
                              referralCode.length === 0
                                ? undefined
                                : !isAddress(referralCode, { strict: false }) ||
                                  referralCode === ZERO_ADDRESS
                                ? "Invalid"
                                : referralCode.toLowerCase() ===
                                  walletAddress?.toLowerCase()
                                ? `Your\u00A0own`
                                : "Valid"
                            }
                            value={referralCode}
                            onInputValueChange={(value) =>
                              setReferralCode(value)
                            }
                            hasError={
                              referralCode.length > 0 && !applyReferralDiscount
                            }
                          />
                        </div>
                      </div>
                    </div>
                  )}
                </>
                <div
                  className={clsx(
                    "border rounded-2xl flex flex-col items-center justify-center laptop:w-1/3 divide-y divide-gray-600",
                    formHasError ? "border-error" : "border-brand",
                  )}
                >
                  <div className="p-6 flex flex-col gap-4 flex-1 w-full">
                    <p className="text-heading6 font-bold text-gray-50 uppercase">
                      Summary
                    </p>

                    <div className="flex flex-col gap-2">
                      <p className="text-bodyM text-gray-50">Items total</p>
                      <p className="text-heading5 font-bold text-brand uppercase">
                        {formatUnits(
                          getTotalPriceOfItems(orderItems),
                          tokens[activeCurrency]?.decimals,
                        )}{" "}
                        {tokens[activeCurrency]?.symbol}
                      </p>
                    </div>
                  </div>
                  <div className="p-6 flex flex-col gap-4 flex-1 w-full">
                    <div className="flex items-center justify-between">
                      <p className="text-heading5 font-bold text-gray-50">
                        Already paid
                      </p>
                      <p className="text-heading5 font-bold text-brand">
                        {formatUnits(
                          BigInt(userData?.user?.totalamount ?? 0),
                          tokens[activeCurrency]?.decimals,
                        )}{" "}
                        {tokens[activeCurrency]?.symbol}
                      </p>
                    </div>
                    <div className="flex items-center justify-between">
                      <p className="text-heading5 font-bold text-gray-50">
                        Balance to pay
                      </p>
                      <p className="text-heading5 font-bold text-brand">
                        {formatUnits(
                          amountToPay,
                          tokens[activeCurrency]?.decimals,
                        )}{" "}
                        {tokens[activeCurrency]?.symbol}
                      </p>
                    </div>
                    <IsConnectedWrapper>
                      <Button
                        text={
                          !isSaleLive
                            ? "Sale not live"
                            : isSaleInWhitelist && !isWalletWhitelisted
                            ? "Not whitelisted"
                            : formHasError
                            ? "Invalid order"
                            : amountToPay < 0n
                            ? "Choose more items"
                            : amountToPay === 0n
                            ? noActionToDo
                              ? "Nothing to do"
                              : "Confirm"
                            : "Confirm and pay"
                        }
                        disabled={
                          formHasError ||
                          noActionToDo ||
                          !isSaleLive ||
                          (isSaleInWhitelist && !isWalletWhitelisted)
                        }
                        onButtonClick={submitLaunchpadPurchase}
                        isLoading={isLoadingSubmit}
                        isPending={isPendingSubmit}
                      />
                    </IsConnectedWrapper>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      {isSuccessSubmit && (
        <LaunchpadPurchaseSuccessDialog
          txHash={hashSubmit}
          hasReferralRewardSharing={(launchpadData?.referrerRewardBps ?? 0) > 0}
        />
      )}
    </div>
  );
}
