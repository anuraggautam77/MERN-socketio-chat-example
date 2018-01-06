import React, { Component } from 'react';
 
import Header from '../header/header';
import LoginForm from '../../Containers/login';
 

class LandingLayout extends Component {

  render() {
          return (
            <div className="container">
              <div className="row">
                 <div className="card hovercard">
                     <Header/> 
                    <LoginForm/>
                  </div>
                </div>
            </div>
          );
        }
}

export default LandingLayout;
