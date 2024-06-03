import { create } from "zustand";

type State = {
  navbarTitle?: string;
};

type Actions = {
  setNavbarTitle: (newTitle: string) => void;
};

export const useDappStore = create<State & Actions>((set) => ({
  navbarTitle: undefined,
  setNavbarTitle: (newTitle) => set({ navbarTitle: newTitle }),
}));

export default useDappStore;
