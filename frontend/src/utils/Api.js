import { setToken, getToken } from "./token";
const { NODE_ENV, REACT_APP_API_URL } = process.env;

class Api {
  constructor(options) {
    this.options = options;
    this.baseUrl = options.baseUrl;
  }

  _checkResponse(res) {
    if (!res.ok) return Promise.reject(`Ошибка: ${res.status}`);
    return res.json(); // тут проверка ответа
  }

  authorize(password, email) {
    return fetch(`${this.options.baseUrl}/signin`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password, email }),
    })
    .then(this._checkResponse)
    .then((data) => {
      if (!data.token) console.log("NO token in response from authorize");
      setToken(data.token);
      return data;
    });
  }

  signup(userData) {
    return fetch(`${this.options.baseUrl}/signup`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userData),
    }).then(this._checkResponse);
  }

  // validateToken() {
  //   const token = getToken();
  //   return fetch(`${this.options.baseUrl}/users/me`, {
  //     method: "GET",
  //     headers: {
  //       // у препода доп.заголовок Accept
	//       // 'Accept': 'application/json',
  //       "Content-Type": "application/json",
  //       'Authorization': `Bearer ${token}`,
  //     },
  //   }).then(this._checkResponse);
  // }

  getUserInfo() {
    const token = getToken();
    return fetch(`${this.options.baseUrl}/users/me`, {
      method: "GET",
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      }
    }).then(this._checkResponse);
  }

  getInitialCards() {
    const token = getToken();
    return fetch(`${this.options.baseUrl}/cards`, {
      method: "GET",
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      }
    }).then(this._checkResponse);
  }

  changeLikeCardStatus(cardId, isLiked) {
    if (isLiked === true) {
      const token = getToken();
      return fetch(`${this.options.baseUrl}/cards/${cardId}/likes`, {
        method: "PUT",
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        }
        }).then(this._checkResponse);
    } else {
      const token = getToken();
      return fetch(`${this.options.baseUrl}/cards/${cardId}/likes`, {
        method: "DELETE",
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
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(avatar),
    }).then(this._checkResponse);
  }
}

let baseUrl = NODE_ENV === 'production' ? REACT_APP_API_URL : 'http://localhost:3000';
// let baseUrl = REACT_APP_API_URL; // для теста .env


const api = new Api({ baseUrl
  // baseUrl: "http://localhost:3000",
});

export { api };
