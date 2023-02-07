import { POSTS_API } from "../../constants/api";
import http from "./http-common";

class PostService {
    getList(userId, skip, limit) {
        return http.get(`${POSTS_API.getList}?userId=${userId}&skip=${skip}&limit=${limit}`);
    }

    create(body) {
        return http.post(`${POSTS_API.create}`, body);
    }

    edit(id, body) {
        return http.post(`${POSTS_API.edit}/${id}`, body);
    }
    
    getById(id) {
        return http.get(`${POSTS_API.getById}/${id}`);
    }

    delete(id) {
        return http.post(`${POSTS_API.delete}/${id}`);
    }

    like(id) {
        return http.post(`${POSTS_API.like}/${id}`);
    }

    search(body) {
        return http.post(`${POSTS_API.search}`, body);
    }

    report(id, body) {
        return http.post(`${POSTS_API.report}/${id}`, body);
    }
}

export default new PostService();