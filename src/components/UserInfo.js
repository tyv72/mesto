export default class UserInfo {
  constructor(nameFieldSelector, aboutFieldSelector) {
    this._name = document.querySelector(nameFieldSelector).value;
    this._about = document.querySelector(aboutFieldSelector).value;
  }

  getUserInfo() {
    return {
      name: this._name,
      about: this._about
    };
  }

  setUserInfo({name, about}) {
    this._name = name;
    this._about = about;
  }
}