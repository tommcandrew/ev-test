import React from "react";
import { useQuery } from "@apollo/client";
import { CLIENTS } from "./queries.js";

const App = () => {
  const { loading, error, data } = useQuery(CLIENTS, {
    onCompleted: () => console.log(data),
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error!</p>;

  return (
    <div>
      <h1>Client List</h1>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Company</th>
          </tr>
        </thead>
        {data.clients.map((client, i) => <tr key={i}>
          <td>{client.name}</td>
          <td>{client.email}</td>
          <td>{client.company}</td>
        </tr>)}
      </table>
    </div>
  );
};

export default App;
