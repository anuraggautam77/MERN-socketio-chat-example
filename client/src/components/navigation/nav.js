import React, { Component } from "react";
import PubSub from 'pubsub-js';
import { NavLink } from 'react-router-dom';

class NavMenu extends Component {

  constructor(props) {
    super (props);
  }
  ;
   logoutclick() {
    PubSub.publish ('IS_LOGIN', {status: false, token: window.localStorage.getItem ('accessToken')});

  }
  ;
    render() {
    return (
      <nav className="navbar navbar-default">
        <div className="container-fluid">
          <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
            <ul className="nav navbar-nav">
              <li>
              <NavLink to="/home"  exact={true}  activeClassName="active" > 
                <span className="glyphicon glyphicon-home"></span> Home 
              </NavLink>
              </li> 
      
              <li><NavLink to='/profile'><span className="glyphicon glyphicon-user"></span> Profile </NavLink></li>
              <li><NavLink to='/list'><span className="glyphicon glyphicon-th-list"></span> Friends </NavLink></li>
              <li>
                <form className="navbar-form">
                  <div className="form-group">
                    <input type="text" className="form-control" placeholder="Search"/>
                  </div>
                  <button type="button" className="btn btn-default"><span className="glyphicon glyphicon-search"></span> </button>
                </form>
              </li>
      
      
              <li className=" navbar-right" ><NavLink to='/' onClick={this.logoutclick} ><span className="glyphicon glyphicon-th-list"></span> Logout </NavLink></li>
      
            </ul>
      
          </div> 
        </div> 
      </nav>
      )
  }
  ;
}

export default NavMenu;