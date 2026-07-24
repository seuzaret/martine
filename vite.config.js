import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// base: './' → le build utilise des chemins relatifs :
// le dossier dist/ fonctionne tel quel sur n'importe quel hébergement
// (mutualisé PHP, GitHub Pages, itch.io…), même dans un sous-dossier.
export default defineConfig({
  plugins: [react()],
  base: "./",
});
