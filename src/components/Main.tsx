import * as React from 'react';
import { Switch, Route } from 'react-router-dom';
import Home from './Home';
import About from './About';
import Congress from './Congress';

const Main = () => (
  <main>
    <Switch>
      <Route exact={true} path="/" component={Home}/>
      <Route path="/about" component={About}/>
      <Route path="/congress" component={Congress}/>
      <Route path="/login" component={Login}/>
      <Route path="/signup" component={Signup}/>
    </Switch>
  </main>
);

export default Main;
