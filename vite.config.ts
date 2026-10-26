import tailwindcss from "@tailwindcss/vite";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import react from "@vitejs/plugin-react";
import { nitro } from "nitro/vite";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

const isGitHubPagesBuild = process.env.GITHUB_PAGES === "true";

export default defineConfig((env) => ({
  base: isGitHubPagesBuild ? "/hire-horizon-insights/" : "/",
  plugins: [
    tailwindcss(),
    tsconfigPaths({ projects: ["./tsconfig.json"] }),
    tanstackStart({
      importProtection: {
        behavior: "error",
        client: {
          files: ["**/server/**"],
          specifiers: ["server-only"],
        },
      },
      server: { entry: "server" },
      prerender: { enabled: isGitHubPagesBuild },
    }),
    ...(!isGitHubPagesBuild ? [nitro({ defaultPreset: "cloudflare-module" })] : []),
    react(),
  ],
  resolve: {
    alias: { "@": `${process.cwd()}/src` },
    dedupe: [
      "react",
      "react-dom",
      "react/jsx-runtime",
      "react/jsx-dev-runtime",
      "@tanstack/react-query",
      "@tanstack/query-core",
    ],
  },
  optimizeDeps: {
    include: [
      "react",
      "react-dom",
      "react-dom/client",
      "react/jsx-runtime",
      "react/jsx-dev-runtime",
      "recharts",
      "lucide-react",
      "@radix-ui/react-switch",
      "@radix-ui/react-slot",
    ],
    ignoreOutdatedRequests: true,
  },
  ...(env.isPreview && process.env.TSS_PRERENDERING === "true"
    ? { preview: { host: "127.0.0.1", port: 0 } }
    : {}),
}));
