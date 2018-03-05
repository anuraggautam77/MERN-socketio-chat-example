import React, { Component } from 'react';
 import LoginForm from '../../Containers/login';
 class LandingLayout extends Component {

  constructor(props) {
    super (props);
    this.state=props;
  }

  render() {
    return ( <LoginForm/> );
  }
}
;

export default LandingLayout;
