import React, { Component } from "react";
import "../../style/css/header.scss";



class Header extends Component {

  constructor(props) {
     super (props);
    this.state = {
      name: null,
      image: '',
      imageshow:'hidden',
      initialshow:'initials',
      taglineshow: this.props.hasOwnProperty('tag')? this.props.tag:''
    };
    this.fileSelect = this.fileSelect.bind (this);
  }  ;
  
  
  
  
  fileSelect(e) {
    e.preventDefault ();
    this.refs.fileElem.click ();
  }


  handleFiles(e) {
    e.preventDefault ();
    var reader = new FileReader ();
    reader.onload = (data) => {
      this.setState ({
        image: reader.result,
        imageshow:'',
        initialshow:'hidden'
      });
      this.updateImage(reader.result);
    };
      console.log(e);
    reader.readAsDataURL (e.target.files[0]);
  }

  
  updateImage(data){
     var id = window.localStorage.getItem ('userid');
    fetch (`/api/updateuserdetail`, 
    {
      method: 'post',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify ({"imagedata":data,'userId':id})
    }
    ).then (res => res.json ()
    ).then (json => {
      if (json.hasOwnProperty ('list')) {}
    });
    
    
  };

  componentWillReceiveProps(newprops){
    if (newprops.userdata.hasOwnProperty ('user')) {
       var obj ={'name': newprops.userdata.user.firstName[0]+ "" + newprops.userdata.user.lastName[0]}
        if(newprops.userdata.hasOwnProperty('userDetail')){
                 obj.image= newprops.userdata.userDetail.photodata;
                 obj.imageshow='';
                 obj.initialshow='hidden';
            }
            this.setState(obj);
        }
      
  }

 componentWillMount() {
   
   if(!this.props.hasOwnProperty('servicecall')){
 var id = window.localStorage.getItem ('userid');
    fetch (`/api/getuserdetail/${id}`, {method: 'get', headers: {'Content-Type': 'application/json'}}
    ).then (res => res.json ()
    ).then (json => {
      if (json.hasOwnProperty ('list')) {
       var obj ={'name': json.list[0].firstName[0] + "" + json.list[0].lastName[0]};
        if(json.list[0].hasOwnProperty('userDetail')){
                 obj.image= json.list[0].userDetail.photodata;
                 obj.imageshow='';
                 obj.initialshow='hidden';
            }
           this.setState(obj);
        }
      });
    } 
  }

  
  render() {
     
    return (
      <div className="header-container">
        <div className="cardheader"></div>
        <div className="avatar">
          <div className={this.state.initialshow} onClick={this.fileSelect}>{this.state.name}</div>
            <img src={this.state.image} className={this.state.imageshow} alt={this.state.name} onClick={this.fileSelect}  />
        </div>
        <div className={`info ${this.state.taglineshow}` }>
          <div className="title">
            <a target="_blank" href="">dsadasd</a>
          </div>
        </div>
        <input type="file" className="hidden" ref="fileElem" multiple accept="image/*"
          onChange={this.handleFiles.bind(this)}/>
      </div>
      );
  }
  ;
}

export default Header;



                