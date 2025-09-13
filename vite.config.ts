import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": "/src",
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ["react", "react-dom"],
          ui: [
            "@radix-ui/react-dialog",
            "@radix-ui/react-select",
            "@radix-ui/react-label",
            "@radix-ui/react-separator",
            "@radix-ui/react-slot",
            "@radix-ui/react-toggle",
          ],
          table: ["@tanstack/react-table"],
          utils: ["clsx", "tailwind-merge", "class-variance-authority"],
        },
      },
    },
  },
});
