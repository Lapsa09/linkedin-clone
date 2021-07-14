import React from "react";
import { Search } from "@material-ui/icons";
import "./searchBar.css";

function SearchBar() {
  return (
    <div className="header__search">
      <Search />
      <input type="text" placeholder="Search" />
    </div>
  );
}

export default SearchBar;
