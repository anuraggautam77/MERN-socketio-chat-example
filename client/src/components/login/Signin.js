import React, { Component } from "react";
class Signin extends Component {

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
    
    this.handleSignIn = this.handleSignIn.bind (this);
  }

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


  }
  
  serviceSignInHandler(data) {

    if (data.status === 'success') {
      PubSub.publish ('IS_LOGIN', {status: true, token: data.accesstoken,userid:data.userid});
    } else {
      alert (data.message);
    }

  }
  
  
  render() {
    return (
      <div>
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
      
      );
  }
  ;
}

export default Signin;



                