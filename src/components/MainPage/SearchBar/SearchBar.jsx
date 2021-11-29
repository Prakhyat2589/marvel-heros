import React, { useRef } from "react";
import { MdSearch } from "react-icons/md";
import style from "./SearchBar.module.css";

const SearchBar = ({ searchHeroes }) => {
  const searhValueRef = useRef(null);

  const search = (event) => {
    //When user press Enter key
    if (event.charCode === 13) {
      const text = event.target.value;
      searchHeroes(text);
    }
  };
  const searchOnClick = () => {
    searchHeroes(searhValueRef.current.value);
  };
  return (
    <div className={style.searchBar}>
      <input
        className="form-control mr-sm-2 "
        type="search"
        placeholder="Type hero name and press enter"
        aria-label="Search"
        onKeyPress={search}
        ref={searhValueRef}
      />

      <MdSearch className={style.searchIcon} onClick={searchOnClick} />
    </div>
  );
};

export { SearchBar };
