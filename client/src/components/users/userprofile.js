import React, { Component }
from "react";
import PubSub from 'pubsub-js';
import "../../style/css/userprofile.scss";
import  'whatwg-fetch';
class UserProfile extends Component {

  constructor(props) {
    super (props);
    this.state = {
        userDetail:'',
        ishow:'dn',
        imagedata:''
    };

    this.showUserProfile=this.showUserProfile. bind(this);
    PubSub.subscribe ('PROFILE_VIEW', this.showUserProfile);
     
  };
  
   showUserProfile(event, data){
      fetch (`/api/getuserdetail/${data.towhome}`, {method: 'get', headers: {'Content-Type': 'application/json'}}
    ).then (res => res.json ()
    ).then (json => {
      if (json.hasOwnProperty ('list')) {
        
      var obj= {'userDetail':json.list[0], ishow:'db'}
         if(json.list[0].hasOwnProperty('userDetail')){
                 obj.imagedata= json.list[0].userDetail.photodata;
            }else{
                obj.imagedata='';
            }
            
        this.setState(obj);
      }
    });
     
   };
  
 
   

  render() {
    if(this.state.ishow=='dn'){
      return (<div></div>);
    };
     return(
       <div className="userprofile-container">
    	 <div className="well profile">
            <div className="col-sm-12">
                <div className="col-xs-12 col-sm-8">
                <h2>{this.state.userDetail.firstName}  {this.state.userDetail.lastName}</h2>
                
                <h3></h3>
                
                    <p><strong>Email: </strong> {this.state.userDetail.email} </p>
                    <p><strong>Hobbies: </strong>
                    </p>
                    <p><strong>Skills: </strong>
                       <span className="tags">aaa</span> 
                    </p>
                </div>             
                <div className="col-xs-12 col-sm-4">
                   {(()=>{
                   if(this.state.imagedata!==''){
                     return (<figure>
                        <img src={this.state.imagedata} alt={this.state.userDetail.firstName} className="img-circle img-responsive"/>
                    </figure>)
                     }
                    })()}
                      
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



