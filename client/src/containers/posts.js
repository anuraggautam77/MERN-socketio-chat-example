import React, { Component } from 'react';
import Authentication from './authenticate';
import { NavLink } from 'react-router-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import AddPost from '../components/mypost/addpost';
import MyPosts from '../components/mypost/myposts';
import Listing from '../components/mypost/listing';

export default class Posts extends Component {
  constructor(props) {
    super (props);
    this.state = {
      renderActual: false
    };
    this.mountedorNot = this.mountedorNot.bind (this);
  }
   mountedorNot(set) {
    this.setState ({renderActual: set});
  }
  render() {
    return (
      <div>
        <Authentication  check={this.mountedorNot}/>
         { this.state.renderActual && 
        
       <Router>
        <div  className='proilecard'>
          <div className="row">
           
            <div className="col-md-3 col-sm-3 col-xs-12">
             
            <div className="panel panel-default">
                <div className="panel-heading clearfix">
                  <h3 className="panel-title pull-left">Posts</h3>
                </div>
             <div className="list-group">
                   
                   <NavLink to="/posts/listing" className="list-group-item"  exact={true}  >
                    <span className="glyphicon glyphicon-list"></span> List
                  </NavLink>
                    
                      <NavLink to="/posts/newpost" className="list-group-item"  exact={true}  >
                    <span className="glyphicon glyphicon-pencil"></span> New Post
                  </NavLink>
                  
                  
                    <NavLink to="/posts/myposts" className="list-group-item"  exact={true}  >
                      <span className="glyphicon glyphicon-th-list"></span> All Post
                   </NavLink>

                
                 
            </div>
            </div>
            
            </div>
      
            <div className="col-md-9 col-sm-9 col-xs-12">
              <Route path="/posts" exact component={Listing} />
              <Route path="/posts/newpost" exact component={AddPost} />
              <Route path="/posts/myposts" exact component={MyPosts} />
              <Route path="/posts/newpost/:id" exact component={AddPost} />
              <Route path="/posts/listing" component={Listing} />  
            </div>
      
          </div> 
        </div>
      </Router> }
      </div>
      )
  }
}
