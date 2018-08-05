// @flow

// #region imports
import { createStore, applyMiddleware } from 'redux';
import { createLogger } from 'redux-logger';
// import { routerMiddleware } from 'react-router-redux';
// #region import createHistory from hashHistory or BrowserHistory:
// import createHistory from 'history/createHashHistory';
// import createHistory from 'history/createBrowserHistory';
// #endregion
import thunkMiddleware from 'redux-thunk';
import reducer from '../reducers/rootReducer';
import { composeWithDevTools } from 'redux-devtools-extension';
// #endregion

const loggerMiddleware = createLogger({
  level: 'info',
  collapsed: true,
});

// export const history = createHistory();

// createStore : enhancer
const enhancer = composeWithDevTools(
  applyMiddleware(thunkMiddleware, /*routerMiddleware(history),*/ loggerMiddleware),
);

// export default = "redux store"
export default function configureStore(initialState) {
  const store = createStore(reducer, initialState, enhancer);
  if (module.hot) {
    module.hot.accept('../reducers/rootReducer', () =>
      store.replaceReducer(require('../reducers/rootReducer').default),
    );
  }
  return store;
}
