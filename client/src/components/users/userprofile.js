import React, { Component }
from "react";
import PubSub from 'pubsub-js';
import "../../style/css/userprofile.scss";
import  'whatwg-fetch';
class UserProfile extends Component {

  constructor(props) {
    super (props);
    this.state = {
      userDetail: '',
      ishow: 'dn',
      imagedata: ''
    };

    this.showUserProfile = this.showUserProfile.bind (this);
    PubSub.subscribe ('PROFILE_VIEW', this.showUserProfile);

  }
  ;
    showUserProfile(event, data) {
    fetch (`/api/getuserdetail/${data.towhome}`, {method: 'get', headers: {'Content-Type': 'application/json'}}
    ).then (res => res.json ()
    ).then (json => {
      if (json.hasOwnProperty ('list')) {

        var obj = {'userDetail': json.list[0], ishow: 'db'}
        if (json.list[0].hasOwnProperty ('userDetail')) {
          obj.imagedata = json.list[0].userDetail.photodata;
        } else {
          obj.imagedata = '';
        }
        this.setState (obj);
      }
    });

  }
  ;
    render() {
    if (this.state.ishow == 'dn') {
      return (<div></div>);
    }
    ;
    return(
      <div id="profile" className="userprofile-container">
        <div className="well profile">
          <div className="row">
            <div className="col-xs-12 col-sm-8 col-md-8">
              <div className="alert alert-success"> 
                <h2 className="text-capitalize">{this.state.userDetail.firstName}  {this.state.userDetail.lastName}</h2>
                {(() => {
                       if (this.state.userDetail.hasOwnProperty ('userDetail')) {
                             if (this.state.userDetail.userDetail.hasOwnProperty ('professional')) {
                              if(this.state.userDetail.userDetail.professional!==null) {
                           return(
                          <div><p> 
                                    {(()=>{
                                       if (this.state.userDetail.userDetail.professional.hasOwnProperty ('occupation')) {
                                         return  this.state.userDetail.userDetail.professional.occupation;
                                       }
                                   })()}
                          
                    &nbsp;
      
                       {(()=>{
                              if (this.state.userDetail.userDetail.professional.hasOwnProperty ('company')) {
                                   if (this.state.userDetail.userDetail.professional.company !== '' 
                                     && this.state.userDetail.userDetail.professional.company != null) {
                                     return(<span>at 
                                              <strong> { this.state.userDetail.userDetail.professional.company} </strong> 
                                          </span> );
                                    } 
                                  }
                        })()}
                            </p> 
                          </div>)
                              }
                               
                }}
                })()}
      
      
                {(() => {
                          if (this.state.userDetail.hasOwnProperty ('userDetail')) 
                          {
                            if (this.state.userDetail.userDetail.hasOwnProperty ('aboutme'))
                                      {
                                              return(
                                                      <div>
                                                      <p> <span className="glyphicon glyphicon-tags"></span> 
                                                        <i> {this.state.userDetail.userDetail.aboutme.tagline}</i></p>
                                                      <p>{this.state.userDetail.userDetail.aboutme.description}</p> 
                                                      </div>
                                              )
                                      }
                           }
                })()}
                <p><strong>Email: </strong>
                { this.state.userDetail.email} </p>
                <p><span className="glyphicon glyphicon-map-marker"></span>: 
                    {this.state.userDetail.city}  &nbsp;{this.state.userDetail.country} </p>
              </div> 
              <span>Professional Information </span>
              <div className="alert alert-info">
                  {(() => {
                                if (this.state.userDetail.hasOwnProperty ('userDetail')) {
                                  if (this.state.userDetail.userDetail.hasOwnProperty ('aboutme')) {
                                      return(<p>
                                        <strong> Hobbies:</strong>
                                         <span>  {this.state.userDetail.userDetail.aboutme.hobby}</span>
                                        </p>    );
                                   } }
                  })()}
                 {(() => {
                       if (this.state.userDetail.hasOwnProperty ('userDetail')) {
                             if (this.state.userDetail.userDetail.hasOwnProperty ('professional')) {
                              if(this.state.userDetail.userDetail.professional!==null) {
                           return(
                            <p>
                          <strong>Skills: </strong>
                                    {(()=>{
                                       if (this.state.userDetail.userDetail.professional.hasOwnProperty ('skill')) {
                                         return  this.state.userDetail.userDetail.professional.skill;
                                       }
                                   })()}
                             </p>  )
                              }
                               
                }}
                })()}
               
              </div>
            </div>             
            <div className="col-xs-12 col-sm-4  col-md-4 ">
              { (() => {
                      if (this.state.imagedata !== '') {
                              return (
                                    <figure>
                                      <img src={this.state.imagedata} alt={this.state.userDetail.firstName}
                                        className="img-circle img-responsive"/>
                                    </figure>
                              );
                      }
              })()}
      
            </div>
          </div> 
        </div> 
      </div>
     );
    }
    ;
  }
  ;
  export default UserProfile;



