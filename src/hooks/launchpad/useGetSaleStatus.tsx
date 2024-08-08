import { useEffect, useState } from "react";
import useGetLaunchpadData from "./useGetLaunchpadData";

export default function useGetSaleStatus(launchpadSlug: string) {
  const { data: launchpadData } = useGetLaunchpadData(launchpadSlug);
  const [isSaleLive, setIsSaleLive] = useState(false);
  const [isSaleInWhitelist, setIsSaleInWhitelist] = useState(false);

  useEffect(() => {
    const refreshSaleStatus = () => {
      if (!launchpadData) return;
      const saleLive =
        new Date().getTime() >
          (launchpadData.timestampStartWhitelistSale ||
            launchpadData.timestampStartPublicSale) *
            1000 &&
        new Date().getTime() < launchpadData.timestampEndSale * 1000;
      setIsSaleLive(saleLive);
      setIsSaleInWhitelist(
        saleLive &&
          launchpadData.timestampStartWhitelistSale !== undefined &&
          new Date().getTime() < launchpadData.timestampStartPublicSale * 1000,
      );
    };
    const interval = setInterval(() => {
      refreshSaleStatus();
    }, 1000);

    refreshSaleStatus();

    return () => clearInterval(interval);
  }, [launchpadData]);
  return { isSaleLive, isSaleInWhitelist };
}
