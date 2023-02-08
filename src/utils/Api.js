class Api {
  constructor({ url, headers }) {
    this.url = url;
    this.headers = headers;
  }

  getNavBarItems(token, id) {
    return fetch(`${this.url}/navibars?filters[departs][id]=${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }).then(this._handleResponse);
  }

  getInitialWallets(token) {
    return fetch(`${this.url}/wallets?populate=*`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }).then(this._handleResponse);
  }

  getWallets(token, id) {
    return fetch(`${this.url}/wallets?filters[user][id]=${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }).then(this._handleResponse);
  }

  addUserWallet(token, wallet) {
    return fetch(`${this.url}/wallets`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(wallet),
    }).then(this._handleResponse);
  }

  deleteUserWallet(token, id) {
    return fetch(`${this.url}/wallets/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }).then((res) => res);
  }

  _handleResponse = (res) => {
    if (res.ok) {
      return res.json();
    }
    // если ошибка, отклоняем промис
    console.log(res);
    return Promise.reject(`Ошибка: ${res.status}`);
  };
}
const api = new Api({
  url: "http://192.168.1.105:1337/DELETE_ME",
  // url: "http://localhost:1337/api",
});
export default api;
