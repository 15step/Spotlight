import * as React from 'react';
import './App.css';
import NavigationBar  from './components/Header';
// import { Home } from './containers/Home';

const logo = require('./logo.svg');

class App extends React.Component {
  render() {
    return (
      <div className="App">
      <NavigationBar />
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React</h2>
        </div>
        <p className="App-intro">
          To get started, edit <code>src/App.tsx</code> and save to reload.
        </p>
      </div>
    );
  }
}

export default App;
