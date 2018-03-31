import React, {Component} from 'react';
import { withRouter } from "react-router-dom";

class Authentication extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    componentWillMount() {

        fetch('/api/authvalidate', {
            method: 'post',
            headers: {
                'Content-Type': 'application/json',
                'x-access-token': window.localStorage.getItem('accessToken'),
                'id': window.localStorage.getItem('userid')
            },
            body: JSON.stringify({})
        }
        ).then(res => res.json()).then(json => {

            if (json.status!== 200) {
                this.props.check(false);
                PubSub.publish('IS_LOGIN', {status: false, token: window.localStorage.getItem('accessToken')});
                this.props.history.push("/login");

            }
            else {
                this.props.check(true);
                console.info("valid Token!!");
            }
        });
    }
    render() {
        return ('');
    }
}
export default withRouter(Authentication);