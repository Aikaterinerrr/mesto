export default class Api {
  constructor({baseUrl, headers}) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }

  _getResponse(res) {
    if(res.ok) {
      return res.json()
    } else {
      return Promise.reject(`Ошибка: ${res.status}`);
    }
  }

  getUserInfo() {
    return fetch(this._baseUrl + '/users/me', {
      headers: this._headers
    })
    .then((res) => {
      return this._getResponse(res)
    })
  }

  setUserInfo({name, about}) {
    return fetch(this._baseUrl + '/users/me', {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({name, about})
    })
    .then((res) => {
      return this._getResponse(res)
    })
  }

  getInitialCards() {
    return fetch(this._baseUrl + '/cards', {
      headers: this._headers
    })
    .then((res) => {
      return this._getResponse(res)
    })
  }

  addCard({ name, link }) {
    return fetch(this._baseUrl + '/cards', {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({name: name, link: link})
    })
    .then((res) => {
      return this._getResponse(res)
    })
  }

  delCard({cardId}) {
    return fetch(this._baseUrl + `/cards/${cardId}`, {
      method: 'DELETE',
      headers: this._headers,
    })
    .then((res) => {
      return this._getResponse(res)
    })
  }

  removeLike({cardId}) {
    return fetch(this._baseUrl + '/cards' + `/${cardId}/likes`, {
      method: 'DELETE',
      headers: this._headers,
    })
    .then((res) => {
      return this._getResponse(res)
    })
  }

  addLike({cardId}) {
    return fetch(this._baseUrl + '/cards' + `/${cardId}/likes`, {
      method: 'PUT',
      headers: this._headers,
    })
    .then((res) => {
      return this._getResponse(res)
    })
  }

  addAvatar({inputValueData}) {
    return fetch(this._baseUrl + '/users/me/avatar', {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({avatar: inputValueData.avatar})
  })
  .then((res) => {
    return this._getResponse(res)
  })}
}
