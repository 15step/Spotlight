import * as React from 'react';
import './App.css';
import NavigationBar  from './components/NavigationBar';
import Main from './components/Main';


class App extends React.Component {
  render() {
    return (
      <div>
        <NavigationBar />
        <Main />
      </div>
    );
  }
}

export default App;
