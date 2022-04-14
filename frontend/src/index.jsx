import React from "react";
import { createRoot } from "react-dom/client";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import App from "./components/App";

const container = document.getElementById("root");
const root = createRoot(container);

const client = new ApolloClient({
  uri: "http://localhost:3001/graphql",
  cache: new InMemoryCache(),
});

const jsx = (
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>
);

root.render(jsx);
