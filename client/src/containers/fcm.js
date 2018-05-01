import React, { Component } from 'react';
import Authentication from './authenticate';
import { withRouter } from "react-router-dom";
import 'whatwg-fetch';
import DeviceList from '../components/notifications/index';

export default class Notification extends Component {

    constructor(props) {
        super(props);
    }
    
   render() {

        return (
                <div>
                     <DeviceList/>  
                </div>
                )
    }
}
