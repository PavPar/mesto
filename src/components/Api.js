export default class Api {
    constructor(options) {
        this._options = options;
    }

    //Обращаемся к серверу
    _accessServer(method, url) {
        return fetch(this._options.baseUrl + url, {
            headers: this._options.headers,
            method: method
        })
            .then(res => {
                if (res.ok) {
                    return res.json();
                }
                return Promise.reject(res.status);
            })
            .then((result) => {
                return result;
            })
            .catch((errMsg) => {
                console.log('API: _accessServer err: ' + errMsg)
            })
    }

    getInitialCards() {
        return this._accessServer("GET", "/cards");
    }

    getUserInfo() {
        return this._accessServer("GET", "/users/me");
    }

    changeUserInfo({ name, about }) {
        return fetch(this._options.baseUrl + '/users/me', {
            method: 'PATCH',
            headers: this._options.headers,
            body: JSON.stringify({
                name: name,
                about: about
            })
        }).then(res => {
            if (res.ok) {
                return res.json();
            }
            return Promise.reject({ status: res.status, msg: res.statusText});
        }).catch(({status , msg}) => {
            console.log('Api.js Status : ' + status)
            console.log('Api.js MSG : ' + msg)
        })
    }
}

