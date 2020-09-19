export default class UserInfo {
  constructor(nameFieldSelector, aboutFieldSelector) {
    this._name = document.querySelector(nameFieldSelector).value;
    this._about = document.querySelector(aboutFieldSelector).value;
  }

  getUserId() {
    return this._id;
  }

  getUserInfo() {
    return {
      _id: this._id,
      name: this._name,
      about: this._about,
      avatar: this._avatar
    };
  }

  setUserInfo(_id, name, about) {
    this._id = _id;
    this._name = name;
    this._about = about;
  }

  setUserAvatar(avatar) {
    this._avatar = avatar;
  }
}