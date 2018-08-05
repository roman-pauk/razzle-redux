import React from 'react';
import Route from 'react-router-dom/Route';
import Switch from 'react-router-dom/Switch';
import routes from './routes'
import Header from './components/Dump/Header';
import './App.css';

const App = () => (
  <div>
    <Header />
    <Switch>
      {routes.map(route => (
        <Route key={route.path} {...route} />
      ))}
    </Switch>
  </div>
);

export default App;
