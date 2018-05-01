import React, { Component } from "react";
class DeviceList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            ptype: '',
            isnotify: 'dn',
            text: 'Hi {{name}}, Nice to have your',
            title: 'Lets Connect',
            isdisable: true
        };
        //  this.refs.senbutton.setAttribute('disable','disable');
        this.handleSignIn = this.sendNotification.bind(this);

    }

    sendNotification() {


        console.log(this.state);
        if (this.state.ptype == '') {
            alert('Please Select Catageory !')
            return false;
        }
        this.setState({'isdisable': true});

        fetch('/api/postnotification', {
            method: 'post',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(this.state)
        }
        ).then(res => res.json()).then(json => {
            console.log(json)
            this.setState({'isdisable': false, isnotify: 'alert alert-success bd',"alertmessage": json.message});

        });

    }

    render() {
        return (
                <div className="col-md-12">
                
                    <h3> Send Notifications</h3>
                    
                    <div className="col-md-6">
                    
                    <div className={` ${this.state.isnotify} `}>
                        <strong>{this.state.alertmessage}</strong>
                    </div>
                    
                        <div className="panel panel-default panel-order">
                            <div className="panel-body">
                                <div className="row">
                                    <div className="col-md-12">
                                        Select Catageory:
                                        <select 
                                            onChange={(event) => {
                        let disable = true;
                        if (event.target.value !== '') {
                                disable = false;
                                } 
                                            this.setState({
                                'ptype': event.target.value, 'isdisable': disable })}} 
                                            className="form-control">
                                            <option value="">Select one</option>
                                            <option value="c">Coupons</option>
                                            <option value="p">Promotions</option>
                                        </select>
                                        <br/>
                                        <br/>
                                        <p> Add your customize Notification Message below</p>  
                                        <input type="text"
                                               id="title" 
                                               value ={
                                this.state.title}
                                               className="form-control" 
                                               placeholder="Title"
                                               onChange={(event) => {
                                    this.setState({title: event.target.value})}} 
                                               />
                                        <br/> 
                                        <textarea type="text" id="body" 
                                                  value ={
                                        this.state.text} 
                                                  className="form-control"
                                                  placeholder="Hi {{name}}" 
                                                  onChange={(event) => {
                                            this.setState({text: event.target.value})}} 
                                                  />  
                                        <br/> 
                                        <button ref='senbutton' disabled={
                                                this.state.isdisable}
                                                type="button" 
                                                onClick={ (e) => {
                                                    this.sendNotification()
                  }}
                                                className="btn btn-primary">Send Notification</button> 
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                                                );
                }
            }

            export default DeviceList;



