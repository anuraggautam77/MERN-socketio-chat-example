import React, {Component} from 'react';
import { withRouter } from "react-router-dom";

 class Authentication extends Component {

  constructor(props) {
    super (props);
    this.state = {}
  }
  ;
  componentWillMount() {
 
    fetch ('/api/authvalidate', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
        'x-access-token': window.localStorage.getItem ('accessToken')
      },
      body: JSON.stringify ({})
    }
    ).then (res => res.json ()).then (json => {
     
      if (json.statuscode === 403) {
         console.info ("Invalid Token!!");
         PubSub.publish ('IS_LOGIN', {status: false, token: window.localStorage.getItem ('accessToken')}); 
        this.props.history.push ("/login");
      }else{
           console.info ("valid Token!!");
      }
    });
  }
  
  componentDidMount() {
    this.props.onComponentDidMount && this.props.onComponentDidMount()
  }
  

  render() {
    return ('');
  }
}
  export default withRouter(Authentication) ;