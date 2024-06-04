import { useParams } from "react-router-dom";

export default function useGetGameAndAssetFromUrl() {
  const { game, asset } = useParams();

  return { game, asset };
}
