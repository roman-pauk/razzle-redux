import App from './App';
import BrowserRouter from 'react-router-dom/BrowserRouter';
import React from 'react';
import { Provider } from 'react-redux';
import configureStore from './store'
import { hydrate } from 'react-dom';
import { ApolloClient } from 'apollo-client';
import { ApolloProvider } from 'react-apollo';
import config from '../config'
import { createHttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';

const store = configureStore(window.__PRELOADED_STATE__);
const uri = config.apollo.networkInterface
const link = createHttpLink({ uri });

const isDevEnv = process.env.NODE_ENV !== 'production';

const client = new ApolloClient({
  cache: new InMemoryCache().restore(window.__APOLLO_STATE__),
  link,
  connectToDevTools: isDevEnv,
  queryDeduplication: true,
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
