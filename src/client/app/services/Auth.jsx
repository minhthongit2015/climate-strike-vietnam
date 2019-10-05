import superagent from 'superagent';
import { ApiEndpoints } from '../utils/Constants';
import FbService from './FbService';
import UserService from './UserService';

export default class Auth {
  static async init() {
    await FbService.init();
    await this.checkLoginStatus();
  }

  static async checkLoginStatus() {
    await FbService.fetchLoginStatus(); // For Access_Token
    await Promise.all([
      FbService.fetchProfile(), // For name, email, age...
      UserService.fetchUser() // For permissions
    ]);
  }

  static async fbLogin() {
    await FbService.login();
    await Promise.all([
      FbService.fetchProfile(),
      UserService.fetchUser()
    ]);
  }

  static async fbLogout() {
    return FbService.logout();
  }

  static signin(username, password) {
    return superagent.post(ApiEndpoints.user.SIGN_IN).withCredentials()
      .send({ username, password });
  }

  static async logout() {
    await Promise.all([
      FbService.logout(),
      UserService.logout()
    ]);
  }
}
