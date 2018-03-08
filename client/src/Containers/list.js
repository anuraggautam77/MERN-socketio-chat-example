import React, { Component } from 'react'
import Authentication from './authenticate';
import Chatwindow from '../components/chatwindow/chatwindow';
import UserList from '../components/users/userlist';
import UserProfile from '../components/users/userprofile';
export default class List extends Component {
   
    
  constructor(props) {
    super (props);
    this.state = {
      renderActual: false
    };
    this.mountedorNot = this.mountedorNot.bind (this);
  }
   mountedorNot(set) {
    this.setState ({renderActual: set});
  }
  ;
    
  render() {
    return (
      <div>
       
        <Authentication  onComponentDidMount={this.mountedorNot}/>
         { this.state.renderActual && 
           <div className="row">
           <div className="col-md-4">
            <div className="panel panel-default"> 
                 <UserList/>
            </div>
           </div> 
          <div className="col-md-8">
                <UserProfile/>
                
          </div>	
          <Chatwindow/> 
        </div> 
        }
        
        
        
         
      </div>
      )
  }
}
