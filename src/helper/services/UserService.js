import {USER_API} from '../../constants/api';
import http from './http-common';

class UserService {
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

  edit(id, body) {
    return http.post(`${USER_API.editProfile}/${id}`, body);
  }

  changePassword(body) {
    return http.post(`${USER_API.changePassword}`, body);
  }

  block(body) {
    return http.post(`${USER_API.setBlockUser}`, body);
  }
}

export default new UserService();
