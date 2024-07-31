import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

import ConnectWallet from "./ConnectWallet";
import {
  MobileMenuCloseIcon,
  MobileMenuIcon,
} from "@components/icons/GeneralIcons";
import NavigationItems from "./NavigationItems";
import PaimaFootnotes from "@components/PaimaFootnotes";

export default function Topbar() {
  const location = useLocation();

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    // close mobile menu when location changes

    setIsMobileMenuOpen(false);
  }, [location]);

  useEffect(() => {
    // lock body scroll when mobile menu is open

    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [isMobileMenuOpen]);

  return (
    <div className="h-[70px] flex items-center justify-between py-3 px-6">
      <div>
        <Link to="/" className="tablet:hidden">
          <img src="/paima-icon.svg" alt="Paima Logo" />
        </Link>
      </div>
      <div className="flex gap-4 items-center">
        <ConnectWallet />
        <button
          className="w-8 h-8 flex items-center justify-center p-1 tablet:hidden"
          onClick={() => setIsMobileMenuOpen(true)}
        >
          <MobileMenuIcon />
        </button>
      </div>
      {isMobileMenuOpen && (
        <div className="tablet:hidden fixed w-full h-full top-0 left-0 bg-gray-1100 z-10 flex flex-col">
          <div className="flex justify-end py-5 px-6">
            <button
              className="w-8 h-8 flex items-center justify-center p-1"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <MobileMenuCloseIcon />
            </button>
          </div>
          <div className="flex flex-col justify-between flex-1 pb-10 px-6">
            <NavigationItems />
            <PaimaFootnotes />
          </div>
        </div>
      )}
    </div>
  );
}
