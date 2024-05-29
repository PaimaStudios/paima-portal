import { gamesMetadata } from "@config/dex";
import { useQuery } from "@tanstack/react-query";
import { QueryKeys } from "@utils/queryKeys";
import { useParams } from "react-router-dom";

export default function useGetGameAssetMetadata(params?: {
  game: string;
  asset: string;
}) {
  const { game: gameFromUrl, asset: assetFromUrl } = useParams();

  const game = params?.game || gameFromUrl;
  const asset = params?.asset || assetFromUrl;

  return useQuery({
    queryKey: [QueryKeys.GameMetadata, game, asset],
    queryFn: async () => {
      return gamesMetadata[game ?? ""]?.assets[asset ?? ""] ?? null;
    },
  });
}
