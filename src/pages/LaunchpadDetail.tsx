import { useState } from "react";
import clsx from "clsx";
import { Link, useParams } from "react-router-dom";

import useGetLaunchpadsData from "@hooks/dex/useGetLaunchpadData";

import { GiftIcon, SingleArrowLeftIcon } from "@components/icons/GeneralIcons";
import LaunchpadItemCard from "@components/launchpad/LaunchpadItemCard";

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
  const { launchpad } = useParams();
  const { data, isLoading } = useGetLaunchpadsData(launchpad);

  const [activeCurrency, setActiveCurrency] = useState<Currency>(Currency.USDC);

  return (
    <div className="w-full py-6 container">
      {isLoading ? (
        // TOOD: Handle loading state
        <div className="animate-pulse h-64 w-full bg-gray-900 rounded-xl" />
      ) : !data ? (
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
                to={`/launchpad/${launchpad}`}
                className="text-heading5 text-gray-200 hover:text-brand transition-colors duration-150 ease-in-out"
              >
                Back to game detail
              </Link>
            </div>
            <h2 className="text-heading3 tablet:text-displayXS font-formula font-bold">
              Launchpad
            </h2>
            <h1 className="text-heading2 tablet:text-displayS font-formula font-bold text-brand">
              {data.name}
            </h1>
          </div>
          <div className="flex flex-col gap-16">
            <h3 className="text-displayXS text-gray-50 font-formula font-bold">
              Buy game items
            </h3>
            <div className="flex flex-col-reverse tablet:flex-row gap-10 tablet:gap-20 tablet:items-start">
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
                <CurrencySelectorButton
                  text="USDC"
                  isActive={activeCurrency === Currency.USDC}
                  onButtonClicked={() => {
                    setActiveCurrency(Currency.USDC);
                  }}
                />
                <CurrencySelectorButton
                  text="ETH"
                  isActive={activeCurrency === Currency.ETH}
                  onButtonClicked={() => {
                    setActiveCurrency(Currency.ETH);
                  }}
                />
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
              <div className="flex items-start gap-10 relative">
                <div className="w-full h-[2px] absolute left-0 right-0 top-[24px] bg-gray-600" />
                <div className="flex flex-col gap-3 flex-1 z-10">
                  <div className="w-12 h-12 p-3 flex items-center justify-center rounded-full border border-gray-600 text-brand bg-gray-1100">
                    <GiftIcon />
                  </div>
                  {/* TODO: Handle currency switching */}
                  <h5 className="text-heading3 font-bold text-gray-50">
                    Per 0.0001ETH
                  </h5>
                  <LaunchpadItemCard
                    imageURL="/images/launchpad-item-placeholder.svg"
                    title="Reward #1"
                    description="Tarochi is an ambitious onchain RPG, where every quest."
                  />
                </div>
                <div className="flex flex-col gap-3 flex-1 z-10">
                  <div className="w-12 h-12 p-3 flex items-center justify-center rounded-full border border-gray-600 text-brand bg-gray-1100">
                    <GiftIcon />
                  </div>
                  {/* TODO: Handle currency switching */}
                  <h5 className="text-heading3 font-bold text-gray-50">
                    Per 0.001ETH
                  </h5>
                  <LaunchpadItemCard
                    imageURL="/images/launchpad-item-placeholder.svg"
                    title="Reward #2"
                    description="Tarochi is an ambitious onchain RPG, where every quest."
                  />
                </div>
                <div className="flex flex-col gap-3 flex-1 z-10">
                  <div className="w-12 h-12 p-3 flex items-center justify-center rounded-full border border-gray-600 text-brand bg-gray-1100">
                    <GiftIcon />
                  </div>
                  {/* TODO: Handle currency switching */}
                  <h5 className="text-heading3 font-bold text-gray-50">
                    Per 0.01ETH
                  </h5>
                  <LaunchpadItemCard
                    imageURL="/images/launchpad-item-placeholder.svg"
                    title="Reward #3"
                    description="Tarochi is an ambitious onchain RPG, where every quest."
                  />
                </div>
                <div className="flex flex-col gap-3 flex-1 z-10">
                  <div className="w-12 h-12 p-3 flex items-center justify-center rounded-full border border-gray-600 text-brand bg-gray-1100">
                    <GiftIcon />
                  </div>
                  {/* TODO: Handle currency switching */}
                  <h5 className="text-heading3 font-bold text-gray-50">
                    Per 0.1ETH
                  </h5>
                  <LaunchpadItemCard
                    imageURL="/images/launchpad-item-placeholder.svg"
                    title="Reward #4"
                    description="Tarochi is an ambitious onchain RPG, where every quest."
                  />
                </div>
              </div>
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
              <div className="flex items-start gap-6">
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
              <div className="grid grid-cols-4 gap-6">
                <LaunchpadItemCard
                  imageURL="/images/launchpad-item-placeholder.svg"
                  title="Item #1"
                  description="Combines Item #1, Item #2 and Item #3"
                  price={{
                    value: 0.0073233,
                    currency: Currency.ETH,
                  }}
                />
                <LaunchpadItemCard
                  imageURL="/images/launchpad-item-placeholder.svg"
                  title="Item #2"
                  description="Combines Item #1, Item #2 and Item #3"
                  price={{
                    value: 0.0073233,
                    currency: Currency.ETH,
                  }}
                />
                <LaunchpadItemCard
                  imageURL="/images/launchpad-item-placeholder.svg"
                  title="Item #3"
                  description="Combines Item #1, Item #2 and Item #3"
                  price={{
                    value: 0.0073233,
                    currency: Currency.ETH,
                  }}
                />
                <LaunchpadItemCard
                  imageURL="/images/launchpad-item-placeholder.svg"
                  title="Item #4"
                  description="Combines Item #1, Item #2 and Item #3"
                  price={{
                    value: 0.0073233,
                    currency: Currency.ETH,
                  }}
                />
                <LaunchpadItemCard
                  imageURL="/images/launchpad-item-placeholder.svg"
                  title="Item #5"
                  description="Combines Item #1, Item #2 and Item #3"
                  price={{
                    value: 0.0073233,
                    currency: Currency.ETH,
                  }}
                />
                <LaunchpadItemCard
                  imageURL="/images/launchpad-item-placeholder.svg"
                  title="Item #6"
                  description="Combines Item #1, Item #2 and Item #3"
                  price={{
                    value: 0.0073233,
                    currency: Currency.ETH,
                  }}
                />
                <LaunchpadItemCard
                  imageURL="/images/launchpad-item-placeholder.svg"
                  title="Item #7"
                  description="Combines Item #1, Item #2 and Item #3"
                  price={{
                    value: 0.0073233,
                    currency: Currency.ETH,
                  }}
                />
                <LaunchpadItemCard
                  imageURL="/images/launchpad-item-placeholder.svg"
                  title="Item #8"
                  description="Combines Item #1, Item #2 and Item #3"
                  price={{
                    value: 0.0073233,
                    currency: Currency.ETH,
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
