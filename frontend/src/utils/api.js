const onError = (res) => {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject('Сервер не доступен')
}

class Api {
  constructor(config) {
    this._url = config.url;
    this._headers = config.headers;
  }

  
  
  getUserInfo() {
    return fetch(`${this._url}users/me`, {
      method: "GET",
      headers: this._headers
    })
      .then(onError)
  }

  sendUserInfo(inputData) {
    return fetch(`${this._url}users/me`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        name: inputData.name,
        about: inputData.about
      })
    })
      .then(onError)
  }

  initialCard(handleGetCard) {
    return fetch(`${this._url}cards`, {
      headers: this._headers
    })
      .then(onError)
  }

  addCard(inputData) {
    return fetch(`${this._url}cards`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({
        name: inputData.name,
        link: inputData.link
      })
    })
      .then(onError)
  }

  deleteCard(idCard) {
    return fetch(`${this._url}cards/${idCard}`, {
      method: "DELETE",
      headers: this._headers
    })
      .then(onError)
  }

  changeLikeCardStatus(idCard, isLike) {
    return fetch(`${this._url}cards/${idCard}/likes`, {
      method: isLike ? "PUT" : "DELETE",
      headers: this._headers
    })
      .then(onError)
  }



  updateAvatar(avatarLink) {
    return fetch(`${this._url}users/me/avatar`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        avatar: avatarLink.avatar
      })
    })
      .then(onError)
  }
};

const api = new Api({
  url: "https://api.stepalin.students.nomoredomains.monster/",
  //url: 'http://localhost:3005/',
  headers: {
    authorization: `Bearer ${localStorage.getItem('token')}`,
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*"
  }
});

export default api;