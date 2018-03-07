import React, { Component } from 'react';
import Authentication from './authenticate';
import { NavLink } from 'react-router-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import Mypost from '../components/mypost/mypost';
import Listing from '../components/mypost/listing';
import Preview from '../components/mypost/preview';


export default class Posts extends Component {
  constructor(props) {
    super (props);
    this.state = {
      renderActual: false
    };
    this.mountedorNot = this.mountedorNot.bind (this);
  }
  mountedorNot() {
    this.setState ({renderActual: true});
  }
  render() {
    return (
      <div>
        <Authentication  onComponentDidMount={this.mountedorNot}/>
         { this.state.renderActual && 
        
       <Router>
        <div>
          <div className="row">
            <div className="col-md-3 col-sm-3 col-xs-12">
              <div className="panel panel-default">
                <div className="panel-heading clearfix">
                  <h3 className="panel-title pull-left">Posts</h3>
                </div>
             <div className="list-group">
                    <NavLink to="/posts/listing" className="list-group-item"  exact={true}  >
                      <span className="glyphicon glyphicon-th-list"></span> All Post
                   </NavLink>

                  <NavLink to="/posts/newpost" className="list-group-item"  exact={true}  >
                    <span className="glyphicon glyphicon-list-alt"></span> New Post
                  </NavLink>
                  
                   <NavLink to="#" className="list-group-item"  exact={true}  >
                    <span className="glyphicon glyphicon-list-alt"></span> List
                  </NavLink>
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
      </Router> }
      </div>
      )
  }
}
