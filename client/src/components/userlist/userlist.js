import React, { Component } from "react";
import "../../style/css/userlist.scss";
class UserList extends Component {

render() {
return (
<div className="userlist-container">
<div className="row-section">
  <div className="container">
    <div className="col-md-6 offset-md-1 row-block">
      <ul>
        <li><div className="media">
            <div className="media-left align-self-center">
              <img className="rounded-circle" src="https://randomuser.me/api/portraits/women/50.jpg"/>
            </div>
            <div className="media-body">
              <h4>Camila Terry</h4>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation</p>
            </div>
            <div className="media-right align-self-center">
              <a href="#" className="btn btn-default">Contact Now</a>
            </div>
          </div>
        </li>
        <li>
          <div className="media">
            <div className="media-left align-self-center">
              <img className="rounded-circle" src="https://randomuser.me/api/portraits/men/42.jpg"/>
            </div>
            <div className="media-body">
              <h4>Joel Williamson</h4>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation</p>
            </div>
            <div className="media-right align-self-center">
              <a href="#" className="btn btn-default">Contact Now</a>
            </div>
          </div>
        </li>
        <li>
          <div className="media">
            <div className="media-left align-self-center">
              <img className="rounded-circle" src="https://randomuser.me/api/portraits/women/50.jpg"/>
            </div>
            <div className="media-body">
              <h4>Leona Hunter</h4>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation</p>
            </div>
            <div className="media-right align-self-center">
              <a href="#" className="btn btn-default">Contact Now</a>
            </div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</div>
</div>
)
};

};

export default UserList;



