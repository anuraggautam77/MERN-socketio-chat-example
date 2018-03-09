import React, { Component } from 'react';
import "../style/css/mainpage.scss";
import Profilecard from '../components/profile/profilecard';
import Newfriend from '../components/main/suggestlist';
import UserList from '../components/users/userlist';
import MyPosts from '../components/mypost/myposts';
import Chatwindow from '../components/chatwindow/chatwindow';
class Landing extends Component {

constructor(props) {
super (props);
  this.state = {
  currentuser: window.localStorage.getItem ('userid')
  };
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
    <div className="col-md-8 col-sm-8">
         <MyPosts forall="true"/>
    </div>
    <div className="col-md-4 col-sm-4"> 
      
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
