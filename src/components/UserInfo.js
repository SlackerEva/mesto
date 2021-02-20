class UserInfo {
  constructor({name, info, avatar}) {
    this._name = name;
    this._info = info;
    this._avatar = avatar;
  }

  getUserInfo() {
    return {name: this._name.textContent, info: this._info.textContent};
  }

  setUserInfo(name, info) {
    this._name.textContent = name;
    this._info.textContent = info;
  }

  setUserAvatar(avatar) {
    this._avatar.src = avatar;
  }
}

export {UserInfo};