import useGetGameAssetMetadata from "./useGetGameAssetMetadata";
import { useReadOrderbookDexOrderCreationFee } from "src/generated";

export default function useGetOrderCreationFee() {
  const { data: assetMetadata } = useGetGameAssetMetadata();
  return useReadOrderbookDexOrderCreationFee({
    address: assetMetadata?.contractDex,
    query: {
      enabled: !!assetMetadata,
    },
  });
}
