import React, { Component } from "react";
import "../../style/css/chatwindow.scss";
class ChatWindow extends Component {

  render() {
    return (
      <div>
<div className="popup-head">
  <div className="popup-head-left pull-left"><img src="http://bootsnipp.com/img/avatars/bcf1c0d13e5500875fdd5a7e8ad9752ee16e7462.jpg" alt="iamgurdeeposahan"/> Gurdeep Osahan</div>
  <div className="popup-head-right pull-right">
    <div className="btn-group">
      <button className="chat-header-button" data-toggle="dropdown" type="button" aria-expanded="false">
        <i className="glyphicon glyphicon-cog"></i> </button>
      <ul role="menu" className="dropdown-menu pull-right">
        <li><a href="#">Media</a></li>
        <li><a href="#">Block</a></li>
        <li><a href="#">Clear Chat</a></li>
        <li><a href="#">Email Chat</a></li>
      </ul>
    </div>

    <button data-widget="remove" id="removeClass" className="chat-header-button pull-right" type="button"><i className="glyphicon glyphicon-off"></i></button>
  </div>
</div>
<div className="popup-messages">
  <div className="direct-chat-messages">
    <div className="chat-box-single-line">
      <abbr className="timestamp">October 8th, 2015</abbr>
    </div>
    <div className="direct-chat-msg doted-border">
      <div className="direct-chat-info clearfix">
        <span className="direct-chat-name pull-left">Osahan</span>
      </div>
      <img alt="message user image" src="http://bootsnipp.com/img/avatars/bcf1c0d13e5500875fdd5a7e8ad9752ee16e7462.jpg" className="direct-chat-img"/> 
      <div className="direct-chat-text">
        Hey bro, how’s everything going ?
      </div>
      <div className="direct-chat-info clearfix">
        <span className="direct-chat-timestamp pull-right">3.36 PM</span>
      </div>
      <div className="direct-chat-info clearfix">
        <span className="direct-chat-img-reply-small pull-left">

        </span>
        <span className="direct-chat-reply-name">Singh</span>
      </div>
    </div>
    <div className="chat-box-single-line">
      <abbr className="timestamp">October 9th, 2015</abbr>
    </div>
    <div className="direct-chat-msg doted-border">
      <div className="direct-chat-info clearfix">
        <span className="direct-chat-name pull-left">Osahan</span>
      </div>
      <img alt="iamgurdeeposahan" src="http://bootsnipp.com/img/avatars/bcf1c0d13e5500875fdd5a7e8ad9752ee16e7462.jpg" className="direct-chat-img"/>
      <div className="direct-chat-text">
        Hey bro, how’s everything going ?
      </div>
      <div className="direct-chat-info clearfix">
        <span className="direct-chat-timestamp pull-right">3.36 PM</span>
      </div>
      <div className="direct-chat-info clearfix">
        <img alt="iamgurdeeposahan" src="http://bootsnipp.com/img/avatars/bcf1c0d13e5500875fdd5a7e8ad9752ee16e7462.jpg" className="direct-chat-img big-round"/>
        <span className="direct-chat-reply-name">Singh</span>
      </div>
    </div>
  </div>
</div>
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



