import "./App.css";
import { RouterProvider } from "react-router-dom";
import router from "./routes";
import { useEffect } from "react";
import { attachGlobalFullscreenListenersOnce } from "./lib/fullscreen/fullscreenStore";

function App() {
  useEffect(() => {
    attachGlobalFullscreenListenersOnce();
  }, []);
  return <RouterProvider router={router} />;
}

export default App;
