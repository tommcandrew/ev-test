import React from "react";
import { useQuery } from "@apollo/client";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CLIENTS from "../../graphql/queries/clients";
import ClientList from "../ClientList";
import Header from "../Header";
import CreateClient from "../CreateClient";
import styles from "./index.module.scss";

const App = () => {
  const { loading, error, data } = useQuery(CLIENTS, {
    onCompleted: () => console.log(data),
  });

  return (
    <div>
      <Header />
      <div className={styles.container}>
        <CreateClient />
        <ClientList loading={loading} error={error} data={data} />
      </div>
      <ToastContainer />
    </div>
  );
};

export default App;
