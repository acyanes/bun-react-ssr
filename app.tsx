import React from "react";

export function App() {
  return (
    <html>
      <head>
        <title>My pokedex</title>
      </head>
      <body>
        <div id="root">App</div>
      </body>
    </html>
  );
}

export function Pokemon({ data, image }: any) {
  const { name, weight } = data;
  return (
    <html>
      <head>
        <title>My pokedex</title>
      </head>
      <body>
        <div id="root">
          <img src={image} />
          <div>name: {name}</div>
          <div>weight: {weight}</div>
        </div>
      </body>
    </html>
  );
}

export function List({ allPokemon }: Array) {
  return (
    <>
      {allPokemon.map((pokemon) => {
        <div key={pokemon}>
          <li>name</li>
          <li>weight</li>
        </div>;
      })}
    </>
  );
}

export function Search() {
  const [search, setSearch] = React.useState("");
  const handleOnChange = (pokemon: string) => {
    setSearch(pokemon);
  };
  return (
    <>
      <input type="text" placeholder="pikachu" onChange={handleOnChange} />
    </>
  );
}
