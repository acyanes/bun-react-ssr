import React from "react";

export function Hello() {
  const [name, setName] = React.useState("World");
  return (
    <html>
      <head>
        <title>My Bun App</title>
      </head>
      <body>
        <div id="root">
          <h1>Hello, {name}!</h1>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <p>Type your name above!</p>
        </div>
      </body>
    </html>
  );
}
export function Bye() {
  return <h1>Goodbye!</h1>;
}
