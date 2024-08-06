import { Link, Outlet, Route, Routes } from "react-router-dom";

import env from "@config/env";
import { MuiSetup } from "./MuiSetup";
import { Providers } from "./providers";
import HomePage from "./pages/HomePage";
import { Container, Stack } from "@mui/material";
import "./App.css";
import Dex from "./pages/Dex";
import Sidebar from "@components/common/Sidebar";
import Topbar from "@components/common/Topbar";
import Achievement from "@pages/Achievement";
import Games from "@pages/Games";
import Launchpads from "@pages/Launchpads";
import Launchpad from "@pages/Launchpad";
import LaunchpadDetail from "@pages/LaunchpadDetail";

export default function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="dex/:game/:asset" element={<Dex />} />
          <Route path="achievement" element={<Achievement />} />
          <Route path="games" element={<Games />} />
          {env.REACT_APP_ENABLE_LAUNCHPAD && (
            <>
              <Route path="launchpad" element={<Launchpads />} />
              <Route path="launchpad/:launchpad" element={<Launchpad />} />
              <Route
                path="launchpad/:launchpad/buy"
                element={<LaunchpadDetail />}
              />
            </>
          )}
          {/* Using path="*"" means "match anything", so this route
                acts like a catch-all for URLs that we don't have explicit
                routes for. */}
          <Route path="*" element={<NoMatch />} />
        </Route>
      </Routes>
    </>
  );
}

function Layout() {
  return (
    <MuiSetup>
      <Providers>
        <div className="flex flex-col tablet:flex-row min-h-screen">
          <div className="flex-1 max-w-[180px] laptop:max-w-[268px] min-h-screen hidden tablet:block">
            <Sidebar />
          </div>
          <div className="flex-1 flex flex-col min-h-screen tablet:w-[calc(100vw-180px)] laptop:w-[calc(100vw-268px)]">
            {/* <Navbar /> */}
            <Topbar />
            <div className="overflow-y-auto flex-1">
              <Outlet />
            </div>
          </div>
        </div>
      </Providers>
    </MuiSetup>
  );
}

function NoMatch() {
  return (
    <Container>
      <Stack sx={{ alignItems: "center" }}>
        <h2>Nothing to see here!</h2>
        <p>
          <Link to="/">Go to the home page</Link>
        </p>
      </Stack>
    </Container>
  );
}
