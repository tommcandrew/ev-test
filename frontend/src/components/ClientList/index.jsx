import React from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { LOADING_ERROR, NO_DATA } from "../../constants/notificationMessages";
import { FaTrashAlt } from "react-icons/fa";
import ConfirmActionButton from "../ConfirmActionButton";
import styles from './index.module.scss'

const ClientList = ({ handleSearch, loading, error, data, searchText, deleteClient }) => {
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

  return (
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
  );
};

export default ClientList;
