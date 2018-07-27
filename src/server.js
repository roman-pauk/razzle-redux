import App from './App';
import React from 'react';
import { StaticRouter } from 'react-router-dom';
import express from 'express';
import { renderToString } from 'react-dom/server';
import { Provider } from 'react-redux';
import configureStore from './store'
import serialize from 'serialize-javascript';

const assets = require(process.env.RAZZLE_ASSETS_MANIFEST);

const server = express();
server
  .disable('x-powered-by')
  .use(express.static(process.env.RAZZLE_PUBLIC_DIR))
  .get('/*', async (req, res) => {
        let context = {data: {remote: {}}, req};
        const store = configureStore(context.data);

        renderToString(
        <Provider store={store}>
            <StaticRouter context={context} location={req.url}>
                <App />
            </StaticRouter>
        </Provider>
        );

        const keys = Object.keys(context.data.remote);
        const promises = keys.map(k=>context.data.remote[k]);
        Promise.all([...promises]).then((results)=>{
            const newData = {remote: Object.assign({}, ...results.map((resp, t) => {return { [keys[t]]: resp }}))};
            const stores = configureStore(newData);
            let markup = renderToString(
        <Provider store={stores}>
          <StaticRouter context={context} location={req.url}>
            <App />
          </StaticRouter>
        </Provider>
      );

      const finalState = store.getState();

    if (context.url) {
      res.redirect(context.url);
    } else {
      res.status(200).send(
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
        ${
          process.env.NODE_ENV === 'production'
            ? `<script src="${assets.client.js}" defer></script>`
            : `<script src="${assets.client.js}" defer crossorigin></script>`
        }
    </head>
    <body>
        <div id="root">${markup}</div>
        <script>
          window.__PRELOADED_STATE__ = ${serialize(finalState)}
        </script>
    </body>
</html>`
      );
    }
}).catch(err => console.log(err));
});

export default server;
