export default class Api {
  constructor(config) {
    this._url = config.url;
    this._headers = config.headers;
  }

  getAllCards() {
      return fetch(`${this._url}cards`, {
          headers: this._headers,
      }).then((res) => {
          if (res.ok) {
              return res.json();
          }

          return Promise.reject(`Ошибка: ${res.status}`);
      });
  }

  deleteCard(id) {
      return fetch(`${this._url}cards/${id}`, {
          method: "DELETE",
          headers: this._headers,
      }).then((res) => {
          if (res.ok) {
              return res.json();
          }

          return Promise.reject(`Ошибка: ${res.status}`);
      });
  }

  addCard(data) {
      return fetch(`${this._url}cards`, {
          method: "POST",
          headers: this._headers,
          body: JSON.stringify({
            name: data.name,
            link: data.link
          }),
      }).then((res) => {
          if (res.ok) {
              return res.json();
          }

          return Promise.reject(`Ошибка: ${res.status}`);
      });
  }

  getUserInfo() {
    return fetch(`${this._url}users/me`, {
        headers: this._headers,
    }).then((res) => {
        if (res.ok) {
            return res.json();
        }

        return Promise.reject(`Ошибка: ${res.status}`);
    });
  }

  updateUserInfo(data) {
    return fetch(`${this._url}users/me`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        name: data.name,
        about: data.about
      })
    }).then((res) => {
        if (res.ok) {
            return res.json();
        }

        return Promise.reject(`Ошибка: ${res.status}`);
    });
  }

  updateUserAvatar(data) {
    return fetch(`${this._url}users/me/avatar`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        avatar: data.avatar
      })
    }).then((res) => {
        if (res.ok) {
            return res.json();
        }

        return Promise.reject(`Ошибка: ${res.status}`);
    });
  }

  setLike(id) {
    return fetch(`${this._url}cards/likes/${id}`, {
        method: "PUT",
        headers: this._headers,
    }).then((res) => {
        if (res.ok) {
            return res.json();
        }

        return Promise.reject(`Ошибка: ${res.status}`);
    });
  }

  removeLike(id) {
    return fetch(`${this._url}cards/likes/${id}`, {
        method: "DELETE",
        headers: this._headers,
    }).then((res) => {
        if (res.ok) {
            return res.json();
        }

        return Promise.reject(`Ошибка: ${res.status}`);
    });
  }
}