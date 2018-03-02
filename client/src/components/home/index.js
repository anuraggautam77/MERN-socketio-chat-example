import React, { Component } from "react";

import "../../style/css/home.scss";
class Index extends Component {

  constructor(props) {
    super (props);
    this.state = {
      newfriendList: [],
      pendingRequest: [],
      recevingRequest: [],
      userid: window.localStorage.getItem ('userid')
    };

    this.primarybtnAction = this.primarybtnAction.bind (this);
     this.secondarybtnAction = this.secondarybtnAction.bind (this);
     
  };
    
  secondarybtnAction(){
    
  }
  
  
  primarybtnAction(e, id,type) {
    let obj = {requestedby: this.state.userid, requestedto: id},
    posturl=null;
    
    if(type=="Suggest"){
       e.target.disabled = true;
       posturl=`/api/sendrequest`;
      this.sereviceCall(posturl,obj);
    }else if(type=="New"){
       posturl=`/api/acceptrequest`;
       this.sereviceCall(posturl,obj);
    }else{
      
      
    }
   
    
  }
  
  sereviceCall(posturl,obj){
    fetch (posturl,
      {
        method: 'post',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify (obj)
      }
    ).then (res => res.json ()).then (json => {

    });
  };
  
  

  categorised(json) {
    if (json.hasOwnProperty ('list')) {
      let newFrndList = [], pendingRequest = [], recevingRequest = [];
      json.list.forEach ((val1, k) => {
        if (val1.hasOwnProperty ('friends')) {
          let isExist = false;
          val1.friends.forEach ((frnd, k) => {
            if (frnd.userid === this.state.userid) {
              isExist = true;
              if (frnd.ftype === 'RR' && frnd.status==='pending') {
                pendingRequest.push (val1);
              }
              if (frnd.ftype === 'SR' && frnd.status==='pending') {
                recevingRequest.push (val1);
              }
            }
          });


          if (!isExist) {
            newFrndList.push (val1);
          }
        } else {
          newFrndList.push (val1);
        }
      });
      this.setState ({
        newfriendList: newFrndList,
        pendingRequest: pendingRequest,
        recevingRequest: recevingRequest
      });
    }
  }
   
    componentDidMount() {
    fetch (`/api/getuserlist/${this.state.userid}`, {method: 'get', headers: {'Content-Type': 'application/json'}}
    ).then (res => res.json ()).then (json => {
      this.categorised (json);
    });
  }

  friendlist(objData) {
    let listItems = null;
    if (objData.list.length > 0) {
      listItems = objData.list.map ((obj) => {
        return (
          <div className="col-md-4 col-sm-5 col-xs-12" key={obj._id}>
            
              <div className="panel-body"> 
                <img src="img/avatars/profile.png" className="image"/>
                <h4 className="text-capitalize">{obj.firstName} {obj.lastName}</h4>
                 <p> {/* obj.email */ }</p>
                <button  className="btn btn-primary btn-xs"   onClick={(e) => {
                  this.primarybtnAction(e, obj._id,objData.type);
                                                                        }}>
                  <i className="glyphicon glyphicon-plus"></i>
                  &nbsp; {objData.primarybtntext} </button>
                 &nbsp;
                <button className="btn btn-success btn-xs" 
                        onClick={(e) => {
                          this.secondarybtnAction (e, obj._id,objData.type)
                              }}
                        >
                  <i className="glyphicon glyphicon-envelope"></i>
                  &nbsp;{objData.secondarybtntext}</button>
              </div>
            
          </div>
              );
      });

    } else {
      listItems = (<div>No record </div>);
    }

    return listItems;
  }
  ;
    render() {

    return (
      <div className="row">
      
        {
          (() => {
            if (this.state.recevingRequest.length > 0) {
              return (
                  <div className="col-md-6 col-sm-6 col-xs-12">
                    <div className="panel panel-default">
                      <div className="panel-heading clearfix">
                        <h3 className="panel-title pull-left">Friend Requests</h3>
                      </div>
                      <div className="panel-body">
                        {this.friendlist ({
                            type:'New',
                            list: this.state.recevingRequest,
                            primarybtntext: "Accept",
                            secondarybtntext: "Cancel"
                        })}
                      </div>
                    </div>
                  </div>);
        }
        })()}
      
      
        {
                  (() => {
                    if (this.state.newfriendList.length > 0) {
                    return (
                          <div className="col-md-6 col-sm-6 col-xs-12">
                            <div className="panel panel-default">
                              <div className="panel-heading clearfix">
                                <h3 className="panel-title pull-left">Suggest Friends</h3>
                              </div>
                              <div className="panel-body">
                                {this.friendlist ({
                                  list: this.state.newfriendList,
                                   type:'Suggest',
                                   primarybtntext: "Add Friend",
                                   secondarybtntext: "View Profile"
                                })}
                              </div>
                            </div>
                          </div>)
        }
        })()}
      
      
        {
                          (() => {
                          if (this.state.pendingRequest.length > 0) {
                            return (
                                  <div className="col-md-6 col-sm-6 col-xs-12">
                                    <div className="panel panel-default">
                                      <div className="panel-heading clearfix">
                                        <h3 className="panel-title pull-left">Pending Request</h3>
                                      </div>
                                      <div className="panel-body">
                                        { this.friendlist ({
                                        type:'Pending',
                                        list: this.state.pendingRequest,
                                        primarybtntext: "Revert Request",
                                        secondarybtntext: "View Profile"
                                        })}
                                      </div>
                                    </div>
                                  </div>)
        }
        })()}
      
      
      </div>
                            );



              }
              ;
            }

            export default Index;
