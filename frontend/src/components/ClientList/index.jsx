import React, { useState } from "react";
import { toast } from "react-toastify";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import DELETE_CLIENT from "../../graphql/mutations/deleteClient.js";
import CLIENTS from "../../graphql/queries/clients";
import { useQuery, useMutation } from "@apollo/client";
import { FaTrashAlt } from "react-icons/fa";
import ConfirmActionButton from "../ConfirmActionButton";
import Search from "../Search";
import { formatUnixTimestamp } from "../../utils/dateUtils";
import TABLE_NOTIFICATIONS, {
  getTableNotificationText,
} from "../../enums/tableNotifications";
import styles from "./index.module.scss";

const ClientList = () => {
  const [searchText, setSearchText] = useState("");

  const handleSearch = (e) => {
    setSearchText(e.target.value);
  };

  const { loading, error, data } = useQuery(CLIENTS);

  const [deleteClient] = useMutation(DELETE_CLIENT, {
    onCompleted: (data) => {
      toast.success(`${data.deleteClient.name} deleted`);
    },
    onError: () => toast.error("Could not delete client"),
    refetchQueries: [
      {
        query: CLIENTS,
      },
    ],
  });

  const getFilteredClients = (clients) => {
    if (searchText) {
      return clients.filter((client) =>
        [client.name, client.email, client.company].some((val) =>
          val.toLowerCase().includes(searchText)
        )
      );
    }
    return clients;
  };

  const getLoadingSkeleton = () => {
    return (
      <tr>
        <td colSpan={5}>
          <Skeleton count={5} height={50} />
        </td>
      </tr>
    );
  };

  const getTableNotification = (notificationCode) => {
    return (
      <tr>
        <td colSpan={5} className={styles.message}>
          <span>{getTableNotificationText(notificationCode)}</span>
        </td>
      </tr>
    );
  };

  let tableContent;

  if (loading) {
    tableContent = getLoadingSkeleton();
  } else if (error) {
    tableContent = getTableNotification(TABLE_NOTIFICATIONS.LOADING_ERROR);
  } else if (!data.clients.length) {
    tableContent = getTableNotification(TABLE_NOTIFICATIONS.NO_DATA);
  } else {
    const filteredClients = getFilteredClients(data.clients);
    tableContent = filteredClients.map((client) => {
      const formattedCreatedAtDate = formatUnixTimestamp(client.createdAt);
      return (
        <tr key={client.email} className={styles.row}>
          <td>{client.name}</td>
          <td>{client.email}</td>
          <td>{client.company}</td>
          <td>{formattedCreatedAtDate}</td>
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
    <>
      <Search onChange={handleSearch} />
      <div className={styles.tableResponsive}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Company</th>
              <th>Created</th>
              <th></th>
            </tr>
          </thead>
          <tbody>{tableContent}</tbody>
        </table>
      </div>
    </>
  );
};

export default ClientList;
