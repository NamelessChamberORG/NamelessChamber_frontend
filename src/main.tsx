import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import ToastProvider from "./contexts/ToastProvider.tsx";
import ToastContainer from "./components/toast/ToastContainer.tsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <ToastProvider>
        <App />
        <ToastContainer />
      </ToastProvider>
    </QueryClientProvider>
  </StrictMode>
);
