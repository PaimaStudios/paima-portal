import { gamesApi } from "@config/dex";
import { useQuery } from "@tanstack/react-query";
import { GameMetadata } from "@utils/dex/types";
import { QueryKeys } from "@utils/queryKeys";
import axios from "axios";
import useGetGameAndAssetFromUrl from "./useGetGameAndAssetFromUrl";

export default function useGetGameMetadata(params?: { game: string }) {
  const { game: gameFromUrl } = useGetGameAndAssetFromUrl();

  const game = params?.game || gameFromUrl;

  return useQuery<GameMetadata | undefined>({
    queryKey: [QueryKeys.GameMetadata, game],
    queryFn: async () => {
      if (!game) return undefined;
      const gameApi = gamesApi[game];
      if (!gameApi) return undefined;
      const response = await axios.get<GameMetadata>(`${gameApi}/dex`);
      return response.data;
    },
  });
}
