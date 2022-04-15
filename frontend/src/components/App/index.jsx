import React from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ClientList from "../ClientList";
import Header from "../Header";
import CreateClient from "../CreateClient";
import styles from "./index.module.scss";

const App = () => {
  return (
    <>
      <Header />
      <div className={styles.content}>
        <CreateClient />
        <ClientList />
      </div>
      <ToastContainer hideProgressBar position="top-center" autoClose={1000} />
    </>
  );
};

export default App;
