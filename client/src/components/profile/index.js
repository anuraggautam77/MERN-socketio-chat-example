import React, { Component } from 'react';
import Header from '../header/header';
import BasicInfo from './basicinfo';
import Aboutme from './aboutme';
import Professional from './professional';


class MyProfile extends Component {

  constructor(props) {
    super (props);
    this.state={userdata:{}};
  }
   
  componentWillReceiveProps(newprops){
    this.setState({userdata:newprops.userdata})
  }
  
    render() {
    return (
      <div className="row">
        <div className="col-md-4 col-sm-4 col-xs-12">
          <div className="panel panel-default">
            <div className="panel-heading clearfix">
              <h3 className="panel-title pull-left">Proile Image</h3>
            </div>
          </div>
          <Header tag="hidden" userdata={this.state.userdata} servicecall='false'/>
      
        </div>
      
        <div className="col-md-8 col-sm-8 col-xs-12">
          <BasicInfo userdata={this.state.userdata}/>
          <Professional userdata={this.state.userdata}/>
          <Aboutme userdata={this.state.userdata}/>
        </div>
      </div>

      );
  }
}
;

export default MyProfile;
