import React from 'react';

import Index from '../components/home/index';

class Home extends React.Component {

  render() {
    return (
      <div className="homePage">
      <div className="row">
        <div className="col-md-12 col-sm-12 col-xs-12">
            <Index/>           
        </div> 
      </div>
</div>

      );
  }
}
;

export default Home;