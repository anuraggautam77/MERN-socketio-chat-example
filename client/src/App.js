import React, {Component} from 'react';
import {Auth} from './common/auth';
import PubSub from 'pubsub-js';
import './style/css/App.scss';

import DashBoard from './components/layout/Dashboard';
import Landing from './components/layout/Landing';

class App extends Component {

  constructor(props) {

    super (props);
    this.state = {
      "isLoggedIn": false
    };
    var auth1 = new Auth ();
    auth1.validateToken ();

    this.mySubscriber = this.mySubscriber.bind (this);
  }
  ;
    mySubscriber(msg, data) {
    this.setState ({
      isLoggedIn: data.status
    });
    window.localStorage.setItem ('accessToken', data.token);
    window.localStorage.setItem ('isLoggedIn', true);
  }
  ;
    componentWillMount() {

    this.isLoggedIn ();
    PubSub.subscribe ('IS_LOGIN', this.mySubscriber);
  }
  ;
    componentWillUpdate() {
    console.log ("statechnage");

  }

  isLoggedIn() {
    var boolFlag = window.localStorage.getItem ('isLoggedIn');
    this.setState ({
      isLoggedIn: (boolFlag !== null) ? JSON.parse (boolFlag) : false
    });
    return true;
  }
  ;
    render() {
    return (this.state.isLoggedIn) ? <DashBoard/> : <Landing/>;
  }

}

export default App;
