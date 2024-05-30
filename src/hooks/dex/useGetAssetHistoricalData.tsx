import { useQuery } from "@tanstack/react-query";
import { mockChartData } from "@utils/dex/mockChartData";
import { AssetHistoricalData } from "@utils/dex/types";
import { QueryKeys } from "@utils/queryKeys";
import { useParams } from "react-router-dom";

const timeNow = new Date().getTime() / 1000;
const timeFrom = timeNow - mockChartData.length * 3600;
const mockData: AssetHistoricalData = {
  timeFrom,
  timeTo: timeNow,
  data: mockChartData,
};

export default function useGetAssetHistoricalData(params?: {
  game: string;
  asset: string;
}) {
  const { game: gameFromUrl, asset: assetFromUrl } = useParams();

  const game = params?.game || gameFromUrl;
  const asset = params?.asset || assetFromUrl;

  return useQuery<AssetHistoricalData>({
    queryKey: [QueryKeys.AssetHistoricalData],
    refetchInterval: 3000,
    queryFn: async () => {
      const newMockData = { ...mockData };
      newMockData.data = mockData.data.map((item, index) => {
        const newItem = { ...item };
        if (index === mockData.data.length - 1) {
          newItem.close =
            newItem.low + Math.random() * (newItem.high - newItem.low);
        }
        return newItem;
      });
      newMockData.timeTo = new Date().getTime();
      return newMockData;
    },
  });
}
