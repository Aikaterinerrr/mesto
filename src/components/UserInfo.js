export default class UserInfo {
  constructor({ userName, userInfo, userAvatar }) {
    this._userName = document.querySelector(userName);;
    this._userInfo = document.querySelector(userInfo);
    this._userAvatar = document.querySelector(userAvatar)
  }

  getUserInfo() {
    return {
      name:  this._userName.textContent,
      about: this._userInfo.textContent
    }
  }

  setUserInfo({newName, newJob, newAvatar}) {
    this._userName.textContent = newName;
    this._userInfo.textContent = newJob;
    this.setAvatar(newAvatar);
  }

  setAvatar(newAvatar) {
    this._userAvatar.style.backgroundImage = `url(${newAvatar})`;
  }
}
