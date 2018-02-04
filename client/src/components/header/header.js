import React, { Component } from "react";
import "../../style/css/header.scss";



class Header extends Component{

  constructor(props){
    super(props);
    this.state={
      imagedata:null,
      name:null
    };
    
  };
  
  componentWillMount() {

    var id = window.localStorage.getItem ('userid');
    fetch (`/api/getuserdetail/${id}`, {method: 'get', headers: {'Content-Type': 'application/json'}}
    ).then (res => res.json ()
    ).then (json => {
      if (json.hasOwnProperty ('list')) {
         this.setState({'name':json.list[0].firstName[0]+""+json.list[0].lastName[0]});
      }
    });

  }
  
  

  render() {
        return (
            <div className="header-container">
                <div className="cardheader"></div>
                      <div className="avatar">
                         <div className="initials">{this.state.name}</div>
                      </div>
                    <div className="info">
                        <div className="title">
                            <a target="_blank" href="">dsadasd</a>
                        </div>
                    </div>
            </div>
        );
    };
}

export default Header;



                