import { Link, useLocation } from "react-router-dom";
import { ReactElement } from "react";
import clsx from "clsx";

import env from "@config/env";

import ConnectWallet from "./ConnectWallet";
import {
  NavigationIconAchievement,
  NavigationIconDashboard,
  NavigationIconGames,
  NavigationIconHelp,
  NavigationIconHome,
  NavigationIconLaunchpad,
  NavigationIconLearn,
  NavigationIconTarochiDEX,
  NavigationIconTools,
} from "@components/icons/NavigationIcons";

type NavigationItem = {
  label: string;
  href: string;
  icon: ReactElement;
  // highlights the link if the location contains the href
  groupMatch?: boolean;
  visible: boolean;
};

const items: NavigationItem[] = [
  {
    label: "Home",
    href: "/games",
    icon: <NavigationIconHome />,
    visible: true,
  },
  {
    label: "Dashboard",
    href: "#",
    icon: <NavigationIconDashboard />,
    visible: !env.REACT_APP_TESTNET,
  },
  {
    label: "Achievement",
    href: "/achievement",
    icon: <NavigationIconAchievement />,
    visible: true,
  },
  {
    label: "Games",
    href: "/games",
    icon: <NavigationIconGames />,
    visible: true,
  },
  {
    label: "Tarochi Gold DEX",
    href: "/dex/tarochi/tgold",
    icon: <NavigationIconTarochiDEX />,
    visible: true,
  },
  {
    label: "Launchpad",
    href: "/launchpad",
    groupMatch: true,
    icon: <NavigationIconLaunchpad />,
    visible: env.REACT_APP_ENABLE_LAUNCHPAD,
  },
  {
    label: "Learn",
    href: "#",
    icon: <NavigationIconLearn />,
    visible: !env.REACT_APP_TESTNET,
  },
  {
    label: "Tools",
    href: "#",
    icon: <NavigationIconTools />,
    visible: !env.REACT_APP_TESTNET,
  },
  {
    label: "Get Help",
    href: "#",
    icon: <NavigationIconHelp />,
    visible: !env.REACT_APP_TESTNET,
  },
];

type Props = {
  showWallet?: boolean;
};

export default function NavigationItems({ showWallet = false }: Props) {
  const location = useLocation();

  return (
    <div className="flex flex-col gap-3 overflow-y-auto">
      {showWallet && <ConnectWallet />}
      {items
        .filter((item) => item.visible)
        .map((item) => {
          const isActive = item.groupMatch
            ? location.pathname.includes(item.href)
            : location.pathname === item.href;

          return (
            <Link
              to={item.href}
              key={`${item.href}${item.label.toLowerCase()}`}
              className={clsx(
                "p-3 flex gap-2 text-heading5 font-medium rounded-lg hover:bg-gray-950",
                isActive ? "text-green-200" : "text-gray-50",
              )}
            >
              <div className="w-5 h-5 flex items-center justify-center">
                {item.icon}
              </div>
              {item.label}
            </Link>
          );
        })}
    </div>
  );
}
