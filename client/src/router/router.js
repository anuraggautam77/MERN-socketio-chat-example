import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
 
import Home from '../containers/home';
import Posts from '../containers/posts';
import Profile from '../containers/profile';
import List from '../containers/list';
import Login from '../containers/login';
import Landing from '../containers/landing';
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
                    <Route path="/home" exact component={Home} />
                    <Route path="/" exact component={Landing} />
                    <Route path="/login" exact component={Login} />
                    <Route path="/posts" component={Posts} />
                    <Route path="/list" component={List} />
                    <Route path="/profile" exact component={Profile} />
                    <Route path="/profile/:id"  component={Profile} />
                    <Route path="/main" component={Landing} />
                     
                </div>
             </div>      
            </Router>
        )
    }
};
