import React, { useState } from "react";
import { useQuery, useMutation } from "@apollo/client";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CLIENTS from "../../graphql/queries/clients";
import CREATE_CLIENT from "../../graphql/mutations/createClient.js";
import DELETE_CLIENT from "../../graphql/mutations/deleteClient.js";
import Modal from "../Modal";
import NewClientForm from "../NewClientForm";
import ClientList from "../ClientList";
import Header from "../Header";
import styles from "./index.module.scss";

const App = () => {
  const [showModal, setShowModal] = useState(false);
  const [searchText, setSearchText] = useState("");

  const { loading, error, data } = useQuery(CLIENTS, {
    onCompleted: () => console.log(data),
  });

  const [createClient] = useMutation(CREATE_CLIENT, {
    onError: (err) => toast.error(err.message),
    onCompleted: () => setShowModal(false),
    refetchQueries: [
      {
        query: CLIENTS,
      },
    ],
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

  const handleSaveClient = ({ name, email, company }) => {
    createClient({ variables: { name, email, company } });
  };

  return (
    <div>
      <Header />
      <div className={styles.container}>
        <div className={styles.buttons}>
          <button className="button" onClick={() => setShowModal(true)}>
            New
          </button>
        </div>
        <ClientList
          handleSearch={handleSearch}
          loading={loading}
          error={error}
          data={data}
          searchText={searchText}
          deleteClient={deleteClient}
        />
      </div>
      <Modal
        title="New Client"
        closeModal={() => setShowModal(false)}
        isOpen={showModal}
      >
        <NewClientForm
          handleSaveClient={({ name, email, company }) =>
            handleSaveClient({ name, email, company })
          }
        />
      </Modal>
      <ToastContainer />
    </div>
  );
};

export default App;
