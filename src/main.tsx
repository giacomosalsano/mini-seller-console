import App from "@/App.tsx";
import "@/core/styles/index.css";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Toaster } from "sonner";

document.documentElement.classList.add("dark");

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
    <Toaster position="top-right" richColors />
  </StrictMode>,
);