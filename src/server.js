import App from './App';
import React from 'react';
import {
    StaticRouter
} from 'react-router-dom';
import express from 'express';
import {
    renderToString
} from 'react-dom/server';
import {
    Provider
} from 'react-redux';
import configureStore from './store'
import serialize from 'serialize-javascript';
import config from '../config'
import {
    ApolloProvider,
    getDataFromTree
} from 'react-apollo';
import {
    createHttpLink
} from 'apollo-link-http';
import {
    ApolloClient
} from 'apollo-client';
import fetch from 'node-fetch';
import {
    InMemoryCache
} from 'apollo-cache-inmemory';
import pretty from 'pretty'

const uri = config.apollo.networkInterface
const assets = require(process.env.RAZZLE_ASSETS_MANIFEST);

const server = express();
server
    .disable('x-powered-by')
    .use(express.static(process.env.RAZZLE_PUBLIC_DIR))
    .get('/*', async (req, res) => {

        const location = req.url;
        const apolloClient = new ApolloClient({
            ssrMode: true,
            link: createHttpLink({
                uri,
                fetch
            }),
            cache: new InMemoryCache(),
        });
        const context = {};
        let store = configureStore();

        try {
            const InitialView = (
                <Provider store={store}>
                    <ApolloProvider store={store} client={apolloClient}>
                        <StaticRouter location={location} context={context}>
                            <App />
                        </StaticRouter>
                    </ApolloProvider>
                </Provider>
            );

            await getDataFromTree(InitialView);

            let html = ''

            try {
                html = renderToString(InitialView)
            } catch (error) {
                console.log('server rendering error: ', error);
                throw error;
            }

            if (context.url) {
                res.redirect(context.url);
                return
            }

            const preloadedState = serialize(store.getState());
            const preloadedApolloState = serialize(apolloClient.extract());

            return res
                .status(200)
                .set('content-type', 'text/html')
                .send(pretty(
                    `<!doctype html>
                <html lang="">
                <head>
                <meta http-equiv="X-UA-Compatible" content="IE=edge" />
                <meta charset="utf-8" />
                <title>seobul</title>
                <meta name="viewport" content="width=device-width, initial-scale=1">
                ${
                    assets.client.css
                    ? `<link rel="stylesheet" href="${assets.client.css}">`
                    : ''
                }
                </head>
                <body>
                <div id="root">${html}</div>
                <script type="text/javascript">window.__PRELOADED_STATE__ = ${preloadedState}</script>
                <script type="text/javascript">window.__APOLLO_STATE__ = ${preloadedApolloState}</script>
                ${
                    process.env.NODE_ENV === 'production'
                    ? `<script src="${assets.client.js}" defer></script>`
                    : `<script src="${assets.client.js}" defer crossorigin></script>`
                }
                </body>
                </html>`
                ));
        } catch (error) {
            console.log('Internal server error: ', error);
            return res.status(500).end('Internal server error: ', error);
        }
    });

export default server;