import { Link, useParams } from "react-router-dom";

import useGetLaunchpadData from "@hooks/launchpad/useGetLaunchpadData";

import { SingleArrowLeftIcon } from "@components/icons/GeneralIcons";
import Button from "@components/Button";
import LaunchpadMintSection from "@components/launchpad/LaunchpadMintSection";
import LaunchpadGameInformation from "@components/launchpad/LaunchpadGameInformation";
import { Ref, useEffect, useRef, useState } from "react";
import { NetworkType } from "@utils/types";
import useSetPageNetworkTypes from "@hooks/useSetPageNetworkTypes";
import { launchpadsInformationData } from "@config/launchpad";
import LaunchpadGameInformationFAQPanel from "@components/launchpad/LaunchpadGameInformationFAQPanel";

export default function Launchpad() {
  const { launchpad } = useParams();
  const { data, isLoading } = useGetLaunchpadData(launchpad);
  const [isSaleLive, setIsSaleLive] = useState(false);

  const pageNetworkTypes: Ref<NetworkType[]> = useRef(["evm"]);
  useSetPageNetworkTypes(pageNetworkTypes.current);

  const launchpadInformationData = launchpad
    ? launchpadsInformationData[launchpad]
    : null;

  useEffect(() => {
    const refreshSaleStatus = () => {
      setIsSaleLive(
        data
          ? new Date().getTime() >
              (data.timestampStartWhitelistSale ||
                data.timestampStartPublicSale) *
                1000 && new Date().getTime() < data.timestampEndSale * 1000
          : false,
      );
    };
    const interval = setInterval(() => {
      refreshSaleStatus();
    }, 1000);

    refreshSaleStatus();

    return () => clearInterval(interval);
  }, [data]);

  return (
    <div className="w-full py-6 container">
      {isLoading ? (
        // TOOD: Handle loading state
        <div className="animate-pulse h-64 w-full bg-gray-900 rounded-xl" />
      ) : !data ? (
        // TOOD: Handle error state
        <>Data failed to load</>
      ) : (
        <div className="flex flex-col gap-12">
          <div className="flex flex-col gap-3">
            <div className="flex gap-1 pb-3">
              <div className="w-5 h-5 flex items-center justify-center text-brand">
                <SingleArrowLeftIcon />
              </div>
              <Link
                to="/launchpad"
                className="text-heading5 text-gray-200 hover:text-brand transition-colors duration-150 ease-in-out"
              >
                Back to Launchpad overview
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
            <LaunchpadGameInformation
              data={launchpadInformationData?.header ?? []}
            />
            <LaunchpadMintSection
              timestampStartWhitelistSale={
                data.timestampStartWhitelistSale
                  ? data.timestampStartWhitelistSale * 1000
                  : undefined
              }
              timestampStartPublicSale={data.timestampStartPublicSale * 1000}
              timestampEndSale={data.timestampEndSale * 1000}
            />
            <div className="p-[1px] bg-brand rounded-2xl">
              <div className="flex flex-col tablet:flex-row tablet:justify-between tablet:items-center achievement-background rounded-2xl p-6 laptop:p-10 gap-6">
                <h3 className="text-displayXS text-gray-50 font-formula font-bold">
                  {isSaleLive ? "Buy game items" : "View game items"}
                </h3>
                <Button
                  href={`/launchpad/${launchpad}/buy`}
                  text={isSaleLive ? "Buy now!" : "View items"}
                />
              </div>
            </div>
            <LaunchpadGameInformation
              data={launchpadInformationData?.body ?? []}
            />
            <LaunchpadGameInformationFAQPanel
              data={launchpadInformationData?.faq ?? []}
            />
          </div>
        </div>
      )}
    </div>
  );
}
