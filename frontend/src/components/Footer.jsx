import React from "react";

export default function Footer() {
  let Current_year = new Date().getFullYear();

  return (
    <footer>
      <p>copyright @ {Current_year}</p>
    </footer>
  );
}
