import React, {Component} from 'react';
import './style/css/App.scss';

import DashBoard from './components/layout/Dashboard';
import Landing from './components/layout/Landing';

class App extends Component {

  constructor(props) {
    
    super(props);
    this.state = {
      "isLoggedIn": null
    }
  };

  componentWillMount() {
    this.isLoggedIn();
  };

    
  componentDidMount() {
/*    this.checkinterval = setInterval(
      () => this.isLoggedIn(),
      1000
    );*/
  };

  componentWillUnmount() {
    clearInterval(this.checkinterval);
  };     

  isLoggedIn() {
      var boolFlag=window.localStorage.getItem('isLoggedIn');
      this.setState({
        isLoggedIn: (boolFlag !==null) ? JSON.parse(boolFlag) :false
      });
      return true;
  };
 

  render() {
    return (this.state.isLoggedIn)? <DashBoard/> : <Landing handler = {this.state}  />;
  }

}

export default App;
