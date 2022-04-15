import React from "react";
import styles from './index.module.scss'

const Search = ({ onChange }) => {
  return (
    <div className={styles.search}>
      <label htmlFor="search">Search:</label>
      <input id="search" type="text" onChange={onChange} />
    </div>
  );
};

export default Search;
