import { defineConfig } from "umi";

export default defineConfig({
  routes: [
    { path: "/", component: "index" },
    { path: "/docs", component: "docs" },
    { path: "/class", component: "class" },
    { path: "/memo", component: "memo" },
  ],
  npmClient: "pnpm",
});
