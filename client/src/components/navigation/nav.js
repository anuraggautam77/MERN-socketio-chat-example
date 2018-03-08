import React, { Component } from "react";
import PubSub from 'pubsub-js';
import { NavLink ,withRouter } from 'react-router-dom';

class NavMenu extends Component {

  constructor(props) {
    super (props);
    this.logoutclick= this.logoutclick.bind(this);
    
  };
    logoutclick() {
      PubSub.publish ('IS_LOGIN', {status: false, token: window.localStorage.getItem ('accessToken'),callback:()=>{
           this.props.history.push ("/login");
      }}); 
  }
  ;
    render() {
    return (
      <nav className="navbar navbar-default">
        <div className="container-fluid">
          <div className="navbar-collapse">
            {(()=>{
               if( this.props.islogin){
              return (
                <ul className="nav navbar-nav">
              {
              /*<li>
              <NavLink to="/home" activeClassName="active" >
                <span className="glyphicon glyphicon-home"></span> Home
              </NavLink>
              </li>
              */}
              <li>
              <NavLink to="/main" activeClassName="active" >
                <span className="glyphicon glyphicon-home"></span> Home
              </NavLink>
              </li>

               <li>
                  <NavLink to='/profile' activeClassName="active" >
                    <span className="glyphicon glyphicon-user"></span> Profile 
                  </NavLink>
              </li>
              { /*<li>
                <NavLink to='/list' activeClassName="active">
                <span className="glyphicon glyphicon-th-list"></span> Friends
                </NavLink>
              </li> */}
              <li>
              <NavLink to="/posts" activeClassName="active">
                <span className="	glyphicon glyphicon-list-alt"></span> My Blog
              </NavLink>
              </li>
              <li className="navbar-right" >
              <NavLink to='' onClick={this.logoutclick} activeClassName="" >
                <span className="glyphicon glyphicon-log-out"></span> Logout 
              </NavLink>
              </li>
              
              
               </ul>
              )
               }else{
               
            return (
               <ul className="nav navbar-nav">
              <li>
              <NavLink to="/main" activeClassName="active" >
                <span className="glyphicon glyphicon-home"></span> Home
              </NavLink>
              </li>
               
              <li className="navbar-right" >
              <NavLink to='/login' activeClassName="active" >
                <span className="glyphicon glyphicon-log-in"></span> Login 
              </NavLink>
              </li>
               </ul>
          
            )
        
               }
            })()} 
              
             
           
      
          </div>
        </div>
      </nav>
      )
  }
  ;
}

export default withRouter(NavMenu) ;
