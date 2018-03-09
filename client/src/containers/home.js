import React from 'react';
import Authentication from './authenticate';
import Index from '../components/home/index';

class Home extends React.Component {

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
      <div className="homePage">
      
        <Authentication  check={this.mountedorNot}/>
         { this.state.renderActual && <Index/> }
           
      </div>

      );
  }
}
;

export default Home;
