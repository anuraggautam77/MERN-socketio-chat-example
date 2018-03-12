import React, { Component } from 'react'
import   'whatwg-fetch';
export default class Professional extends Component {

  constructor(props) {
    super (props);
    this.state = {
       editable: 'hidden',
       simpletext: '',
       formdata:{
         occupation:'',
         company:'',
         skill:'',
         
       }
    };
    this.changeState = this.changeState.bind (this);
  }
  
  componentWillReceiveProps(newprops) {
     
    if (newprops.userdata.hasOwnProperty ('userDetail')) {
      if(newprops.userdata.userDetail.professional!==null){
         var obj = {'occupation': newprops.userdata.userDetail.professional.occupation,
        'company': newprops.userdata.userDetail.professional.company,
        'skill': newprops.userdata.userDetail.professional.skill
      }
      this.setState ({formdata: obj,edit:newprops.userdata.edit});
      } 
    }else{
        this.setState ({edit:newprops.userdata.edit}); 
    }
  }
  
  
  
     

  saveBtnClick(){
    let obj={};
    Object.keys(this.refs).forEach((key,i)=>{
      obj[key]=this.refs[key].value
    })
    this.setState ({formdata: obj}, () => {
      this.SaveEnableHandler ();
    });
     this.setState ({editable: 'hidden', simpletext: ''});
  };
  
  
  
  
  SaveEnableHandler(){
     var id = window.localStorage.getItem ('userid');
    fetch (`/api/updateuserdetail`, 
    {
      method: 'post',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify ({"professional": this.state.formdata, 'userId': id})
    }
    ).then (res => res.json ()
    ).then (json => {
      if (json.hasOwnProperty ('list')) {}
    });
  }
  
  
  

  changeState(type) {
    Object.keys(this.refs).forEach((key,i)=>{
      this.refs[key].value = this.state.formdata[key] == undefined ? '' : this.state.formdata[key];
    })
    this.setState ({editable: '', simpletext: 'hidden'});
  }

  cancelClickState(type) {
    this.setState ({editable: 'hidden', simpletext: ''});
  } 

  render() {
  return (
<div className="panel panel-default">
  <div className="panel-heading clearfix">
    <h3 className="panel-title pull-left">Professional Information</h3>
   
       {
         (()=>{ 
           
          if(this.state.edit){
              
         
            return(<div><a href="javascript:void(0)" className={this.state.simpletext}><i onClick={() => this.changeState('basicinfo')} className="glyphicon glyphicon-pencil pull-right"></i></a>
   <button type="button" onClick={() => this.cancelClickState ('basicinfo')}  className={`pull-right btn btn-secondary  ${this.state.editable}`}>Cancel</button></div>)
      
          
           }
         })()
        }
      
       
    
  </div>

   

  <div className="panel-body">
    <div className="row">
      <label className="col-sm-2 col-form-label">Occupation:</label>
      <div className={`col-sm-4 ${this.state.simpletext}`}>
        <div> {this.state.formdata.occupation}</div>
      </div> 
      <div className={`col-sm-4 ${this.state.editable}`}>
        <input type="text" ref="occupation"  className="form-control input-sm" placeholder="Ex:Art Director, Student"/>
      </div> 
      <label className="col-sm-2 col-form-label">Company:</label>
      <div className={`col-sm-4 ${this.state.simpletext}`}>
        <p> {this.state.formdata.company} </p>
      </div>
      <div className={`col-sm-4 ${this.state.editable}`}>
        <input type="text" ref="company" className="form-control input-sm" placeholder="Company"/>
      </div> 
    </div>
  </div>

  <div className="panel-body">
    <div className="row">
      <label className="col-sm-2 col-form-label">Skills:</label>
      <div className={`col-sm-4 ${this.state.simpletext}`}>
        <div> {this.state.formdata.skill}</div>
      </div> 
      <div className={`col-sm-4 ${this.state.editable}`}>
        <input type="text" ref="skill"  className="form-control input-sm" placeholder="Ex:Art Director, Student"/>
      </div> 
        
    </div>
  </div>

   

  {(() => {
  if (this.state.editable == ''){
  return(<div className="panel-heading clearfix">
    <button type="button"  onClick={() => this.saveBtnClick ('basicinfo')} className="btn btn-primary pull-right">Save Information</button>
  </div>);
  }

  })()}

</div>

    )
    }
  }
