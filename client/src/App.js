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
    this.auth = new Auth ();
    this.auth.validateToken (function () {
      //this.props.history.push("/");
    });

    this.mySubscriber = this.mySubscriber.bind (this);
  }

  ;
    mySubscriber(msg, data) {

    if (data.status) {
      window.localStorage.setItem ('accessToken', data.token);
      window.localStorage.setItem ('userid', data.userid);
      window.localStorage.setItem ('isLoggedIn', true);
    } else {
      window.localStorage.removeItem ('accessToken');
      window.localStorage.removeItem ('userid');
      window.localStorage.removeItem ('isLoggedIn');
    }
    
    this.setState ({
      isLoggedIn: data.status
    });
  }
  ;
    componentWillMount() {
    this.isLoggedIn ();
    PubSub.subscribe ('IS_LOGIN', this.mySubscriber);
  }
  ;
    isLoggedIn() {
    var boolFlag = window.localStorage.getItem ('isLoggedIn');
    this.setState ({
      isLoggedIn: (boolFlag !== null && boolFlag !== '') ? JSON.parse (boolFlag) : false
    });
    return true;
  }
  ;
    render() {
    return (this.state.isLoggedIn) ? <DashBoard/> : <Landing/>;
  }

}

export default App;
