import { Outlet } from "react-router";
import Header from "../components/header/Header";

function RootLayout() {
  return (
    <div className="app">
      <Header />
      <main className="main">
        <div className="container">
          <Outlet />
        </div>
      </main>
    </div>
  );
}

export default RootLayout;
