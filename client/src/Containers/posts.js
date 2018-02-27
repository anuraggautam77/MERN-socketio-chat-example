import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import Mypost from '../components/mypost/mypost';
import Listing from '../components/mypost/listing';
import Preview from '../components/mypost/preview';


export default class Posts extends Component {
  constructor(props) {
    super (props);
  }
  render() {
    return (
      <Router>
        <div>
          <div className="row">
            <div className="col-md-3 col-sm-3 col-xs-12">
              <div className="panel panel-default">
                <div className="panel-heading clearfix">
                  <h3 className="panel-title pull-left">Posts</h3>
                </div>
                <div className="panel-body">
                  <div className="side-menu-container">
                    <ul className="nav navbar-nav">
                      <ul>
                        <li>
                        <NavLink to="/posts/newpost"  exact={true}  activeClassName="active" >
                          <span className="glyphicon glyphicon-home"></span> New Post
                        </NavLink>
                        </li>
                        <li>
                        <NavLink to="/posts/listing"  exact={true}  activeClassName="active" >
                          <span className="glyphicon glyphicon-home"></span> All Post
                        </NavLink>
                       </li>
                      </ul>
      
                    </ul>
                  </div>
                </div>
              </div>
            </div>
      
            <div className="col-md-9 col-sm-9 col-xs-12">
              <Route path="/posts/" exact component={Listing} />
              <Route  path="/posts/newpost" component={Mypost} />
              <Route exact path="/posts/listing" component={Listing} />
              <Route path="/posts/preview" component={Preview} />  
            </div>
      
          </div> 
        </div>
      </Router>
      )
  }
}
