import React, { Component }
from "react";
import PubSub from 'pubsub-js';
import "../../style/css/userlist.scss";
class UserList extends Component {

  constructor(props) {
    super (props);
    this.state = {
      userList: [],
      notification:[]
    };
    this.onchatnowClick = this.onchatnowClick.bind (this);
    this.updateNoification = this.updateNoification.bind (this);
     PubSub.subscribe('NOTIFICATION_TO_USERLIST',this.updateNoification);
  };
  
  
  updateNoification(evntid,data){
    this.updateuserList(data.userId);
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
  
  
  componentWillMount() {

    var id = window.localStorage.getItem ('userid');
    fetch (`/api/getuserlist/${id}`, {method: 'get', headers: {'Content-Type': 'application/json'}}
    ).then (res => res.json ()).then (json => {
      if (json.hasOwnProperty ('list')) {
        this.setState ({userList: json.list});
        this.onViewProfileClick(json.list[0]._id);
      }
    });
  }
  onchatnowClick(id) {
    PubSub.publish ('TRIGGER_CHAT_ENABLE', {status: true, towhome: id});
  }
  
  onViewProfileClick(id){
    
    PubSub.publish ('PROFILE_VIEW', {towhome: id});
  }

  render() {
    var userList = this.state.userList;
    let listItems = userList.map ((obj) => {
      return(
        <div className="well well-sm" key={obj._id}>
          <div className="media">
             <div className="media-left align-self-center">
             {
              (()=>{
                if(obj.hasOwnProperty('userDetail')){
                    return(<img className="rounded-circle" src={obj.userDetail.photodata}/>)  
                }else{
                 return(<img className="rounded-circle" src='https://picsum.photos/100/100/?random'/>)  
                 }
              })()
              }
             
             
            </div>
            <div className="media-body">
              <h4 className="media-heading"> {obj.firstName} {obj.lastName} </h4>
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
                <a href='javascript:void(0)' onClick={ e => this.onViewProfileClick(obj._id) } className="btn btn-xs btn-default"><span className="glyphicon glyphicon-heart"></span> View Profile</a>
                  
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
export default UserList;



