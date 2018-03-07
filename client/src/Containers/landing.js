import React, { Component } from 'react';

import Profilecard from '../components/profile/profilecard';
import Listing from '../components/mypost/listing';
class Landing extends Component {

constructor(props) {
super (props);
  this.state = {
  currentuser: window.localStorage.getItem ('userid')
  };
}

render() {
return (
<div className="main-landing row content">

  {
  (() => {
  if (this.state.currentuser) {
  return (
  <div className="landing-page">
    <div className="col-md-3 col-sm-6 proilecard"> 
       <Profilecard/>
    </div>
    <div className="col-md-7 col-sm-6">
        <Listing forall="true"/>
    </div>
    <div className="col-md-2 col-sm-6 proilecard">
        <Profilecard/>
    </div>
  </div>
  );
  }else{
    return (
  <div>
    <div className="col-md-8 col-sm-8">
         <Listing forall="true"/>
    </div>
    <div className="col-md-4 col-sm-4"> 
      
    </div>
  </div>
      );
  }

  })()
  }
</div>


    );
}
}
;

export default Landing;
