class Auth {
  constructor({ url, headers }) {
    this.url = url;
    this.headers = headers;
  }

  authorized({ identifier, password }) {
    return fetch(`${this.url}/auth/local`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ identifier: identifier, password: password }),
    })
      .then(this._handleResponse)
      .then((data) => {
        if (data) {
          return data;
        } else {
          return;
        }
      });
  }

  getAuthMe(token) {
    return fetch(`${this.url}/users/me?populate=*`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }).then(this._handleResponse);
  }
  _handleResponse = (res) => {
    if (res.ok) {
      return res.json();
    }
    // если ошибка, отклоняем промис
    return Promise.reject(`Ошибка: ${res.status}`);
  };
}
const auth = new Auth({
  url: "http://192.168.1.105:1337/api",
  // url: "http://localhost:1337/api",
});
export default auth;
