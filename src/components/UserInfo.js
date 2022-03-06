export default class UserInfo {
  constructor({ userName, userInfo, userAvatar }) {
    this._userName = document.querySelector(userName);;
    this._userInfo = document.querySelector(userInfo);
    this._userAvatar = document.querySelector(userAvatar)
  }

  getUserInfo() {
    return {
      name: this._userName.textContent,
      about: this._userInfo.textContent
    }
  }

  setUserInfo({ name, about, avatar }) {
    this._userName.textContent = name;
    this._userInfo.textContent = about;
    this.setAvatar(avatar);
  }

  setAvatar(avatar) {
    this._userAvatar.style.backgroundImage = `url(${avatar})`;
  }
}
