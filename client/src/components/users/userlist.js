import React, { Component } from "react";
import PubSub from 'pubsub-js';
import { withRouter } from "react-router-dom";
import "../../style/css/userlist.scss";
import   'whatwg-fetch';
class UserList extends Component {

  constructor(props) {
    super (props);
    this.state = {
      userList: [],
      notification:[]
    };
    this.onchatnowClick = this.onchatnowClick.bind (this);
    this.updateNoification = this.updateNoification.bind (this);
    this.addUserInlist=this.addUserInlist.bind(this);
    
     PubSub.subscribe('NOTIFICATION_TO_USERLIST',this.updateNoification);
     PubSub.subscribe ('UPDATE_USERLIST', this.addUserInlist);
  };
  
  
  updateNoification(evntid,data){
    this.updateuserList(data.userId);
  }
  
   addUserInlist(evntid,data){
      this.setState({
             userList: [...this.state.userList, data]
     })
    
  }
  
  updateuserList(data){
    
      this.state.userList.map((obj)=>{
        if(data.includes(obj._id)){
          obj.notification='true';
        }else{
          obj.notification='false';
        }
      });
      this.setState({'notification':data,userList:this.state.userList});
     
  };
  
  
  componentDidMount() {

    var id = window.localStorage.getItem ('userid');
    fetch (`/api/acceptfriendlist/${id}`, {method: 'get', headers: {'Content-Type': 'application/json'}}
    ).then (res => res.json ()).then (json => {
      if (json.hasOwnProperty ('list')) {
        this.setState ({userList: json.list},function(){
        //  this.onViewProfileClick(json.list[0]._id);
        });
      }
    });
  }
  onchatnowClick(id) {
    PubSub.publish ('TRIGGER_CHAT_ENABLE', {status: true, towhome: id});
  }
  
  onViewProfileClick(id){
    
    this.props.history.push ("/profile/"+id);
   // PubSub.publish ('PROFILE_VIEW', {towhome: id});
  }

  render() {
    var userList = this.state.userList;
    
    if(userList.length>0){
      
      
      }
    
    let listItems = userList.map ((obj) => {
      return(
        <div className="well-sm" key={obj._id}>
          <div className="media">
             <div className="media-left align-self-center">
             {/*
              (()=>{
                if(obj.hasOwnProperty('userDetail')){
                    return(<img className="rounded-circle" src={obj.userDetail.photodata}/>)  
                }else{
                 return(<img className="rounded-circle" src='https://picsum.photos/100/100'/>)  
                 }
              })()
             */}
             
             
            </div>
            <div className="media-body">
              <h4 className="media-heading text-capitalize"> {obj.firstName} {obj.lastName} </h4>
              <p>
             {  
              (()=>{
                  if(obj.hasOwnProperty('notification')){
                    if(obj.notification=='true'){
                      return(<span className="label label-info">new messgae ....</span>);
                      }; 
                  } 
               })()
             }  
              </p>
              <p>
                <a href='javascript:void(0)' onClick={ e => this.onchatnowClick(obj._id)}   className="btn btn-xs btn-default"><span className="glyphicon glyphicon-comment"></span> Chat</a>
                <a href='#profile' onClick={ e => this.onViewProfileClick(obj._id) } className="btn btn-xs btn-default"><span className="glyphicon glyphicon-heart"></span> View Profile</a>
                  
              </p>
            </div>
          </div>
        </div>
        );
    });
    return (
      <div className="userlist-container">
          {listItems}
      </div>
      );
  }
  ;
}
;
export default withRouter(UserList);



