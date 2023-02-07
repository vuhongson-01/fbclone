import { POST_COMMENTS_API } from "../../constants/api";
import http from "./http-common";

class PostCommentService {
    getList(id, body) {
        return http.post(`${POST_COMMENTS_API.getAll}/${id}`, body);
    }

    create(id, body) {
        return http.post(`${POST_COMMENTS_API.create}/${id}`, body);
    }
}

export default new PostCommentService();