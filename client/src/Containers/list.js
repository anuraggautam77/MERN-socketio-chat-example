import React, { Component } from 'react'

import UserList from '../components/userlist/userlist';
import UserProfile from '../components/profile/index';
import Chatwindow from '../components/chatwindow/chatwindow';
export default class List extends Component {
  render() {
    return (
      <div>
        <div className="row">
          <div className="col-md-4">
            <div className="panel panel-default"> 
                 <UserList/>
            </div>
          </div> 
          <div className="col-md-8">
                <UserProfile/>
          </div>	
        </div> 
              <Chatwindow/> 
      </div>
      )
  }
}
