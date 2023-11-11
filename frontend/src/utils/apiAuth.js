import { setToken, getToken } from "./token";

class ApiAuth {
  constructor(baseUrl) {
    this.baseUrl = baseUrl;
  }

  _checkResponse(res) {
    if (!res.ok) {
      return Promise.reject(`Ошибка: ${res.status}`);
    }
    return res.json();
  }

  // отрефакторил функцию
  authorize(password, email) {
    return fetch(`${this.baseUrl}/signin`, {
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

  // authorize(password, email) {
  //   return fetch(`${this.baseUrl}/signin`, {
  //     method: "POST",
  //     headers: { "Content-Type": "application/json" },
  //     body: JSON.stringify({ password, email }),
  //   })
  //     .then(this._checkResponse)
  //     .then((data) => {
  //       if (data.token) {
  //         setToken(data.token);
  //         return data;
  //       } else {
  //         console.log("NO token in response from authorize");
  //         return;
  //       }
  //     });
  // }

  signup(userData) {
    return fetch(`${this.baseUrl}/signup`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userData),
    }).then(this._checkResponse);
  }

  validateToken() {
    // const token = localStorage.getItem('jwt');
    const token = getToken();

    return fetch(`${this.baseUrl}/users/me`, {
      method: "GET",
      headers: {
        // у препода доп.заголовок Accept
	      // 'Accept': 'application/json',
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }).then(this._checkResponse);
  }
}

export const apiAuth = new ApiAuth('http://localhost:3000');
// export const apiAuth = new ApiAuth("https://auth.nomoreparties.co");
