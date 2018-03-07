import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
 
import Home from '../Containers/home';
import Posts from '../Containers/posts';
import Profile from '../Containers/profile';
import List from '../Containers/list';
import Login from '../Containers/login';
import Landing from '../Containers/landing';
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
                    <Route path="/posts" component={Posts} />
                    <Route path="/list" component={List} />
                    <Route path="/profile" component={Profile} />
                    <Route path="/main" component={Landing} />
                     
                     
                     
                     
                </div>
             </div>      
            </Router>
        )
    }
};
