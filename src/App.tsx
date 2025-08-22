import "./App.css";
import { RouterProvider } from "react-router";
import router from "./routes";
import { useEffect } from "react";
import { attachGlobalFullscreenListenersOnce } from "./hooks/fullscreenStore";

function App() {
  useEffect(() => {
    attachGlobalFullscreenListenersOnce();
  }, []);
  return <RouterProvider router={router} />;
}

export default App;
