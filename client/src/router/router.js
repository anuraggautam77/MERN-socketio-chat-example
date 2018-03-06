import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
 
import Home from '../Containers/home';
import Posts from '../Containers/posts';
import Profile from '../Containers/profile';
import List from '../Containers/list';
import Login from '../Containers/login';
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
                    <Route path="/home" excat component={Home} />
                    <Route path="/login" component={Login} />
                    
                    <Route path="/posts" auth="true" component={Posts} />
                    <Route path="/list" auth="true" component={List} />
                    <Route path="/profile" auth="true" component={Profile} />
                    
                     
                </div>
             </div>      
            </Router>
        )
    }
};
