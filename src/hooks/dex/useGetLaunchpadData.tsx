import { useMemo } from "react";

import useGetAllLaunchpadsData from "./useGetAllLaunchpadsData";

export default function useGetLaunchpadData(launchpadSlug: string | undefined) {
  const { data, isLoading } = useGetAllLaunchpadsData();

  return {
    data: useMemo(() => {
      return (
        data?.find((launchpadData) => launchpadData.slug === launchpadSlug) ??
        null
      );
    }, [data, launchpadSlug]),
    isLoading,
  };
}
