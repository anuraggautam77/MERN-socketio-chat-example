import React, { Component } from "react";
import "../../style/css/chatwindow.scss";

import PubSub from 'pubsub-js';

class ChatWindow extends Component {


  constructor (props){
    super(props);
  }

  componentDidMount() {
   
    PubSub.subscribe('TRIGGER_CHAT_ENABLE',this.chatEnableHandler)
    
    
  }

  chatEnableHandler(eventstring,data){
    console.log(data);
    
  }














  render() {
    return (
   <div>
  <div className="popup-head">
    <div className="popup-head-left pull-left">
      <img src="http://bootsnipp.com/img/avatars/bcf1c0d13e5500875fdd5a7e8ad9752ee16e7462.jpg" alt="iamgurdeeposahan"/> Gurdeep Osahan
    </div>
  <div className="popup-head-right pull-right">
    <div className="btn-group">
      <button className="chat-header-button" data-toggle="dropdown" type="button" aria-expanded="false">
          <i className="glyphicon glyphicon-cog"></i>
        </button>
    </div>
     <button data-widget="remove" id="removeClass" className="chat-header-button pull-right" type="button">
          <i className="glyphicon glyphicon-off"></i>
     </button>
  </div>
</div>
<div className="popup-messages"> </div>
 <div className="popup-messages-footer">
      <textarea id="status_message" placeholder="Type a message..." rows="10" cols="40" name="message"></textarea>
      <div className="btn-footer">
        <button className="bg_none"><i className="glyphicon glyphicon-film"></i> </button>
        <button className="bg_none"><i className="glyphicon glyphicon-camera"></i> </button>
        <button className="bg_none"><i className="glyphicon glyphicon-paperclip"></i> </button>
        <button className="bg_none pull-right"><i className="glyphicon glyphicon-thumbs-up"></i> </button>
      </div>
  </div>
</div>
    )
  }
  ;
}
;

export default ChatWindow;



