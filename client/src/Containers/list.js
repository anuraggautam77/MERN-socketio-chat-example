import React, { Component } from 'react'
import   '../style/css/chatwindow.scss';
import UserList from '../components/userlist/userlist';
import Chatwindow from '../components/chatwindow/chatwindow';
  export default class List extends Component {
  render() {
    return (
      <div>
        <main>
          <div className="main__container">
            <div className="left-side"> <UserList/></div>
            <div className="right-side popup-box"><Chatwindow/> </div>
          </div>
        </main>
      
      </div>
      )
  }
}
