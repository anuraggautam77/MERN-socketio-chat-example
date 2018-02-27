import React, { Component } from "react";
import "../../style/css/home.scss";
class Index extends Component {

  constructor(props) {
    super (props);
    this.state = {
      userList: [],
      userid: window.localStorage.getItem ('userid')
    };
    this.addFriend = this.addFriend.bind (this);
  }
  ;
    addFriend(e, id) {
    e.target.disabled = true;
    let obj = {requestedby: this.state.userid, requestedto: id};
    fetch (`/api/sendrequest`,
      {
        method: 'post',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify (obj)
      }
    ).then (res => res.json ()).then (json => {

    });
  }

  componentDidMount() {
    fetch (`/api/getuserlist/${this.state.userid}`, {method: 'get', headers: {'Content-Type': 'application/json'}}
    ).then (res => res.json ()).then (json => {
      if (json.hasOwnProperty ('list')) {
        let tempData = [];
        json.list.forEach ((val1, k) => {
          if (val1.hasOwnProperty ('friends')) {
            let isExist = false;
            val1.friends.forEach ((frnd, k) => {
              if (frnd.userid === this.state.userid) {
                isExist = true;
              }
            });
            if (!isExist) {
              tempData.push (val1);
            }
          } else {
            tempData.push (val1);
          }
        });
        this.setState ({userList: tempData});
      }
    });
  }

  newfriend(list) {
    let listItems=null;
    if (list.length > 0) {
      listItems = list.map ((obj) => {
        return (
          <div className="col-md-4 col-sm-5 col-xs-12" key={obj._id}>
            <div className="panel panel-default">
              <div className="panel-body"> 
                <img src="img/avatars/profile.png" className="image"/>
                <h4 className="text-capitalize">{obj.firstName} {obj.lastName}</h4>
                <p> {obj.email}</p>
                <button  className="btn btn-primary btn-xs"   onClick={(e) => {
              this.addFriend (e, obj._id)
          }}>
                  <i className="glyphicon glyphicon-plus"></i>
                  &nbsp; Add as friend </button>
          
                &nbsp;
                <button className="btn btn-success btn-xs" onClick={(e) => {
                this.viewProfile (obj._id)
          }}>
                  <i className="glyphicon glyphicon-envelope"></i>
                  &nbsp;View Profile</button>
              </div>
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
    var list = this.state.userList;
    return (
      <div>
        
        <div className="panel panel-default">
          <div className="panel-heading clearfix">
            <h3 className="panel-title pull-left">Suggest Friends</h3>
           </div>
           <div className="panel-body">
             {this.newfriend (list)}
             </div>
        </div>
        </div>

      );



  }
  ;
}

export default Index;
