import React, { Component } from 'react';

import Header from '../header/header';
import LoginForm from '../../Containers/login';

class LandingLayout extends Component {

  constructor(props) {
    super (props);
    var propsData = this.props;
    console.log (">>1");
  }

  render() {
    console.log (">>2");
    console.log (">>>>>>", this.propsData);
    return (
      <div className="container">
        <div className="row">
          <div className="card hovercard">
            <Header/>  
            <LoginForm statedata={this.propsData} />
          </div>
        </div>
      </div>
      );
  }
}
;

export default LandingLayout;
