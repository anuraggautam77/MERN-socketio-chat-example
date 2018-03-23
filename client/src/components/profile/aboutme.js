import React, { Component } from 'react'
import  'whatwg-fetch';
  export default class Aboutme extends Component {

  constructor(props) {
    super (props);
    this.state = {
      editable: 'hidden',
      simpletext: '',
      formdata: {
        description: '',
        tagline: '',
        hobby: '',
      }
    };
    this.changeState = this.changeState.bind (this);
  }

  componentWillReceiveProps(newprops) {

    console.log(newprops);
    if (newprops.userdata.hasOwnProperty ('userDetail')) {
      if(newprops.userdata.userDetail.aboutme !==null){
        var obj = {
        'description': newprops.userdata.userDetail.aboutme.description,
        'tagline': newprops.userdata.userDetail.aboutme.tagline,
        'hobby': newprops.userdata.userDetail.aboutme.hobby
      }
       this.setState ({formdata: obj,edit:newprops.userdata.edit});
      }else{
            this.setState ({edit:newprops.userdata.edit}); 
      }
     }else{
        this.setState ({edit:newprops.userdata.edit}); 
    }
  }

  changeState(type) {
    Object.keys (this.refs).forEach ((key, i) => {
       this.refs[key].value = this.state.formdata[key] == undefined ? '' : this.state.formdata[key];
    })
    this.setState ({editable: '', simpletext: 'hidden'});
  }

  saveBtnClick() {
    let obj = {};
    Object.keys (this.refs).forEach ((key, i) => {
      obj[key] = this.refs[key].value
    })
    this.setState ({formdata: obj}, () => {
      this.saveEnableHandler ();
    });
    this.setState ({editable: 'hidden', simpletext: ''});
  }
  ;
    saveEnableHandler() {
    var id = window.localStorage.getItem ('userid');
    fetch (`/api/updateuserdetail`,
      {
        method: 'post',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify ({"aboutme": this.state.formdata, 'userId': id})
      }
    ).then (res => res.json ()
    ).then (json => {
      if (json.hasOwnProperty ('list')) {
      }
    });
  }

  cancelClickState(type) {
    this.setState ({editable: 'hidden', simpletext: ''});
  }

  render() {
    return (
      <div className="panel panel-default">
        <div className="panel-heading clearfix">
          <h3 className="panel-title pull-left">About Me</h3>
          {
         (()=>{ 
          if(this.state.edit){
            return(<div><a href="javascript:void(0)" className={this.state.simpletext}><i onClick={() => this.changeState ('aboutme')} className="glyphicon glyphicon-pencil pull-right"></i></a>
          <button type="button" onClick={() => this.cancelClickState ('aboutme')}  className={`pull-right btn btn-secondary  ${this.state.editable}`}>Cancel</button></div>)
      
          
           }
         })()
        }
          
        </div>
      
        <div className="panel-body">
          <div className="row">
            <label className="col-sm-2 col-form-label">Title:</label>
            <div className={`col-sm-10 ${this.state.simpletext}`}>
              <p>{this.state.formdata.tagline}</p>
            </div>
            <div className={`col-sm-10 ${this.state.editable}`}>
              <input type="text" ref="tagline" className="form-control input-sm" placeholder="Tagline.."/>
            </div>           
          </div>
        </div>
      
        <div className="panel-body">
          <div className="row">
            <label className="col-sm-2 col-form-label">Description:</label>
            <div className={`col-sm-10 ${this.state.simpletext}`}>
              <p>{this.state.formdata.description}</p>
            </div>
            <div className={`col-sm-10 ${this.state.editable}`}>
              <textarea ref="description" className="form-control input-sm" rows="5" placeholder="About Yourself!!!!!"></textarea>
            </div>           
          </div>
        </div>
      
        <div className="panel-body">
          <div className="row">
            <label className="col-sm-2 col-form-label">Hobbies:</label>
            <div className={`col-sm-4 ${this.state.simpletext}`}>
              <div> {this.state.formdata.hobby}</div>
            </div> 
            <div className={`col-sm-4 ${this.state.editable}`}>
              <input type="text" ref="hobby"  className="form-control input-sm" placeholder="Ex:Outdoor Games, Bike Riding"/>
            </div> 
      
          </div>
        </div>
      
      
        {(() => {
          if (this.state.editable == '') {
            return(<div className="panel-heading clearfix">
    <button type="button"  onClick={() => this.saveBtnClick ('aboutme')} className="btn btn-primary pull-right">Save</button>
  </div>);
        }
        })()}
      
      </div>
        )
  }
}
