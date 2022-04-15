import React from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ClientList from "../ClientList";
import Header from "../Header";
import CreateClient from "../CreateClient";
import styles from "./index.module.scss";

const App = () => {
  return (
    <div>
      <Header />
      <div className={styles.container}>
        <CreateClient />
        <ClientList />
      </div>
      <ToastContainer />
    </div>
  );
};

export default App;
