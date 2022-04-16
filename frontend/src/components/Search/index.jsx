import React from "react";
import PropTypes from "prop-types";
import styles from "./index.module.scss";

const Search = ({ onChange }) => {
  return (
    <div className={styles.search}>
      <label htmlFor="search">Search:</label>
      <input id="search" type="text" onChange={onChange} />
    </div>
  );
};

Search.PropTypes = {
  onChange: PropTypes.func,
};

export default Search;
