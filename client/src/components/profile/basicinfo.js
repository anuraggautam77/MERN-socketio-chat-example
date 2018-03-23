import React, { Component } from 'react'
import 'whatwg-fetch';
  export default class BasicInfo extends Component {

  constructor(props) {
    super (props);
    this.state = {
      editable: 'hidden',
      simpletext: '',
      formdata: {}
    };
    this.changeState = this.changeState.bind (this);
    this.saveBtnClick = this.saveBtnClick.bind (this);
  }

  componentWillReceiveProps(newprops) {
    if (newprops.userdata.hasOwnProperty ('user')) {

      var obj = {'firstName': newprops.userdata.user.firstName,
        'lastName': newprops.userdata.user.lastName,
        'city': newprops.userdata.user.city,
        'country': newprops.userdata.user.country
      }
      this.setState ({formdata: obj,edit:newprops.userdata.edit});
    }

  }

  saveBtnClick(evt) {
    let obj = {};
    Object.keys (this.refs).forEach ((key, i) => {
      obj[key] = this.refs[key].value
    });

    this.setState ({formdata: obj}, () => {
      this.SaveEnableHandler ();
    });

    this.setState ({editable: 'hidden', simpletext: ''});
  }
  ;
    SaveEnableHandler() {
    var id = window.localStorage.getItem ('userid');
    fetch (`/api/updateuserdata`, {
      method: 'post',
      body: JSON.stringify ({"formdata": this.state.formdata, 'userId': id}),
      headers: {'Content-Type': 'application/json'}
    }).then (res => res.json ()).then (json => {
    });

  }
  ;
    changeState(type) {
    Object.keys (this.refs).forEach ((key) => {
      this.refs[key].value = this.state.formdata[key] == undefined ? '' : this.state.formdata[key];
    });
    this.setState ({editable: '', simpletext: 'hidden'});
  }

  cancelClickState() {
    this.setState ({editable: 'hidden', simpletext: ''});
  }

  render() {
    return (
      <div className="panel panel-default">
        <div className="panel-heading clearfix">
          <h3 className="panel-title pull-left">Basic Information</h3>
       
      
         {
         (()=>{ 
          if(this.state.edit){
             return(<div> <a href="javascript:void(0)" className={this.state.simpletext}><i onClick={() => this.changeState ('basicinfo')} className="glyphicon glyphicon-pencil pull-right"></i></a>
             <button type="button" onClick={() => this.cancelClickState ('basicinfo')}  className={`pull-right btn btn-secondary  ${this.state.editable}`}>Cancel</button></div>)
          }
         })()
        }
      
     
      
        </div>
      
        <div className="panel-body">
          <div className="row">
            <label className="col-sm-2 col-form-label">First Name:</label>
            <div className={`col-sm-4 ${this.state.simpletext}`}>
              <div>{this.state.formdata.firstName}</div>
            </div>
            <div className={`col-sm-4 ${this.state.editable}`}>
              <input type="text" ref="firstName"   className="form-control input-sm" placeholder="fname"/>
            </div>           
      
            <label className="col-sm-2 col-form-label">Last Name:</label>
            <div className={`col-sm-4 ${this.state.simpletext}`}>
              <p> {this.state.formdata.lastName}</p>
            </div>
            <div className={`col-sm-4 ${this.state.editable}`}>
              <input type="text" ref="lastName"  className="form-control input-sm" placeholder="lastName"/>
            </div>           
          </div>
        </div>
        <div className="panel-body">
          <div className="row">
            <label className="col-sm-2 col-form-label">City:</label>
            <div className={`col-sm-4 ${this.state.simpletext}`}>
              <div>{this.state.formdata.city}</div>
            </div> 
            <div className={`col-sm-4 ${this.state.editable}`}>
              <input type="text" ref="city"    className="form-control input-sm" placeholder="City"/>
            </div> 
            <label className="col-sm-2 col-form-label">Country:</label>
            <div className={`col-sm-4 ${this.state.simpletext}`}>
              <p> {this.state.formdata.country} </p>
            </div>
            <div className={`col-sm-4 ${this.state.editable}`}>
              <input type="text" ref="country"  className="form-control input-sm" placeholder="Country"/>
            </div> 
          </div>
        </div>
      
        {(() => {
            if (this.state.editable == '') {
              return(<div className="panel-heading clearfix">
                <button type="button"  onClick={() => this.saveBtnClick ('basicinfo')} className="btn btn-primary pull-right">Save Information</button>
              </div>);
        }
      
        })()}
      
      </div>

        )
  }
}
