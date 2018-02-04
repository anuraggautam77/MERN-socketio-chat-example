import React, { Component }
from "react";
import PubSub from 'pubsub-js';
import "../../style/css/userprofile.scss";
class UserProfile extends Component {

  constructor(props) {
    super (props);
    this.state = { };
  
  }
  componentWillMount() {
    
  
    
  }
   

  render() {
     return( 
       <div className="userprofile-container">
    	 <div className="well profile">
            <div className="col-sm-12">
                <div className="col-xs-12 col-sm-8">
                    <h2>Nicole Pearson</h2>
                    <p><strong>About: </strong> Web Designer / UI. </p>
                    <p><strong>Hobbies: </strong> Read, out with friends, listen to music, draw and learn new things. </p>
                    <p><strong>Skills: </strong>
                        <span className="tags">html5</span> 
                        <span className="tags">css3</span>
                        <span className="tags">jquery</span>
                        <span className="tags">bootstrap3</span>
                    </p>
                </div>             
                <div className="col-xs-12 col-sm-4">
                    <figure>
                        <img src="https://picsum.photos/100/100/?random" alt="" className="img-circle img-responsive"/>
                        <figcaption className="ratings">
                            <p>Ratings
                            <a href="#">
                                <span className="fa fa-star"></span>
                            </a>
                            <a href="#">
                                <span className="fa fa-star"></span>
                            </a>
                            <a href="#">
                                <span className="fa fa-star"></span>
                            </a>
                            <a href="#">
                                <span className="fa fa-star"></span>
                            </a>
                            <a href="#">
                                 <span className="fa fa-star-o"></span>
                            </a> 
                            </p>
                        </figcaption>
                    </figure>
                </div>
            </div>            
            <div className="col-xs-12 divider text-center">
                <div className="col-xs-12 col-sm-4 emphasis">
                    <h2><strong> 20,7K </strong></h2>                    
                    <p><small>Followers</small></p>
                    <button className="btn btn-success btn-block"><span className="fa fa-plus-circle"></span> Follow </button>
                </div>
                <div className="col-xs-12 col-sm-4 emphasis">
                    <h2><strong>245</strong></h2>                    
                    <p><small>Following</small></p>
                    <button className="btn btn-info btn-block"><span className="fa fa-user"></span> View Profile </button>
                </div>
                <div className="col-xs-12 col-sm-4 emphasis">
                    <h2><strong>43</strong></h2>                    
                    <p><small>Snippets</small></p>
                    <div className="btn-group dropup btn-block">
                      <button type="button" className="btn btn-primary"><span className="fa fa-gear"></span> Options </button>
                      <button type="button" className="btn btn-primary dropdown-toggle" data-toggle="dropdown">
                        <span className="caret"></span>
                        <span className="sr-only">Toggle Dropdown</span>
                      </button>
                      <ul className="dropdown-menu text-left" role="menu">
                        <li><a href="#"><span className="fa fa-envelope pull-right"></span> Send an email </a></li>
                        <li><a href="#"><span className="fa fa-list pull-right"></span> Add or remove from a list  </a></li>
                        <li className="divider"></li>
                        <li><a href="#"><span className="fa fa-warning pull-right"></span>Report this user for spam</a></li>
                        <li className="divider"></li>
                        <li><a href="#" className="btn disabled" role="button"> Unfollow </a></li>
                      </ul>
                    </div>
                </div>
            </div>
    	 </div> 
		</div>);
  }
  ;
}
;
export default UserProfile;



