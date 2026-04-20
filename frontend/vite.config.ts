import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import tailwindcss from "@tailwindcss/vite";
import path from "path";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      components: `${path.resolve(__dirname, "./src/components")}`,
      config: `${path.resolve(__dirname, "./src/config")}`,
      dataservices: `${path.resolve(__dirname, "./src/dataservices")}`,
      helpers: `${path.resolve(__dirname, "./src/helpers")}`,
      hooks: `${path.resolve(__dirname, "./src/hooks")}`,
      init: `${path.resolve(__dirname, "./src/init")}`,
      layouts: `${path.resolve(__dirname, "./src/layouts")}`,
      pages: `${path.resolve(__dirname, "./src/pages")}`,
      themes: `${path.resolve(__dirname, "./src/themes")}`,
      types: `${path.resolve(__dirname, "./src/types")}`,
      viewports: `${path.resolve(__dirname, "./src/viewports")}`,
    },
  },
});
