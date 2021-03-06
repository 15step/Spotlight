import * as React from 'react';
import { Switch, Route } from 'react-router-dom';
import Home from './Home';
import About from './About';
import Congress from './Congress';
import Login from '../containers/Login';
import Signup from '../containers/Signup';
import Contact from '../containers/Contact';
import ProfileContainer from '../containers/ProfileContainer';
import PasswordReset from '../containers/PasswordReset';
import NewPassword from '../containers/NewPassword';
import SearchCommittees from '../containers/SearchCommittees';
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
      <AuthenticatedNewPasswordRoute path="/new-password" component={NewPassword} />
      <AuthenticatedContributorSearchRoute path="/search" component={SearchCommittees} />
      <AuthenticatedProfileRoute path="/profile" component={ProfileContainer} />
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

const AuthenticatedNewPasswordRoute = ({component: NewPassword, ...rest}) => {
  return (
    <Route {...rest} render={props => (
      sessionStorage.getItem('jwtToken') ? (
        <NewPassword {...props} />
      ) : (
        <Redirect to={{
          pathname: "/login",
          state: {from: props.location}
        }} />
      )
    )} />  
  )
};

const AuthenticatedContributorSearchRoute = ({component: SearchContributors, ...rest}) => {
  return (
    <Route {...rest} render={props => (
      sessionStorage.getItem('jwtToken') ? (
        <SearchCommittees {...props} />
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
