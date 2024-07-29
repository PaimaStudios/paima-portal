import { useParams } from "react-router-dom";

import useGetLaunchpadsData from "@hooks/dex/useGetLaunchpadData";

export default function Launchpad() {
  const { launchpad } = useParams();
  const { data, isLoading } = useGetLaunchpadsData(launchpad);

  return (
    <div className="w-full py-6 container">
      {isLoading ? (
        // TOOD: Handle loading state
        <div className="animate-pulse h-64 w-full bg-gray-900 rounded-xl" />
      ) : !data ? (
        // TOOD: Handle error state
        <>Data failed to load</>
      ) : (
        <div className="flex flex-col gap-3">
          <h2 className="text-heading3 tablet:text-displayXS font-formula font-bold">
            Launchpad
          </h2>
          <h1 className="text-heading2 tablet:text-displayS font-formula font-bold text-brand">
            {data.name}
          </h1>
        </div>
      )}
    </div>
  );
}
