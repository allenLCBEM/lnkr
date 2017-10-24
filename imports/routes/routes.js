import {Meteor} from 'meteor/meteor';
import React from 'react';
import {Router, Route, Switch} from 'react-router-dom';
import { createBrowserHistory } from 'history';

import Login from '../ui/Login';
import Signup from '../ui/Signup';
import Links from '../ui/Links';
import NotFound from '../ui/NotFound';

const browserHistory = createBrowserHistory();

const unAuthPages = ['/', '/signup'];
const authPages = ['/links'];
const onEnterPublicPage = () => {
    if(Meteor.userId()){
      browserHistory.replace('/links');
    }
};
const onEnterPrivatePage = () => {
    if(!Meteor.userId()){
      browserHistory.replace('/');
    }
};

export const onAuthChange = (isAuthd) => {
  const pathname = browserHistory.location.pathname;
  const isUnAuthPage = unAuthPages.includes(pathname);
  const isAuthPage = authPages.includes(pathname);

  if(isAuthd && isUnAuthPage){
    browserHistory.replace('/links');
  } else if(!isAuthd && isAuthPage){
    browserHistory.replace('/');
  }
}

export const routes = (
    <Router history={browserHistory}>
      <Switch>
        <Route exact path="/" exact component={Login} onEnter={onEnterPublicPage} />
        <Route path="/signup" component={Signup} onEnter={onEnterPublicPage} />
        <Route path="/links" component={Links} onEnter={onEnterPrivatePage} />
        <Route path="*" component={NotFound}/>
      </Switch>
    </Router>
);
