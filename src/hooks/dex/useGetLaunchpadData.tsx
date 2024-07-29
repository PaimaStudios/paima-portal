import useGetAllLaunchpadsData from "./useGetAllLaunchpadsData";
import { useMemo } from "react";

export default function useGetLaunchpadsData(launchpad: string | undefined) {
  const { data, isLoading } = useGetAllLaunchpadsData();
  return {
    data: useMemo(() => {
      return (
        data?.find((launchpadData) => launchpadData.slug === launchpad) ?? null
      );
    }, [data, launchpad]),
    isLoading,
  };
}
