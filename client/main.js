import {Meteor} from 'meteor/meteor';
import ReactDOM from 'react-dom';
import {Tracker} from 'meteor/tracker';
import {Session} from 'meteor/session';

import {routes, onAuthChange} from '../imports/routes/routes';
import {Links} from '../imports/api/links';

import '../imports/startup/simple-schema-configuration.js';

Tracker.autorun( () => {
  const isAuthd = !!Meteor.userId();
  onAuthChange(isAuthd);
});

Meteor.startup( () => {
  Session.set('showVisible', true);
  ReactDOM.render(routes, document.getElementById('app'));
})
