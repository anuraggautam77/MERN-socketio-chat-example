import React, {PropTypes, Component} from 'react';
import { withRouter } from "react-router-dom";
import {Auth} from './common/auth';
import PubSub from 'pubsub-js';
import './style/css/App.scss';
import Routing from './router/router';
import Speechcontainer from './speechcontainer';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {"isLoggedIn": window.localStorage.getItem('isLoggedIn')};
        this.mySubscriber = this.mySubscriber.bind(this);
        PubSub.subscribe('IS_LOGIN', this.mySubscriber);
        this.auth = new Auth();

        if (this.state.isLoggedIn) {
            this.auth.activeInterval(this.props.history);
        }
        else {
            this.auth.stopInterval();
        }
    }
    mySubscriber(msg, data) {

        if (data.status) {
            window.localStorage.setItem('accessToken', data.token);
            window.localStorage.setItem('userid', data.userid);
            window.localStorage.setItem('isLoggedIn', true);
            this.auth.activeInterval(this.props.history);
        }
        else {
            window.localStorage.removeItem('accessToken');
            window.localStorage.removeItem('userid');
            window.localStorage.removeItem('isLoggedIn');
            this.auth.stopInterval();
        }
       this.isLoggedIn(data);
    }
    isLoggedIn(data) {
        var boolFlag = window.localStorage.getItem('isLoggedIn');
        if (data.hasOwnProperty('callback')) {
            data.callback();
        }
        
        if(!data.status){
            PubSub.publish('IS_LOGOUT');   
        }
     
        this.setState({
            isLoggedIn: (boolFlag !== null && boolFlag !== '') ? JSON.parse(boolFlag) : false
        });
     
    }
    render() {
        return (
                <div>
                    <Speechcontainer/>
                    <Routing islogin={this.state.isLoggedIn} />
                </div>);
    }
}

export default withRouter(App);
