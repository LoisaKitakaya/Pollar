import React from 'react';
import ReactDOM from 'react-dom/client';
import reportWebVitals from './reportWebVitals';

import { BrowserRouter } from 'react-router-dom';
import { MantineProvider } from "@mantine/core";
import { setContext } from "@apollo/client/link/context";
import {
  ApolloClient,
  InMemoryCache,
  createHttpLink,
  ApolloProvider,
} from "@apollo/client";

import App from './App';

import './index.css';

const httpLink = createHttpLink({
  uri: "http://127.0.0.1:8000/graphql/",
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem("token");
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <BrowserRouter>
        <MantineProvider
          withGlobalStyles
          withNormalizeCSS
          theme={{
            fontFamily: "Raleway, sans-serif",
            fontFamilyMonospace: "Monaco, Courier, monospace",
            headings: { fontFamily: "Greycliff CF, sans-serif" },
          }}
        >
          <App />
        </MantineProvider>
      </BrowserRouter>
    </ApolloProvider>
  </React.StrictMode>
);

reportWebVitals();
