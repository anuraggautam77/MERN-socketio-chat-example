import React, { Component } from 'react';

import Routing from '../../router/router';
import Header from '../header/header';
 

class DashboardLayout extends Component {

  render() {
          return (
            <div className="container">
              <div className="row">
                 <div className="card hovercard">
                     <Header/> 
                     <Routing/> 
                  </div>
                </div>
            </div>
          );
        }
}

export default DashboardLayout;
