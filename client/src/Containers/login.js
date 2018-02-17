import React, {Component} from 'react';
import '../style/css/signup.scss';
import Signin from '../components/login/Signin';
import Signup from '../components/login/Signup';
import PubSub from 'pubsub-js';

export default class Login extends Component {

  constructor(props) {
    super (props);
    this.state={
      signup:'hidden',
      signin:''
    }
    
    this.statechange= this.statechange.bind(this);
  };
 
 statechange(flag){
   if(flag==='signin'){
     this.setState({ 'signup':'', 'signin':'hidden' })
   }else{
      this.setState({ 'signup':'hidden', 'signin':'' })
   }
   
 };
 
 
    render() {
      console.log(this.state);
    return (
      <div>
        <div className="login-component">
          <section  className="contact-us section-bg">
              <div className="block">
              <div className="row">
                <div className="col-md-6">
                  <div className="col-md-12">
                     <img className="img-fluid" src="img/bg/login.jpg" alt="desk-image"/>
                  </div>
                </div>
                <div className="col-md-6">    
                <div className={this.state.signin}><Signin statechange={this.statechange} /></div>    
                <div className={this.state.signup}><Signup statechange={this.statechange} /></div>
                </div>
              </div>  
            </div> 
          </section>
        </div>
      </div>

      )
  }
}
