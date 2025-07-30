import { Outlet } from "react-router";
import Logo from "../components/logo/Logo";

function RootLayout() {
  return (
    <div className="app">
      <Logo />
      <main className="main">
        <Outlet />
      </main>
    </div>
  );
}

export default RootLayout;
