import React from "react";
import { FaSearch } from "react-icons/fa";
import { PiFunnel } from "react-icons/pi";
// import "../searchBar/SearchBar.css";
import { SearchBarWrap } from "./SearchBar.styles";

const SearchBar = ({ setFilter }) => {
  // { searchTerm, setSearchTerm, filter, setFilter }
  const [searchTerm, setSearchTerm] = React.useState();
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    setFilter(e.target.value);
  };

  return (
    <SearchBarWrap>
      <div className="searchBar-batchSearch">
        <FaSearch className="searchBar-searchIcon" />
        <input
          type="search"
          name="search"
          id="searchBar-search"
          placeholder={placeholderText||"Type to search"}
          value={searchTerm}
          onChange={handleSearchChange}
        />
        <PiFunnel className="searchBar-FunnelIcon" />
      </div>
    </SearchBarWrap>
  );
};

export default SearchBar;
