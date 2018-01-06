import React, {Component} from 'react'

export default class Login extends Component {
    render() {
        return (
            <div>
                <div className="middlePage container">
                <div className="col-lg-7"></div>
                <div className="login-pan panel panel-info col-lg-5">
                  <div className="panel-heading">
                    <h3 className="panel-title">Please Sign In</h3>
                  </div>
                  <div className="panel-body">
                  
                  <div className="row">
                  
                
             <div className="col-md-10">
                <form className="form-horizontal">
                <fieldset>
                
                  <input id="textinput" name="textinput" type="text" placeholder="Enter User Name" className="form-control input-md"/>
                  <br/>
                  <input id="textinput" name="textinput" type="text" placeholder="Enter Password" className="form-control input-md"/>
                  <div className="spacing"><a href="#"></a><br/></div>
                  <button id="singlebutton" name="singlebutton" className="btn btn-info btn-sm pull-right">Sign In</button>
                
                
                </fieldset>
                </form>
                </div>
                    
                </div>
                    
                </div>
                </div>
               
                </div>
               
            </div>

        )
    }
}
