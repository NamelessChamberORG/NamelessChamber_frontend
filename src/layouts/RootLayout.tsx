import { Outlet } from "react-router";
import Logo from "../components/logo/Logo";

function RootLayout() {
  return (
    <div>
      <Logo />
      <main>
        <Outlet />
      </main>
    </div>
  );
}

export default RootLayout;
