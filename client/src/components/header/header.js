import React, { Component } from "react";
import "../../style/css/header.scss";
import 'whatwg-fetch';



class Header extends Component {

  constructor(props) {
    super (props);
    this.state = {
      name: null,
      file: null,
      image: '',
      tagline:'',
      imageshow: 'hidden',
      initialshow: 'initials',
      taglineshow: this.props.hasOwnProperty ('tag') ? this.props.tag : ''
    };
    this.handleUploadImage = this.handleUploadImage.bind (this);
    this.onChange = this.onChange.bind (this);
  }
  ;
    onChange(e) {
    this.setState ({file: e.target.files[0]})
  }

  updateImage(data) {
    var id = window.localStorage.getItem ('userid');
    fetch (`/api/updateuserdetail`,
      {
        method: 'post',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify ({"imagedata": data, 'userId': id})
      }
    ).then (res => res.json ()
    ).then (json => {
      if (json.hasOwnProperty ('list')) {
      }
    });

  }

  handleUploadImage(ev) {
    ev.preventDefault ();
    const data = new FormData ();
    data.append ('file', this.uploadInput.files[0]);
    data.append ('filename', this.uploadInput.files[0].name);
    fetch ('/api/uploads', {
      method: 'POST',
      body: data,
    }).then ((response) => {
      response.json ().then ((body) => {

        this.setState ({
          image: body.file,
          imageshow: '',
          initialshow: 'hidden'
        });

      });
    });
  }

  componentWillReceiveProps(newprops) {
    if (newprops.userdata.hasOwnProperty ('user')) {
      var obj = {'name': newprops.userdata.user.firstName[0] + "" + newprops.userdata.user.lastName[0]}
      if (newprops.userdata.hasOwnProperty ('userDetail')) {
        obj.image = newprops.userdata.userDetail.photodata;
        obj.imageshow = '';
        obj.initialshow = 'hidden';
      }
      this.setState (obj);
    }

  }

  componentWillMount() {

    if (!this.props.hasOwnProperty ('servicecall')) {
      var id = window.localStorage.getItem ('userid');
      fetch (`/api/getuserdetail/${id}`, {method: 'get', headers: {'Content-Type': 'application/json'}}
      ).then (res => res.json ()
      ).then (json => {
        if (json.hasOwnProperty ('list')) {
          console.log(json);
          var obj = {'name': json.list[0].firstName[0] + "" + json.list[0].lastName[0]};
          if (json.list[0].hasOwnProperty ('userDetail')) {
            obj.image = json.list[0].userDetail.photodata;
            obj.imageshow = '';
            obj.initialshow = 'hidden',
            obj.tagline= json.list[0].userDetail.hasOwnProperty('aboutme')?json.list[0].userDetail.aboutme.tagline:''
          }
          this.setState (obj);
        }
      });
    }
  }

  render() {
   //onClick={(e) => { e.preventDefault (); this.uploadInput.click (); }}
   console.log(this.state);
    return (
      <div className="header-container">
      
        <div className="cardheader"></div>
        <form onSubmit={this.handleUploadImage}>
          <div className="avatar">
            <div className={this.state.initialshow} 
            >{this.state.name}</div>
            <img src={this.state.image} className={this.state.imageshow} alt={this.state.name}  />
          </div>
          <div className={`info ${this.state.taglineshow}` }>
            <div className="title">
              <h5 title='Add your Tagline from About me section '>{this.state.tagline}</h5>
            </div>
          </div>
          <input type="file" multiple= {this.props.multiple} className="hidden" 
          ref={(ref) => { this.uploadInput = ref; }}   name="profile_pic"  accept="image/*" 
            onChange ={(e) => { e.preventDefault (); this.refs.submitbttn.click ();
      }} />
          <button className="hidden" ref="submitbttn" type="submit"></button>
      
        </form>
              
                         
      </div>
              );
  }
  ;
}

export default Header;



