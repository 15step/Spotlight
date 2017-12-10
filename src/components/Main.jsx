import * as React from 'react';
import { Switch, Route } from 'react-router-dom';
import Home from './Home';
import About from './About';
import Congress from './Congress';
import Login from '../containers/Login';
import Signup from '../containers/Signup';
import Contact from '../containers/Contact';
import Profile from '../containers/Profile';
import PasswordReset from '../components/PasswordReset';
import { Redirect } from 'react-router'

const Main = () => (
  <main>
    <Switch>
      <Route exact={true} path="/" component={Home}/>
      <Route path="/about" component={About}/>
      <Route path="/contact" component={Contact}/>
      <Route path="/congress" component={Congress}/>
      <Route path="/login" component={Login}/>
      <Route path="/signup" component={Signup}/>
      <Route path="/logout" component={Home}/>
      <Route path="/password-reset" component={PasswordReset}/>
      <AuthenticatedProfileRoute path="/profile" component={Profile} />
    </Switch>
  </main>
);

const AuthenticatedProfileRoute = ({component: Profile, ...rest}) => {
  return (
    <Route {...rest} render={props => (
      sessionStorage.getItem('jwtToken') ? (
        <Profile {...props} />
      ) : (
        <Redirect to={{
          pathname: "/login",
          state: {from: props.location}
        }} />
      )
    )} />  
  )
};


export default Main;
