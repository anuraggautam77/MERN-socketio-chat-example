import React, { Component } from "react";
class Signup extends Component {

  constructor(props) {
    super (props);
    this.state = {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      loginError: '',
      signupError: ''
    };
    this.handleSignup = this.handleSignup.bind (this);
    
  }

  handleSignup() {
    this.callNewUserApi (this.state);
  }
  
    callNewUserApi(data) {
    fetch ('/api/newuser', {method: 'post', headers: {'Content-Type': 'application/json'}, body: JSON.stringify (data)})
      .then (res => res.json ())
      .then (json => {
        this.serviceHandler (json)
      });
  } ;
    serviceHandler(data) {
    if (data.status === 'success') {
      alert ('store Data');
    }

  }
  
  render() {
    return (<div className="form-box">
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
              </div>);
  }
   
}

export default Signup;



                