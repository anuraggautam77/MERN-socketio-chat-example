import React, { Component } from 'react';
import Header from '../header/header';
import BasicInfo from './basicinfo';
import Aboutme from './aboutme';
import Professional from './professional';
import SocialLink from './reference';
import Progressbar from './progressbar';
import  'whatwg-fetch';

class MyProfile extends Component {

  constructor(props) {
    super (props);
    this.state = {userdata: {}, completed: null};
  }

  componentWillReceiveProps(newprops) {
    var arrTemp = 0;
    if (newprops.userdata.hasOwnProperty ('userDetail')) {
      if (newprops.userdata.userDetail.hasOwnProperty ('aboutme')) {
       
        if(newprops.userdata.userDetail.aboutme!==null){
          if (newprops.userdata.userDetail.aboutme.tagline !== '' && newprops.userdata.userDetail.aboutme !== '') {
          arrTemp += 25;
        }
        }
        
      }
      if (newprops.userdata.userDetail.hasOwnProperty ('sociallink')) {
        if (newprops.userdata.userDetail.sociallink.length > 0) {
          //arrTemp += 20;
        }
      }
      if (newprops.userdata.userDetail.hasOwnProperty ('professional')) {
        console.log(newprops);
        if (newprops.userdata.userDetail.professional !== null 
          && newprops.userdata.userDetail.professional !== "") {
          if(newprops.userdata.userDetail.professional.occupation!== ""){
             arrTemp += 25;
          }
        
        }
      }

      if (newprops.userdata.userDetail.hasOwnProperty ('photodata')) {
        if (newprops.userdata.userDetail.photodata !== null) {
           arrTemp += 25;
        }
      }
    }
    ;

    if (newprops.userdata.user.city !== null && newprops.userdata.user.city !== '' && newprops.userdata.user.country !== null && newprops.userdata.user.country !== '') {
      arrTemp += 25;
    }

    this.setState ({userdata: newprops.userdata, completed: arrTemp});
  }

  render() {

    return (
      <div className="row">
        <div className="col-md-4 col-sm-4 col-xs-12">
      {  /*      <div className="panel panel-default">
            <div className="panel-heading clearfix">
              <h3 className="panel-title pull-left">Proile Image</h3>
            </div>
            <Header tag="hidden" userdata={this.state.userdata}/>
          </div>
            */  }
          <div className="panel panel-default">
            <div className="panel-heading clearfix">
              <h3 className="panel-title pull-left">Profile Completed</h3>
            </div>
            <Progressbar percentage={this.state.completed}/>
          </div>
      
      
          <SocialLink/>
        </div>
        <div className="col-md-8 col-sm-8 col-xs-12">
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
