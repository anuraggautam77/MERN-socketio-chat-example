import React, {Component} from 'react';
import { withRouter } from "react-router-dom";
import {Auth} from './common/auth';
import PubSub from 'pubsub-js';
import './style/css/App.scss';
import Routing from './router/router';


class App extends Component {

  constructor(props) {
    super (props);

    this.state = {
      "isLoggedIn": window.localStorage.getItem ('isLoggedIn')
    };
    this.auth = new Auth ();
    this.auth.validateToken (() => {
    
    });

    this.mySubscriber = this.mySubscriber.bind (this);
    PubSub.subscribe ('IS_LOGIN', this.mySubscriber);

  }

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
    
    this.isLoggedIn (data);
  
  }


  isLoggedIn(data) {

    var boolFlag = window.localStorage.getItem ('isLoggedIn');
    if(data.hasOwnProperty ('callback')){
      // redirecting to another page 
      data.callback();
    }
    
    
    this.setState ({
      isLoggedIn: (boolFlag !== null && boolFlag !== '') ? JSON.parse (boolFlag) : false
    });

  }
  ;
    render() {
      
    return (
      <div>
        <Routing islogin={this.state.isLoggedIn} />
      </div>);
  }
}

export default withRouter (App);
