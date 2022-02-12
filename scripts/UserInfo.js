export default class UserInfo {
  constructor({ userName, userInfo }) {
    this._userName = document.querySelector(userName);;
    this._userInfo = document.querySelector(userInfo);
  }

  getUserInfo() {
    this._userValues = {};
    this._userValues.name = this._userName.textContent;
    this._userValues.info = this._userInfo.textContent;

    return this._userValues;
  }

  setUserInfo({ newUserName, newUserInfo}) {
    this._userName.textContent = newUserName;
    this._userInfo.textContent = newUserInfo;
  }
}
