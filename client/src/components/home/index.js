import React, { Component } from "react";
import "../../style/css/home.scss";
class Index extends Component {

  constructor(props) {
    super (props);
    this.state = {
      userList: []
    }
  }
  ;
    componentDidMount() {

    var id = window.localStorage.getItem ('userid');
    fetch (`/api/getuserlist/${id}`, {method: 'get', headers: {'Content-Type': 'application/json'}}
    ).then (res => res.json ()).then (json => {
      if (json.hasOwnProperty ('list')) {
        this.setState ({userList: json.list}, function () {
          // this.onViewProfileClick(json.list[0]._id);
        });
      }
    });
  }

  render() {
    var list = this.state.userList;
    let listItems = null;
    if (list.length > 0) {
      listItems = list.map ((obj) => {
        return (
          <div className="col-md-4 col-sm-5 col-xs-12" key={obj._id}>
            <div className="panel panel-default">
              <div className="panel-body"> 
                  <img src="img/avatars/profile.png" className="image"/>
                   <h4 className="text-capitalize">{obj.firstName} {obj.lastName}</h4>
                   <p> {obj.email}</p>
                  <button className="btn btn-primary btn-xs" ref="{obj._id}">
                    <i className="glyphicon glyphicon-plus"></i>
                   &nbsp; Add friend </button>
                  &nbsp;
                  <button className="btn btn-success btn-xs" ref="{obj._id}">
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

    return (
      <div>
        <div className="row">
          {listItems}
        </div>
      </div>

      );



  }
  ;
}

export default Index;
