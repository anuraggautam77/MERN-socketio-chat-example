import React, { Component } from 'react';

import PubSub from 'pubsub-js';
import Profilecard from '../components/profile/profilecard';
import Newfriend from '../components/users/suggestlist';
import UserList from '../components/users/userlist';
import MyPosts from '../components/mypost/myposts';
import ReadMorePost from '../components/mypost/readmorepost';
import Chatwindow from '../components/chatwindow/chatwindow';
import Subscription from '../components/notifications/subscription';

class MainPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentuser: window.localStorage.getItem('userid'),
            isnotify: 'dn',
            alertmessage: ''
        };
        PubSub.subscribe('LANDING_MESSGAE', (type, message) => {
            this.setState({"alertmessage": message, isnotify: 'alert alert-success bd'});
        });
        
        PubSub.subscribe('IS_LOGOUT', (type, message) => {
            this.setState({"currentuser": false});
        });
        
        
    }
    render() {
        return (
                <div className="main-landing row content">
                    {
                        (() => {
                            if (this.state.currentuser) {
                                    return (
                                                <div className="landing-page">
                                                    <div className="col-md-3 col-sm-6 proilecard"> 
                                                        <Profilecard/>
                                                         <Subscription/>
                                                        <div className="panel panel-default">
                                                            <div className="panel-heading">
                                                            </div>
                                                            <UserList/>
                                                        </div>
                                                    </div>
                                                    <div className="col-md-6 col-sm-6">
                                                        <div className={` ${this.state.isnotify} `}>
                                                            <strong>{this.state.alertmessage}</strong>
                                                        </div>
                                                        <ReadMorePost forall="true" onlytext="true"  />
                                                    </div>
                                                    
                        
                        
                                                    <div className="col-md-3 col-sm-6 proilecard">
                                                       
                                                        <Newfriend/>      
                                                    </div>
                                                    <Chatwindow/>
                                                </div>
                                            );
                    }else{
                                            return (
                                                        <div className="col-md-12 col-sm-12">
                                                            <ReadMorePost forall="true" onlytext="true" isGrid="true"  />      
                                                        </div>
                                                    );
                    }
                
                    })()
                    }
                
                </div>


                    );
    }
}

export default MainPage;
