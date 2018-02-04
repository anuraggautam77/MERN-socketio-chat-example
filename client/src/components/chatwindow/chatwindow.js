import React, { Component } from "react";
import io from "socket.io-client";
import ChatList from './chatlist';
import "../../style/css/chatwindow.scss";
import PubSub from 'pubsub-js';

class ChatWindow extends Component {
  constructor (props){
    super(props);
    const endPoint='http://localhost:3000';
    this.state ={
      'userData':[],
      'display':'dn',
      'status':'',
      'chatmessage':[],
      'chatList':[],
      'currentChatWindow':{'one':window.localStorage.getItem('userid'),'second':''}
    };
    
   this.typetext='';
   this.socket = io(this.state.endpoint);
   let userId= window.localStorage.getItem('userid');
   
   if(userId!=='null' && userId!=='undefined'){
       this.socket.emit('INIT_CONNECTION', {myid:userId});
   }
  
   this.chatEnableHandler= this.chatEnableHandler.bind(this);
   this.sendchat= this.sendchat.bind(this);
   this.chatOnchange=this.chatOnchange.bind(this);
  
    this.socket.on('RECEIVE_CHAT_HISTORY', (data)=>{
     this.addMessage(data,true);
   });
   this.socket.on('RECEIVE_CHAT', (data)=>{
      this.addMessage(data,false);
   });
   
  };
   
   
  addMessage(data,flag) {
   if(flag){
        this.setState({chatList:data.chatData});
   }else{
      var arrUser=  this.checkChatwithSameUser(data.chattitle);
    if(arrUser.length>0){
         console.log("chat from new user >>>>>");
         PubSub.publish ('NOTIFICATION_TO_USERLIST', {userId:arrUser});
    }else{
       this.setState({chatList:data.chatData});
    }
   }
   
  
     
  };
  
  
  checkChatwithSameUser(chattitle){
    let arrTemp=[],
        arrThatUsers =chattitle.split('----'),
        arrCurrntActiveWindow=[this.state.currentChatWindow.one,this.state.currentChatWindow.second];
   
    arrThatUsers.map((i)=>{
      if(!arrCurrntActiveWindow.includes(i)){
          arrTemp.push(i);
      }
    });
   return arrTemp;
  };
  
  
  
  chatOnchange(event){
      this.typetext= event.target.value;
  }
  
  componentDidMount() {
    PubSub.subscribe('TRIGGER_CHAT_ENABLE',this.chatEnableHandler);
  }

  chatEnableHandler(eventstring,data){
   //
     fetch (`/api/getuserdetail/${data.towhome}`, {method: 'get', headers: {'Content-Type': 'application/json'}}
    ).then (res => res.json ()
    ).then (json => {
      if (json.hasOwnProperty ('list')) {
         this.setState (
                    {
                     'userData': json.list,
                     'display':'db',
                     'currentChatWindow':{'one':window.localStorage.getItem('userid'),'second':json.list[0]._id}
                     }
                );
         this.showChatonfirstLoad(json.list);
      }
    });
  }
  
  showChatonfirstLoad(arrUserDetail){
    this.socket.emit('CHAT_HISTORY', 
    {
      myDetail:window.localStorage.getItem('userid'),
      toDetail: arrUserDetail
    }
      );
  };
  
  
  sendchat(){
    this.socket.emit('CHAT_TRIGGER_INDIVIDUAL', 
      {
      "pingFrom":window.localStorage.getItem('userid'),
      "message":this.typetext,
      "msgTo":this.state.userData[0],
      "time":Date.now()
    }
   );
     
  };
  
  
  chatheader(state){
      if(state.userData.length>0){
        return (
      <div className="popup-head-left pull-left">
      <img src="https://picsum.photos/100/100/?random" alt="iamgurdeeposahan"/> {state.userData[0].firstName} {state.userData[0].lastName}
    </div>
      );
      } 
  }
   
  render() {
   return (
 <main className={this.state.display} >
  <div className='popup-box'> <div  className='chatwindow'>
  <div className="popup-head"> {this.chatheader(this.state)} <div className="popup-head-right pull-right">
     <button data-widget="remove" id="removeClass" onClick ={()=> this.setState({'display':'dn'})} className="chat-header-button pull-right" type="button">
          <i className="glyphicon glyphicon-off"></i>
     </button>
  </div>
</div>
<div className="popup-messages"> 
<ul className="chatcontent">
 <ChatList props={this.state.chatList}/>
</ul> 
</div>

<div className="popup-messages-footer">
      <textarea id="status_message"  onChange={this.chatOnchange}  placeholder="Type a message..." rows="10" cols="40" name="message"> </textarea>
     <div className="btn-footer">
             <button className="bg_none"><i className="glyphicon glyphicon-paperclip"></i> </button>
             <button className="bg_none"><i className="glyphicon glyphicon-thumbs-up"></i> </button>
             <button className="bg_none pull-right" onClick ={this.sendchat}><i className="glyphicon glyphicon-send"></i> 
               </button>
     </div>
</div>
</div>
</div>
</main>
    );
  }
  ;
}
;

export default ChatWindow;



