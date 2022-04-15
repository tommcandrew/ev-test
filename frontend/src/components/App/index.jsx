import React, { useState } from "react";
import { useQuery, useMutation } from "@apollo/client";
import Skeleton from "react-loading-skeleton";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CLIENTS from "../../graphql/queries/clients";
import CREATE_CLIENT from "../../graphql/mutations/createClient.js";
import DELETE_CLIENT from "../../graphql/mutations/deleteClient.js";
import Modal from "../Modal";
import { LOADING_ERROR, NO_DATA } from "../../constants/notificationMessages";
import "react-loading-skeleton/dist/skeleton.css";
import { FaTrashAlt } from "react-icons/fa";
import ConfirmActionButton from "../ConfirmActionButton";
import NewClientForm from "../NewClientForm";
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

  let tableContent;

  if (loading) {
    tableContent = (
      <tr>
        <td colSpan={5}>
          <Skeleton count={5} height={50} />
        </td>
      </tr>
    );
  } else if (error) {
    tableContent = (
      <tr>
        <td colSpan={5} className={styles.message}>
          <span>{LOADING_ERROR}</span>
        </td>
      </tr>
    );
  } else if (!data.clients.length) {
    tableContent = (
      <tr>
        <td colSpan={5} className={styles.message}>
          <span>{NO_DATA}</span>
        </td>
      </tr>
    );
  } else {
    tableContent = data.clients
      .filter((client) =>
        [client.name, client.email, client.company].some((val) =>
          val.toLowerCase().includes(searchText)
        )
      )
      .map((client) => {
        const formattedCreatedDate = new Date(
          Number(client.createdAt)
        ).toLocaleDateString("en-UK");
        return (
          <tr key={client.email} className={styles.row}>
            <td>{client.name}</td>
            <td>{client.email}</td>
            <td>{client.company}</td>
            <td>{formattedCreatedDate}</td>
            <td>
              <ConfirmActionButton
                onConfirm={() => deleteClient({ variables: { id: client.id } })}
                modalTitle="Delete Client"
                modalText={`Are you sure you want to delete ${client.name}?`}
                buttonClassName={styles.delete}
                modalButtonText="Delete"
              >
                <FaTrashAlt color="white" />
              </ConfirmActionButton>
            </td>
          </tr>
        );
      });
  }

  const handleSearch = (e) => {
    setSearchText(e.target.value);
  };

  const handleSaveClient = ({ name, email, company }) => {
    createClient({ variables: { name, email, company } });
  };

  return (
    <div>
      <header>
        <div className={styles.title}>Client List</div>
      </header>
      <div className={styles.container}>
        <div className={styles.buttons}>
          <button className="button" onClick={() => setShowModal(true)}>
            New
          </button>
        </div>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Company</th>
              <th>Created</th>
              <th>
                <div className={styles.search}>
                  <label htmlFor="search">Search:</label>
                  <input id="search" type="text" onChange={handleSearch} />
                </div>
              </th>
            </tr>
          </thead>
          <tbody>{tableContent}</tbody>
        </table>
      </div>
      <Modal
        title="New Client"
        closeModal={() => setShowModal(false)}
        isOpen={showModal}
      >
        <NewClientForm
          handleSaveClient={({ name, email, company }) => handleSaveClient({name, email, company})}
        />
      </Modal>
      <ToastContainer />
    </div>
  );
};

export default App;
