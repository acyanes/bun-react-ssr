import { renderToReadableStream } from "react-dom/server";
import { Hello, Bye, Pokemon } from "./app";

await Bun.build({
  entrypoints: ["./main.tsx"],
  outdir: "dist",
});

async function fetchPokemonSprite(url: string) {
  const response = await fetch(url);
  const results = await response.json();
  const image_url = results.sprites.front_default;
  return image_url;
}

async function fetchPokemonByName(name: string) {
  const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
  // todo add some checks
  return response.json();
}
async function fetchPokemonById(id: string) {
  const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
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
      const data = await fetchPokemonByName(req.params.name);
      const url = data.forms[0].url;
      const imageUrl = await fetchPokemonSprite(url);

      console.log("fetchPokemonSprite url", imageUrl);
      return new Response(
        await renderToReadableStream(<Pokemon data={data} image={imageUrl} />),
      );
    },
    "/pokemon/:id": async (req) => {
      const data = await fetchPokemonById(req.params.id);
      const url = data.forms[0].url;
      const imageUrl = await fetchPokemonSprite(url);
      console.log("fetchPokemonSprite url", imageUrl);
      return new Response(
        await renderToReadableStream(<Pokemon data={data} image={imageUrl} />),
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
