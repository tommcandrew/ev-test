import React from "react";
import { useQuery } from "@apollo/client";
import { CLIENTS } from "./queries.js";
import "./index.css";

const App = () => {
  const { loading, error, data } = useQuery(CLIENTS, {
    onCompleted: () => console.log(data),
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error!</p>;

  return (
    <div>
      <header>
        <div className="clients__title">Client List</div>
      </header>
      <div className="clients__container">
        <table className="clients__table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Company</th>
              <th>Created</th>
            </tr>
          </thead>
          <tbody>
            {data.clients.map((client) => {
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
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default App;
