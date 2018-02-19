import React, { Component } from "react";
import 'whatwg-fetch';

class Signin extends Component {

  constructor(props) {
    super (props);
    this.state = {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      //  username: 'anurag@gmail.com',
      // loginpass: '1234567890',
      username: '',
      loginpass: '',
      loginError: '',
      signupError: ''
    };

    this.handleSignIn = this.handleSignIn.bind (this);
  }

  handleSignIn() {

    if (this.state.username !== '' && this.state.loginpass !== '') {
      this.callSignInApi (this.state);
    } else {
      alert ("Please Enter Login Information ");

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
      PubSub.publish ('IS_LOGIN', {status: true, token: data.accesstoken, userid: data.userid});
    } else {
      alert (data.message);
    }

  }

  render() {
    return (
      <div className="col-md-12">
        
          <div className="form-top-left">
            <h3>Login </h3>
            <p>Enter username and password to log on:</p>
          </div>
      
          <div className="form-group">
            <input  type="text" name="form-username" value ={this.state.username} placeholder="Username..."  
                    className="form-control" onChange={(event) => {
          this.setState ({username: event.target.value})}} />
          </div>
          <div className="form-group">
            <input type="password" name="form-password"   
                   value ={
            this.state.loginpass}   
                   onChange={(event) => {
              this.setState ({loginpass: event.target.value})}}
                   placeholder="Password..." className="form-control" id="form-password"/>
          </div>
          <div>
            <input onClick={
                this.handleSignIn} className="btn  btn-transparent" value="Sign in!" type="button"/>
          </div>	
          <div className="new-acount">
            <p>Don't Have an account? &nbsp; &nbsp; <a href="jascsript:void(0)" onClick={()=>this.props.statechange('signin')}> SIGN UP</a></p>
          </div>
       
      </div>

              );
      }
      ;
    }

    export default Signin;



                