import React, {Component} from 'react';
import '../style/css/signup.scss';
import PubSub from 'pubsub-js';

export default class Login extends Component {

  constructor(props) {
    super (props);
    this.state = {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      username: 'anurag@gmail.com',
      loginpass: '1234567890',
      loginError: '',
      signupError: ''
    };
    this.handleSignup = this.handleSignup.bind (this);
    this.handleSignIn = this.handleSignIn.bind (this);
  }

  handleSignup() {
    this.callNewUserApi (this.state);
  };
  
  handleSignIn() {

    if (this.state.username !== '' && this.state.loginpass !== '') {
      this.callSignInApi (this.state);
    } else {
      alert ("Please Enter Login Information ")

    }
  }

  callSignInApi(data) {

    fetch ('/api/singin', {
      method: 'post',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify (data)
    }
    ).then (res => res.json ()).then (json => {
      this.serviceSignInHandler (json)
    });


  };
    callNewUserApi(data) {
    fetch ('/api/newuser', {method: 'post', headers: {'Content-Type': 'application/json'}, body: JSON.stringify (data)})
      .then (res => res.json ())
      .then (json => {
        this.serviceHandler (json)
      });
  };
    serviceHandler(data) {
    if (data.status === 'success') {
      alert ('store Data');
    }

  };
  
  
  serviceSignInHandler(data){
    
    if (data.status === 'success') {
        PubSub.publish('IS_LOGIN', {status: true, token:data.accesstoken});
      // navigation to dashboard
    }else{
      alert(data.message);
    }
    
  };
 
 render() {
    return (
      <div className="login-component">
        <div className="container">
          <div className="row">
            <div className="col-sm-5">
              <div className="form-box">
      
                <div className="form-top">
                  <div className="form-top-left">
                    <h3>Login </h3>
                    <p>Enter username and password to log on:</p>
                  </div>
                  <div className="form-top-right">
                    <i className="fa fa-key"></i>
                  </div>
                </div>
      
                <div className="form-bottom">
                  <form role="form" action="" method="post" className="login-form">
                    <div className="form-group">
                      <label className="sr-only"  >Username</label>
                      <input type="text" name="form-username"
                             value ={this.state.username}   onChange={(event) => {
          this.setState ({username: event.target.value})}}
                             placeholder="Username..."   className="form-username form-control" id="form-username"/>
      
                    </div>
                    <div className="form-group">
                      <label className="sr-only"  >Password</label>
                      <input type="password" name="form-password" 
                             value ={
            this.state.loginpass}   onChange={(event) => {
              this.setState ({loginpass: event.target.value})}}
                             placeholder="Password..."  className="form-password form-control" id="form-password"/>
                    </div>
                    <button type="button" onClick={
                this.handleSignIn} className="btn btn-link-1">Sign in!</button>
                  </form>
                </div>
              </div>
      
              <div className="social-login">
                <h3>...or login with:</h3>
                <div className="social-login-buttons">
                  <a className="btn btn-link-1 btn-link-1-facebook" href="#">
                    <i className="fa fa-facebook"></i> Facebook
                  </a>
                  <a className="btn btn-link-1 btn-link-1-twitter" href="#">
                    <i className="fa fa-twitter"></i> Twitter
                  </a>
                  <a className="btn btn-link-1 btn-link-1-google-plus" href="#">
                    <i className="fa fa-google-plus"></i> Google Plus
                  </a>
                </div>
              </div>  
            </div>
      
            <div className="col-sm-1 middle-border"></div>
            <div className="col-sm-1"></div>
      
            <div className="col-sm-5">
      
              <div className="form-box">
                <div className="form-top">
                  <div className="form-top-left">
                    <h3>Sign up now</h3>
                    <p>Fill in the form below to get instant access:</p>
                  </div>
                  <div className="form-top-right">
                    <i className="fa fa-pencil"></i>
                  </div>
                </div>
                <div className="form-bottom">
                  <form role="form"  className="registration-form">
                    <div className="form-group">
                      <label className="sr-only" >First name</label>
                      <input type="text" name="form-first-name"  value ={this.state.firstName}   onChange={(event) => {
                  this.setState ({firstName: event.target.value})}} placeholder="First name..." className="form-first-name form-control" id="form-first-name"/>
                    </div>
                    <div className="form-group">
                      <label className="sr-only" >Last name</label>
                      <input type="text"  value ={
                    this.state.lastName}   onChange={(event) => {
                      this.setState ({lastName: event.target.value})}}  name="form-last-name" placeholder="Last name..." className="form-last-name form-control" id="form-last-name"/>
                    </div>
                    <div className="form-group">
                      <label className="sr-only"  >Email</label>
                      <input type="text" name="form-email"  value ={
                        this.state.email}  onChange={(event) => {
                          this.setState ({email: event.target.value})}} placeholder="Email..." className="form-email form-control" id="form-email"/>
                    </div>
                    <div className="form-group">
                      <label className="sr-only"  >Password</label>
                      <input type="Password" name="form-password" 
                             value={
                            this.state.password}
                             onChange={(event) => {
                              this.setState ({password: event.target.value})}}
                             placeholder="Password..." className="form-email form-control" 
                             id="form-signup-password"/>
                    </div>
      
                    <button type="button" onClick={
                                this.handleSignup} className="btn">Sign me up!</button>
                  </form>
                </div>
              </div>
      
            </div>
      
          </div>
        </div>
      </div>
                              )
              }
            }
