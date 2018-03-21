import React, { Component } from "react";
import "../../style/css/profilecard.scss";
import { NavLink ,withRouter } from 'react-router-dom';
class Profilecard extends Component {

  constructor(props) {
    super (props);
    this.state = {
      name: null,
      tagline: '',
      taglineshow: this.props.hasOwnProperty ('tag') ? this.props.tag : ''
      
    };

  }

  componentWillMount() {

    if (!this.props.hasOwnProperty ('servicecall')) {
      var id = window.localStorage.getItem ('userid');
      fetch (`/api/getuserdetail/${id}`, {method: 'get', headers: {'Content-Type': 'application/json'}}
      ).then (res => res.json ()
      ).then (json => {
        if (json.hasOwnProperty ('list')) {
          var obj = {
                   'name': json.list[0].firstName + " " + json.list[0].lastName,
                    'city':json.list[0].city,
                    'country':json.list[0].country
                  }
          if (json.list[0].hasOwnProperty ('userDetail')) {
            obj.tagline = json.list[0].userDetail.hasOwnProperty ('aboutme') ? ((json.list[0].userDetail.aboutme !==null) ? json.list[0].userDetail.aboutme.tagline : ''):''
             if (json.list[0].userDetail.hasOwnProperty ('professional')) {
                obj.professional = json.list[0].userDetail.professional;
          }
          }
         
         
          this.setState (obj);
        }
      });
    }
  }

  render() {
  return (
        <div className="card">
          <div className="cardheader"></div>
          <h4 className="text-capitalize">{this.state.name}</h4>
           {(()=>{
               if (this.state.hasOwnProperty('city') && this.state.city !==''  && this.state.city !==null) {
                   return ( <p> <span className="glyphicon glyphicon-map-marker"></span>:{this.state.city} {this.state.country}</p>);
                  }
            })()} 
          
          <hr />
           {(()=>{
              
              
               if (this.state.hasOwnProperty('professional') && this.state.professional!==null) {
                  var str='', flag=false;
                  if(this.state.professional.hasOwnProperty ('occupation')){
                      str+=this.state.professional.occupation;
                    }else{
                      flag=true;
                  };
                 if(this.state.professional.hasOwnProperty ('company') &&  this.state.professional.company!=='' && 
                      this.state.professional.company!==null){
                      str+=" at " +this.state.professional.company;
                    }else{
                       flag=true;
                   };
                   
                    if(flag){
                     return (
                      <NavLink to='/profile' className="button-style" >
                         Update your Profile 
                     </NavLink>
                      )
              }else{
                  return (
                      <span>
                       <p className="title"> {str}</p>
                           <hr />
                       </span>
                      )   
              }
                     
                  }else{
                     return (
                      <NavLink to='/profile' className="button-style" >
                         Update your Profile 
                     </NavLink>
                      )
                  }
             })()} 
          
          
           {(()=>{
             
               if (this.state.tagline !=='' && this.state.tagline!==null) {
                   return (<p><span className="glyphicon glyphicon-tags"></span>&nbsp;<i>{this.state.tagline}</i></p>);
                  }
            })()} 
            
          <hr />
           
        </div>
          );
  }
  ;
}

export default Profilecard;



