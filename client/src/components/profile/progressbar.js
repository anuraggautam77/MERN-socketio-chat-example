import React, { Component } from 'react';
import '../../style/css/progressbar.scss';

export default class Progressbar extends Component {


 constructor(props) {
    super (props);
   this.state={'className':''};
    
  }
  
  
  
  componentWillReceiveProps(newprops) { 
    
    this.className='';
   // console.log(newprops.percentage);
    switch (newprops.percentage) {
       case 100:
        this.className='green';
          break;
      case 75:
        this.className='blue';
        break
      case 50:
        this.className='yellow';
      
       break
      case 25:
        this.className='pink'  
      break;
    
    }
    
    this.setState({'className':this.className})
  
  }
  
  


  render() {
    return (
      <div className="profile-progress">
        <div className={`progress ${this.state.className}`}>
          <span className="progress-left">
            <span className="progress-bar"></span>
          </span>
          <span className="progress-right">
            <span className="progress-bar"></span>
          </span>
          <div className="progress-value">{this.props.percentage}%</div>
        </div>
      </div>

      )
  }
}
