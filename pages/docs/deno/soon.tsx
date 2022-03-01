import React from "react";

export default function Artworks() {
  return (
    <div className="artworks">
      <p>
        <img className="md" src="/logo.svg" />
      </p>
      <h3>
        Deno API was developed privately for Maid's developers usage...
      </h3>
    </div>
  );
}

Artworks.meta = {
  title: "Deno",
  author: "UwUssimo",
  date: "2020-10-20",
  editable: false,
};
