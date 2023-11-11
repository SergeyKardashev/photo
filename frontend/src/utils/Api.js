class Api {
  constructor(options) {
    this.options = options;
    this.baseUrl = options.baseUrl;
  }

  _checkResponse(res) {
    if (!res.ok) {
      return Promise.reject(`Ошибка: ${res.status}`);
    }
    return res.json(); // тут проверка ответа
  }

  getUserInfo() {
    const token = localStorage.getItem('jwt');

    return fetch(`${this.options.baseUrl}/users/me`, {
      method: "GET",
      // headers: this.options.headers,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      }
    }).then(this._checkResponse);
  }

  getInitialCards() {
    const token = localStorage.getItem('jwt');

    return fetch(`${this.options.baseUrl}/cards`, {
      method: "GET",
      // headers: this.options.headers,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      }
    }).then(this._checkResponse);
  }

  changeLikeCardStatus(cardId, isLiked) {
    if (isLiked === true) {
      const token = localStorage.getItem('jwt');

      return fetch(`${this.options.baseUrl}/cards/${cardId}/likes`, {
        method: "PUT",
        // headers: this.options.headers,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      }
      }).then(this._checkResponse);
    } else {
      const token = localStorage.getItem('jwt');

      return fetch(`${this.options.baseUrl}/cards/${cardId}/likes`, {
        method: "DELETE",
        // headers: this.options.headers,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      }
      }).then(this._checkResponse);
    }
  }

  setUserInfo(inputValues) {
    const token = localStorage.getItem('jwt');

    return fetch(`${this.options.baseUrl}/users/me`, {
      method: "PATCH",
      // headers: this.options.headers,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(inputValues),
    }).then(this._checkResponse);
  }

  addCard(cardData) {
    const token = localStorage.getItem('jwt');

    return fetch(`${this.options.baseUrl}/cards`, {
      method: "POST",
      // headers: this.options.headers,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify({ name: cardData.name, link: cardData.link }),
    }).then(this._checkResponse);
  }

  deleteCard(cardId) {
    const token = localStorage.getItem('jwt');

    return fetch(`${this.options.baseUrl}/cards/${cardId}`, {
      method: "DELETE",
      // headers: this.options.headers,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    }).then(this._checkResponse);
  }

  setUserAvatar(avatar) {
    const token = localStorage.getItem('jwt');

    return fetch(`${this.options.baseUrl}/users/me/avatar`, {
      method: "PATCH",
      // headers: this.options.headers,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(avatar),
    }).then(this._checkResponse);
  }
}

const api = new Api({
  baseUrl: "http://localhost:3000",
  // baseAuthUrl: "https://auth.nomoreparties.co",

  // baseUrl: "https://mesto.nomoreparties.co/v1/cohort-72",
  // headers: {
  //   authorization: "ae5a51f8-81eb-4b98-b197-2ef227e48cb1",
  //   "Content-Type": "application/json",
  // },
});

export { api };
