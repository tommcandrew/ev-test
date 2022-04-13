import React from "react";
import { useQuery } from "@apollo/client";
import Skeleton from 'react-loading-skeleton'
import { CLIENTS } from "./queries.js";
import Modal from '../Modal'
import "../../styles/index.css";
import 'react-loading-skeleton/dist/skeleton.css'

const App = () => {
  const { loading, error, data } = useQuery(CLIENTS, {
    onCompleted: () => console.log(data),
  });

  let tableContent;

  if (loading) {
    tableContent = <Skeleton count={5} height={50} />;
  } else if (error) {
    tableContent = <span>The data could not be loaded.</span>;
  } else {
    tableContent = data.clients.map((client) => {
      const formattedCreatedDate = new Date(
        Number(client.createdAt)
      ).toLocaleDateString("en-UK");
      return (
        <tr key={client.email} className="clients__row">
          <td>{client.name}</td>
          <td>{client.email}</td>
          <td>{client.company}</td>
          <td>{formattedCreatedDate}</td>
        </tr>
      );
    });
  }

  return (
    <div>
      <header>
        <div className="clients__title">Client List</div>
      </header>
      <div className="clients__container">
        <div className="clients__buttons">
          <button>New</button>
        </div>
        <table className="clients__table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Company</th>
              <th>Created</th>
            </tr>
          </thead>
          <tbody>{tableContent}</tbody>
        </table>
      </div>
      <Modal />
    </div>
  );
};

export default App;