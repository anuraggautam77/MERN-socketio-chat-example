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
                    <NavMenu/>
                    <Route path="/" exact component={Home} />
                    <Route path="/home" component={Home} />
                    <Route path="/profile" component={Profile} />
                    <Route path="/list" component={List} />
                    <Route path="/login" component={Login} />
                    <Route path="/posts" component={Posts} />
                    </div>
            </Router>
        )
    }
}