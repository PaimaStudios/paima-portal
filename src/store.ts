import { NetworkType } from "@utils/types";
import { create } from "zustand";

type State = {
  navbarTitle?: string;
  connectedNetworkType?: NetworkType;
};

type Actions = {
  setNavbarTitle: (newTitle: string) => void;
  setConnectedNetworkType: (networkType: NetworkType) => void;
};

export const useDappStore = create<State & Actions>((set) => ({
  navbarTitle: undefined,
  connectedNetworkType: undefined,
  setNavbarTitle: (newTitle) => set({ navbarTitle: newTitle }),
  setConnectedNetworkType: (networkType) =>
    set({ connectedNetworkType: networkType }),
}));

export default useDappStore;
