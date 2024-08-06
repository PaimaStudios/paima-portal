import { NetworkType } from "@utils/types";
import { useEffect } from "react";
import useDappStore from "src/store";

export default function useSetPageNetworkTypes(
  networkTypes?: NetworkType[] | null,
) {
  const setPageNetworkTypes = useDappStore(
    (state) => state.setPageNetworkTypes,
  );
  useEffect(() => {
    if (!networkTypes) return;
    setPageNetworkTypes(networkTypes);
  }, [networkTypes, setPageNetworkTypes]);
}
