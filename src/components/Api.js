export default class Api {
    constructor(options) {
        this._options = options;
    }

    errorMsgHandler({ status, statusText }) {
        console.log('Status : ' + status)
        console.log('MSG : ' + statusText)
    }

    //Обращаемся к серверу
    _getFromServer(url) {
        return fetch(this._options.baseUrl + url, {
            headers: this._options.headers,
            method: "GET"
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
    }

    _sendToServer(method, url, bodyObj) {
        return fetch(this._options.baseUrl + url, {
            method: method,
            headers: this._options.headers,
            body: JSON.stringify(bodyObj)
        }).then(res => {
            if (res.ok) {
                return res.json();
            }
            return Promise.reject({ status: res.status, msg: res.statusText });
        })
    }


    getInitialCards() {
        return this._getFromServer("/cards");
    }

    getUserInfo() {
        return this._getFromServer("/users/me");
    }

    changeUserInfo({ name, about }) {
        return this._sendToServer("PATCH", "/users/me", {
            name: name,
            about: about
        })
    }

    addNewCard({ name, link }) {
        return this._sendToServer("POST", "/cards", {
            name: name,
            link: link
        })
    }

    likeCard(){

    }

    dislikeCard(){
        
    }

}

