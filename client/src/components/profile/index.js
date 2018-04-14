import React, { Component } from 'react';
import BasicInfo from './basicinfo';
import Aboutme from './aboutme';
import Professional from './professional';
import SocialLink from './reference';
//import Progressbar from './progressbar';
import  'whatwg-fetch';

class MyProfile extends Component {

  constructor(props) {
    super (props);
    this.state = {
        edit:props.userdata.edit,
        userdata: {}, 
        completed: null,
        userid:props.userdata.userId
    };
  }

    componentWillMount() {
 
    fetch (`/api/getuserdetail/${this.state.userid}`, {method: 'get', headers: {'Content-Type': 'application/json'}}
    ).then (res => res.json ()
    ).then (json => {
      if (json.hasOwnProperty ('list')) {

        var obj = {'user': json.list[0]};
        if (json.list[0].hasOwnProperty ('userDetail')) {
          obj.userDetail = json.list[0].userDetail;
        }
         obj.edit=this.state.edit;
        
         this.setState ({userdata:obj});
      }
    });
  }


  render() {
    return (
      <div className="row">
        <div className="col-md-12 col-sm-12 col-xs-12">
          <BasicInfo userdata={this.state.userdata}/>
          <Professional userdata={this.state.userdata}/>
          <Aboutme userdata={this.state.userdata}/>
        </div>
      </div>

      );
  }
}
;

export default MyProfile;
