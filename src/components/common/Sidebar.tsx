import { Link } from "react-router-dom";

import NavigationItems from "./NavigationItems";
import PaimaFootnotes from "@components/PaimaFootnotes";

export default function Sidebar() {
  return (
    <div className="flex flex-col justify-between gap-4 px-3 laptop:px-5 pt-3 pb-12 min-h-full">
      <Link to="/">
        <img src="/paima-logo.svg" alt="Paima Logo" />
      </Link>
      <div className="grow flex flex-col">
        <NavigationItems />
      </div>
      <div>
        <PaimaFootnotes />
      </div>
    </div>
  );
}
