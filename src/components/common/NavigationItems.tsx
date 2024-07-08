import { Button, Stack } from "@mui/material";
import { Link, useLocation } from "react-router-dom";
import { ReactElement } from "react";
import clsx from "clsx";

import ConnectWallet from "./ConnectWallet";
import {
  NavigationIconAchievement,
  NavigationIconDashboard,
  NavigationIconHelp,
  NavigationIconHome,
  NavigationIconLearn,
  NavigationIconTools,
} from "@components/icons/NavigationIcons";

type NavigationItem = {
  label: string;
  href: string;
  icon: ReactElement;
};

const items: NavigationItem[] = [
  {
    label: "Home",
    href: "/",
    icon: <NavigationIconHome />,
  },
  {
    label: "Dashboard",
    href: "#",
    icon: <NavigationIconDashboard />,
  },
  {
    label: "Achievement",
    href: "/achievement",
    icon: <NavigationIconAchievement />,
  },
  {
    label: "Learn",
    href: "#",
    icon: <NavigationIconLearn />,
  },
  {
    label: "Tools",
    href: "#",
    icon: <NavigationIconTools />,
  },
  {
    label: "Get Help",
    href: "#",
    icon: <NavigationIconHelp />,
  },
  {
    label: "Tarochi Gold Dex",
    href: "/dex/tarochi/tgold",
    icon: <></>,
  },
];

type Props = {
  showWallet?: boolean;
};

export default function NavigationItems({ showWallet = false }: Props) {
  const location = useLocation();

  return (
    <Stack sx={{ width: "100%", gap: 1, overflowY: "auto" }}>
      {showWallet && <ConnectWallet />}
      {items.map((item) => {
        const isActive = location.pathname === item.href;

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
    </Stack>
  );
}
