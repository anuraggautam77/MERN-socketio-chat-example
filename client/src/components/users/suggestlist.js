import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import PubSub from 'pubsub-js';
class Newfriend extends Component {

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

  }
  ;
    secondarybtnAction(e, id, type) {
    if (type === 'Suggest') {
      this.props.history.push ("/profile/" + id);

    } else {
      alert ("opertaion not active!");
    }

  };
  
  
  
  notifymessgae(type,obj){
      PubSub.publish ('LANDING_MESSGAE', obj.message);
  };
  

  primarybtnAction(e, id, type) {
    let obj = {requestedby: this.state.userid, requestedto: id},
      posturl = null;

    if (type === "Suggest") {
      e.target.disabled = true;
      posturl = `/api/sendrequest`;
      this.sereviceCall (posturl, obj, () => {
         
             var updatefrndlist=   this.state.newfriendList.filter((e)=>{
            if(e._id!==id){
               return e ; 
            }else{
               this.notifymessgae("SUCCESS",{
                 message:`Request successfully sent to ${e.firstName} ${ e.lastName} !!`
               });
             
            };
        }); 
         
      
        this.setState ({newfriendList: updatefrndlist});

      });
    } else if (type === "New") {
      e.target.disabled = true;
      posturl = `/api/acceptrequest`;
      this.sereviceCall (posturl, obj, () => {
        console.log (this.state.recevingRequest);
         
         var updatefrndlist=   this.state.recevingRequest.filter((e)=>{
            if(e._id!==id){
              return e ; 
            }else{
               this.notifymessgae("SUCCESS",{
               message:`${e.firstName} ${ e.lastName} is successfully added in your Conversation List !!`
                   
            });
               PubSub.publish ('UPDATE_USERLIST', e);
            };
        }); 
         
        this.setState ({recevingRequest: updatefrndlist});
      });
    } else {

    }
  }

  sereviceCall(posturl, obj, callback) {
    fetch (posturl,
      {
        method: 'post',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify (obj)
      }
    ).then (res => res.json ()).then (json => {
      callback ();

    });
  }
  ;
    categorised(json) {
    if (json.hasOwnProperty ('list')) {
      let newFrndList = [], pendingRequest = [], recevingRequest = [];
      json.list.forEach ((val1, k) => {
        if (val1.hasOwnProperty ('friends')) {
          let isExist = false;
          val1.friends.forEach ((frnd, k) => {
            if (frnd.userid === this.state.userid) {
              isExist = true;
              if (frnd.ftype === 'RR' && frnd.status === 'pending') {
                pendingRequest.push (val1);
              }
              if (frnd.ftype === 'SR' && frnd.status === 'pending') {
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
          <div  key={obj._id}>
            <div className="media">
              <div className="media-body">
                <h4 className="media-heading text-capitalize">{obj.firstName} {obj.lastName}</h4>
                <p> { obj.email } </p>
                <p>
          
                  <button  className="btn btn-primary btn-xs"   onClick={(e) => {
              this.primarybtnAction (e, obj._id, objData.type);
                                                                                  }}>
                    <i className="glyphicon glyphicon-plus"></i>
                    &nbsp; {objData.primarybtntext} </button>
                  &nbsp;
                  <button className="btn btn-success btn-xs" 
                          onClick={(e) => {
                this.secondarybtnAction (e, obj._id, objData.type)
                                        }}
                          >
                    <i className="glyphicon glyphicon-envelope"></i>
                    &nbsp;{objData.secondarybtntext}</button>
                </p>
              </div>
            </div>
            <hr/>
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
      <div>
        <div className="panel panel-default">
          <div className="panel-heading">
            <h5><b>New Friend Request(s)</b> </h5>
          </div>
          <div className="well-sm friendlist">
            {this.friendlist ({
            type: 'New',
            list: this.state.recevingRequest,
            primarybtntext: "Accept",
                  secondarybtntext: "Cancel"
            })}
          </div>
      
        </div>
      
        <div className="panel panel-default">
          <div className="panel-heading">
            <h5> <b>Suggest Friend(s)</b></h5>
          </div>
          <div className="well-sm friendlist">
            {this.friendlist ({
              list: this.state.newfriendList,
              type: 'Suggest',
              primarybtntext: "Add Friend",
                    secondarybtntext: "Profile"
            })}
          </div>
      
        </div> 
      
      </div>
            )
        }
        ;
      }

      export default withRouter (Newfriend);
