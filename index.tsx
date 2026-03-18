import { renderToReadableStream } from "react-dom/server";
import { Hello, Bye } from "./app";

await Bun.build({
  entrypoints: ["./main.tsx"],
  outdir: "dist",
});

Bun.serve({
  port: 3000,
  routes: {
    "/": async () =>
      new Response(
        await renderToReadableStream(<Hello />, {
          bootstrapModules: ["main.js"],
        }),
      ),
    "/bye": async () => new Response(await renderToReadableStream(<Bye />)),
  },
  async fetch(req) {
    const path = new URL(req.url).pathname;
    if (path === "/main.js") {
      return new Response(Bun.file("dist/main.js"));
    }
    return new Response("Not Found", { status: 404 });
  },
});

console.log("Server running on http://localhost:3000");
