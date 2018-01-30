import React, { Component } from "react";
import PubSub from 'pubsub-js';
import "../../style/css/userlist.scss";
class UserList extends Component {

  constructor(props) {
    super (props);

    this.state = {
      userList: []
    };
    this.onchatnowClick = this.onchatnowClick.bind (this);
  }
  componentDidMount() {

    var id = window.localStorage.getItem ('userid');
    fetch (`/api/getuserlist/${id}`, {method: 'get', headers: {'Content-Type': 'application/json'}}
    ).then (res => res.json ()
    ).then (json => {
      if (json.hasOwnProperty ('list')) {
        this.setState ({userList: json.list});
      }
    });

  }
  onchatnowClick(e) {
     PubSub.publish ('TRIGGER_CHAT_ENABLE', {status: true,towhome:e.target.id});
  }

  render() {
    var userList = this.state.userList;
    let listItems = userList.map ((obj) => {
      return(<li key={obj._id} id={obj._id}><div className="media">
          <div className="media-left align-self-center">
            <img className="rounded-circle" src="https://picsum.photos/100/100/?random"/>
          </div>
          <div className="media-body">
            <h4>{obj.firstName} {obj.lastName}</h4>
            <p>Comming soon Text .....</p>
          </div>
          <div className="media-right align-self-center">
            <a href='javascript:void(0)' id={obj._id} key={obj._id}  onClick={this.onchatnowClick} className="btn btn-default">Chat Now</a>
          </div>
        </div>
      </li>)
    });

    return (
      <div className="userlist-container">
        <div className="row-section">
          <div className="container">
            <div className="col-md-5 offset-md-1 row-block">
              <ul>
                {listItems}
              </ul>
            </div>
          </div>
        </div>
      </div>
      );
  }
  ;
}
;

export default UserList;



