import React, { Component } from 'react';
import LoginForm from '../../Containers/login';
class LandingLayout extends Component {

  constructor(props) {
    super (props);
    this.state=props;
  }

  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="card hovercard">
            
            <LoginForm/>
          </div>
        </div>
      </div>
      );
  }
}
;

export default LandingLayout;
