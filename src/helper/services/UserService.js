import {USER_API} from '../../constants/api';
import http from './http-common';

class UserService {
  getCurrentUser() {
    return http.get(`${USER_API.getUser}`);
  }

  get(id) {
    return http.get(`${USER_API.getUser}/${id}`);
  }

  getList() {
    return http.get(`${USER_API.getUser}`);
  }

  register(body) {
    return http.post(`${USER_API.register}`, body);
  }

  login(body) {
    return http.post(`${USER_API.login}`, body);
  }

  edit(body) {
    return http.post(`${USER_API.editProfile}`, body);
  }

  changePassword(body) {
    return http.post(`${USER_API.changePassword}`, body);
  }

  block(body) {
    return http.post(`${USER_API.setBlockUser}`, body);
  }

  blockDiary(body) {
    return http.post(`${USER_API.setBlockUserDiary}`, body);
  }

  search(body) {
    return http.post(`${USER_API.search}`, body);
  }
}

export default new UserService();
