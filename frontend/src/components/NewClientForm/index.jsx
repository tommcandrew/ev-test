import React, { useState } from "react";
import styles from "./index.module.scss";

const NewClientForm = ({ handleSaveClient }) => {
  const [name, setName] = useState(null);
  const [email, setEmail] = useState(null);
  const [company, setCompany] = useState(null);

  const handleChangeName = (e) => {
    setName(e.target.value);
  };
  const handleChangeEmail = (e) => {
    setEmail(e.target.value);
  };
  const handleChangeCompany = (e) => {
    setCompany(e.target.value);
  };

  return (
    <form>
      <div className={styles.group}>
        <label className={styles.label} htmlFor="name">
          Name
        </label>
        <input
          className={styles.input}
          type="text"
          id="name"
          onChange={handleChangeName}
        />
      </div>
      <div className={styles.group}>
        <label className={styles.label} htmlFor="email">
          Email
        </label>
        <input
          className={styles.input}
          type="text"
          id="email"
          onChange={handleChangeEmail}
        />
      </div>
      <div className={styles.group}>
        <label className={styles.label} htmlFor="company">
          Company
        </label>
        <input
          className={styles.input}
          type="text"
          id="company"
          onChange={handleChangeCompany}
        />
      </div>
      <div className={styles.footer}>
        <button className="button" onClick={() => handleSaveClient({name, email, company})} type="button">
          Save
        </button>
      </div>
    </form>
  );
};

export default NewClientForm;
