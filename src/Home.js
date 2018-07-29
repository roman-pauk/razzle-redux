import React from 'react';
import logo from './react.svg';
import './Home.css';
import Test from './components/Test'

class Home extends React.Component {
  render() {
    return (
      <div className="Home">
        <div className="Home-header">
          <img src={logo} className="Home-logo" alt="logo" />
          <h2>Welcome to Razzle</h2>
        </div>
        <Test />
      </div>
    );
  }
}

export default Home;
