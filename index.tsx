import { renderToReadableStream } from "react-dom/server";
import { Hello, Bye, Pokemon } from "./app";

await Bun.build({
  entrypoints: ["./main.tsx"],
  outdir: "dist",
});

async function fetchPokemon(name: string) {
  const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
  // todo add some checks
  return response.json();
}

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
    "/pokemon/:name": async (req) => {
      const data = await fetchPokemon(req.params.name);
      return new Response(
        await renderToReadableStream(<Pokemon data={data} />),
      );
    },
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
