import PubSub from 'pubsub-js';
import 'whatwg-fetch';

export class Auth {
    constructor() {
        this.newTokenInmin = 6000;
        this.interval = null;
        this.history = null;

    }
    activeInterval(history) {
        this.history = history;

        clearInterval(this.interval);
        this.interval = setInterval(() => {
            this.requestNewToken();
        }, this.newTokenInmin);
    }
    stopInterval() {
        clearInterval(this.interval);
    }
    requestNewToken() {
        fetch('/api/newtoken', {
            method: 'post',
            headers: {
                'Content-Type': 'application/json',
                'x-access-token': window.localStorage.getItem('accessToken'),
                'id': window.localStorage.getItem('userid')
            },
            body: JSON.stringify({})
        }
        ).then(res => res.json()).then(json => {
            if (json.accesstoken !== undefined) {
                window.localStorage.setItem('accessToken', json.accesstoken);
            }
            else {
                PubSub.publish('IS_LOGIN', {status: false, token: window.localStorage.getItem('accessToken')});
            }

        });
    }
}