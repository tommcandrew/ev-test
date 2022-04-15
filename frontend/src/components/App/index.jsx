import React, { useState } from "react";
import { useQuery, useMutation } from "@apollo/client";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CLIENTS from "../../graphql/queries/clients";
import DELETE_CLIENT from "../../graphql/mutations/deleteClient.js";
import ClientList from "../ClientList";
import Header from "../Header";
import CreateClient from "../CreateClient";
import styles from "./index.module.scss";

const App = () => {
  const [searchText, setSearchText] = useState("");

  const { loading, error, data } = useQuery(CLIENTS, {
    onCompleted: () => console.log(data),
  });


  const [deleteClient] = useMutation(DELETE_CLIENT, {
    refetchQueries: [
      {
        query: CLIENTS,
      },
    ],
  });

  const handleSearch = (e) => {
    setSearchText(e.target.value);
  };

  return (
    <div>
      <Header />
      <div className={styles.container}>
        <CreateClient />
        <ClientList
          handleSearch={handleSearch}
          loading={loading}
          error={error}
          data={data}
          searchText={searchText}
          deleteClient={deleteClient}
        />
      </div>
      <ToastContainer />
    </div>
  );
};

export default App;
