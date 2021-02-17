export {Api};
class Api {
  constructor(config) {
    this._url = config.url;
    this._headers = config.headers;
  }

  editProfile(data) {
    return fetch(this._url + "users/me", {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        name: data.username,
        about: data.userjob
      })
    })
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    }); 
  }

  getProfile() {
    return fetch(this._url + "users/me", {
      headers: this._headers
    })
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    }); 
  }

  editAvatar(link) {
    return fetch(this._url + "users/me/avatar", {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        avatar: link
      })
    })
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    }); 
  }

  getInitialCards() {
    return fetch(this._url + "cards", {
      headers: this._headers
    })
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    }); 
  }

  addCard(data) {
    return fetch(this._url + "cards", {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        name: data.name,
        link: data.link
      })
    })
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    }); 
  }

  removeCard(id) {
    return fetch(this._url + "cards/" + id, {
      method: "DELETE",
      headers: this._headers
    })
    .then((res) => {
      if (res.ok) {
        console.log("DELETED " + id);
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    }); 
  }

  giveLike(id) {
    return fetch(this._url + "cards/likes/" + id, {
      method: "PUT",
      headers: this._headers
    })
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    }); 
  }

  takeLike(id) {
    return fetch(this._url + "cards/likes/" + id, {
      method: "DELETE",
      headers: this._headers
    })
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    }); 
  }
}