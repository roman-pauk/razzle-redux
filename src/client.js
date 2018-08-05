import App from './App';
import BrowserRouter from 'react-router-dom/BrowserRouter';
import React from 'react';
import { Provider } from 'react-redux';
import configureStore from './store'
import { hydrate } from 'react-dom';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';
import config from '../config'
import { InMemoryCache } from 'apollo-cache-inmemory';

const store = configureStore(window.__PRELOADED_STATE__);
const uri = config.apollo.networkInterface

const client = new ApolloClient({
  uri,
  cache: new InMemoryCache().restore(window.__APOLLO_STATE__)
})

hydrate(
  <Provider store={store}>
    <ApolloProvider client={client}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ApolloProvider>
  </Provider>,
  document.getElementById('root')
);

if (module.hot) {
  module.hot.accept();
}
