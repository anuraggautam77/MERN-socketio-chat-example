import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
 
//import Home from '../containers/home';
import Posts from '../containers/posts';
import Profile from '../containers/profile';
 
import Login from '../containers/login';
import MainPage from '../containers/mainpage';
import PostDetail from '../containers/postdetail';

import NavMenu from '../components/navigation/nav';
 


export default class Routing extends Component {
    
    constructor(props) {
        super (props);
       
    }
  
    render() {
     
        return (
            <Router>
               <div>
                <div className="container-full">
                      <NavMenu islogin={this.props.islogin}/>
                 </div>
                 <div className="container">
                    <Route path="/" exact component={MainPage} />
                    <Route path="/main" component={MainPage} />
                    <Route path="/login" exact component={Login} />
                    <Route path="/posts" component={Posts} />
                    <Route path="/profile" exact component={Profile} />
                    <Route path="/profile/:id"  component={Profile} />
                    <Route path="/post/:id"  component={PostDetail} />
                  
                     
                </div>
             </div>      
            </Router>
        )
    }
};
