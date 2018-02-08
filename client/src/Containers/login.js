import React, {Component} from 'react';
import '../style/css/signup.scss';
import Signin from '../components/login/Signin';
import Signup from '../components/login/Signup';
import PubSub from 'pubsub-js';

export default class Login extends Component {

  constructor(props) {
    super (props);
  };
    
    render() {
    return (
      <div className="login-component">
        <div className="container">
          <div className="row">
            <div className="col-sm-5">
                <Signin/>
            </div>
            <div className="col-sm-1 middle-border"></div>
            <div className="col-sm-1"></div>
            <div className="col-sm-5">
                  <Signup/>
            </div>
      
          </div>
        </div>
      </div>
                              )
              }
            }
