import { useEffect } from "react";
import useDappStore from "src/store";

export default function useSetNavbarTitle(title?: string) {
  const setNavbarTitle = useDappStore((state) => state.setNavbarTitle);
  useEffect(() => {
    if (!title) return;
    setNavbarTitle(title);
  }, [setNavbarTitle, title]);
}
