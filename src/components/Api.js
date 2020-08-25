export default class Api {
    constructor(options) {
        this._options = options;
    }

    errorMsgHandler({ status, statusText }) {
        console.log('Status : ' + status)
        console.log('MSG : ' + statusText)
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
    }

    _sendDataToServer(method, url, bodyObj) {
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
        return this._accessServer("GET","/cards");
    }

    getUserInfo() {
        return this._accessServer("GET","/users/me");
    }

    changeUserInfo({ name, about }) {
        return this._sendDataToServer("PATCH", "/users/me", {
            name: name,
            about: about
        })
    }

    addNewCard({ name, link }) {
        return this._sendDataToServer("POST", "/cards", {
            name: name,
            link: link
        })
    }

    likeCard(cardId) {
        return this._accessServer("PUT", "/cards/likes/" + cardId)
    }

    dislikeCard(cardId) {
        return this._accessServer("DELETE", "/cards/likes/" + cardId)
    }

    deleteCard(cardId){
        return this._accessServer("DELETE", "/cards/" + cardId)
    }
}

