import React from "react";
import MenuLeft from "./MenuLeft/index";
import Header from "./Header/index";

Drawer.propTypes = {};

export function Drawer(props) {
  return (
    <div>
      <MenuLeft />
      <Header />
    </div>
  );
}
