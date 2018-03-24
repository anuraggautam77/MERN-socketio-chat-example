import PubSub from 'pubsub-js';
import 'whatwg-fetch';

export class Auth {
    constructor() {
        this.newTokenInmin = 6000;
        this.interval = null;

    }
    activeInterval() {
        clearInterval(this.interval);

        this.interval = setInterval(() => {
            this.requestNewToken();
        }, this.newTokenInmin);
    }
    stopInterval() {
        clearInterval(this.interval);
    }
    requestNewToken() {
        console.log(">>>New token >>");

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
            window.localStorage.setItem('accessToken', json.accesstoken);
        });
    }
}