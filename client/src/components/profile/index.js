import React, { Component }
from "react";
import PubSub from 'pubsub-js';
import "../../style/css/userprofile.scss";
class UserProfile extends Component {

  constructor(props) {
    super (props);
    this.state = {
     userDetail:''
    };
    
    console.log(this);
    this.showUserProfile=this.showUserProfile. bind(this);
    PubSub.subscribe ('PROFILE_VIEW', this.showUserProfile);
     
  };
  
   showUserProfile(event, data){
      fetch (`/api/getuserdetail/${data.towhome}`, {method: 'get', headers: {'Content-Type': 'application/json'}}
    ).then (res => res.json ()
    ).then (json => {
      if (json.hasOwnProperty ('list')) {
        console.log(this.state);
        this.setState({'userDetail':json.list[0]});
      }
    });
     
   };
  
  componentWillMount() {
    
  //  console.log('aa')
    
  }
   

  render() {
     return( 
       <div className="userprofile-container">
    	 <div className="well profile">
            <div className="col-sm-12">
                <div className="col-xs-12 col-sm-8">
                <h2>{this.state.userDetail.firstName}  {this.state.userDetail.lastName}</h2>
                    <p><strong>Email: </strong> {this.state.userDetail.email} </p>
                    <p><strong>Hobbies: </strong> </p>
                    <p><strong>Skills: </strong>
                       <span className="tags">aaa</span> 
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
                     
                </div>
            </div>
    	 </div> 
		</div>);
  }
  ;
}
;
export default UserProfile;



