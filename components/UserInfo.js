export {UserInfo};
class UserInfo {
  constructor({name, info}) {
    this._name = name;
    this._info = info;
  }

  getUserInfo() {
    return {name: this._name, info: this._info};
  }

  setUserInfo(nameInput, jobInput) {
    this._name = nameInput.value;
    this._info = jobInput.value;
  }
}