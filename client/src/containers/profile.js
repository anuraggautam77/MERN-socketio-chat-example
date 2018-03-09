import React,  { Component } from 'react';
import Authentication from './authenticate';
import { withRouter } from "react-router-dom";


import 'whatwg-fetch';
import MyProfile from '../components/profile/index';

export default class Profile extends Component {

  constructor(props) {
    super (props);
    let userid = window.localStorage.getItem ('userid'),
      editsaveright=true;
    
    if (props.match.params.hasOwnProperty ('id')) {
      userid= props.match.params.id;
      editsaveright=false;
    }
 
    this.state = {
      renderActual: false,
      userId: userid,
      edit: editsaveright
    };
    this.mountedorNot = this.mountedorNot.bind (this);
  }
  mountedorNot(set) {
    this.setState ({renderActual: set});
  }
  ;
    componentWillMount() {
 

    fetch (`/api/getuserdetail/${this.state.userId}`, {method: 'get', headers: {'Content-Type': 'application/json'}}
    ).then (res => res.json ()
    ).then (json => {
      if (json.hasOwnProperty ('list')) {

        var obj = {'user': json.list[0]}
        if (json.list[0].hasOwnProperty ('userDetail')) {
          obj.userDetail = json.list[0].userDetail
        }
        this.setState (obj);
      }
    });
  }

  render() {
    
    return (
      <div>
        <Authentication check={this.mountedorNot}/>
        { this.state.renderActual && <MyProfile  userdata={this.state} />  }
      </div>
      )
  }
}
