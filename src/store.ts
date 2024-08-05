import { NetworkType } from "@utils/types";
import { create } from "zustand";

type State = {
  navbarTitle?: string;
  connectedNetworkType?: NetworkType;
  pageNetworkTypes?: NetworkType[];
};

type Actions = {
  setNavbarTitle: (newTitle: string) => void;
  setConnectedNetworkType: (networkType: NetworkType) => void;
  setPageNetworkTypes: (networkTypes: NetworkType[]) => void;
};

export const useDappStore = create<State & Actions>((set) => ({
  navbarTitle: undefined,
  connectedNetworkType: undefined,
  pageNetworkTypes: ["evm"],
  setNavbarTitle: (newTitle) => set({ navbarTitle: newTitle }),
  setConnectedNetworkType: (networkType) =>
    set({ connectedNetworkType: networkType }),
  setPageNetworkTypes: (networkTypes) =>
    set({ pageNetworkTypes: networkTypes }),
}));

export default useDappStore;
