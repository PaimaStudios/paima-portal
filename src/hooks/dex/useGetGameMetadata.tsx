import { gamesMetadata } from "@config/dex";
import { useQuery } from "@tanstack/react-query";
import { QueryKeys } from "@utils/queryKeys";
import { useParams } from "react-router-dom";

export default function useGetGameMetadata(params?: { game: string }) {
  const { game: gameFromUrl } = useParams();

  const game = params?.game || gameFromUrl;

  return useQuery({
    queryKey: [QueryKeys.GameMetadata, game],
    queryFn: async () => {
      return gamesMetadata[game ?? ""] ?? null;
    },
  });
}
