export default class UserInfo {
  constructor({ nameSelector, jobSelector, avatarSelector }) {
    this._nameElement = document.querySelector(nameSelector);
    this._jobElement = document.querySelector(jobSelector);
    this._avatarElement = document.querySelector(avatarSelector);
  }

  getUserInfo() {
    return {
      name: this._nameElement.textContent,
      job: this._jobElement.textContent,
    };
  }

  getAvatar() {
    return this._avatarElement;
  }

  setAvatarInfo(avatar) {
    this._avatarElement.src = avatar;
  }
  setUserInfo({ title, job }) {
    this._nameElement.textContent = title;
    this._jobElement.textContent = job;
  }
}
