import React, { Component } from 'react';

import PubSub from 'pubsub-js';
import Profilecard from '../components/profile/profilecard';
import Newfriend from '../components/main/suggestlist';
import UserList from '../components/users/userlist';
import MyPosts from '../components/mypost/myposts';
import Chatwindow from '../components/chatwindow/chatwindow';
class Landing extends Component {

  constructor(props) {
    super (props);
    this.state = {
      currentuser: window.localStorage.getItem ('userid'),
      isnotify: 'dn',
      alertmessage:''
    };
     PubSub.subscribe ('LANDING_MESSGAE', (type,message)=>{
       this.setState({"alertmessage":message,isnotify:'alert alert-success bd'});
     });
  }

  render() {
    return (
      <div className="main-landing row content">
      
        {
          (() => {
            if (this.state.currentuser) {
                return (
                    <div className="landing-page">
                      <div className="col-md-3 col-sm-6 proilecard"> 
                        <Profilecard/>
                        <div className="panel panel-default">
                          <div className="panel-heading">
                            <h5><b>Conversation </b> </h5>
                          </div>
                          <UserList/>
                        </div>
                  
                      </div>
                      <div className="col-md-6 col-sm-6">
                        <div className={` ${this.state.isnotify} `}>
                          <strong>{this.state.alertmessage}</strong>
                        </div>
                        <MyPosts forall="true"/>
                      </div>
                      <div className="col-md-3 col-sm-6 proilecard">
                        <Newfriend/>      
                      </div>
                      <Chatwindow/>
                    </div>
                  );
        }else{
                  return (
                      <div>
                        
                        <div className="col-md-6 col-sm-6"> 
                             <img src="../../img/logo/applogo.PNG"/>
                        </div>
                        
                        <div className="col-md-6 col-sm-6">
                          <MyPosts forall="true"/>
                        </div>
                        
                      </div>

                    );
        }
      
        })()
        }
      
      </div>


          );
  }
}
;

export default Landing;
