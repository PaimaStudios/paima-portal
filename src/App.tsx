import { MuiSetup } from "./MuiSetup";
import Navbar from "./components/common/Navbar";
import { Providers } from "./providers";
import { Link, Outlet, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import { Container, Stack } from "@mui/material";
import "./App.css";
import Dex from "./pages/Dex";
import Sidebar from "@components/common/Sidebar";
import Topbar from "@components/common/Topbar";

export default function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="dex/:game/:asset" element={<Dex />} />

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
        <Stack direction="row">
          <Sidebar />
          <Stack sx={{ width: "100%", mb: 4 }}>
            <Navbar />
            <Topbar />
            <Outlet />
          </Stack>
        </Stack>
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
