import { FRIEND_API } from "../../constants/api";
import http from "./http-common";

class FriendService {
    getFriends() {
        return http.post(`${FRIEND_API.getFriends}`);
    }

    sendRequest(body) {
        return http.post(`${FRIEND_API.sendRequest}`, body);
    }

    getRequests() {
        return http.post(`${FRIEND_API.getRequests}`);
    }

    action(body) {
        return http.post(`${FRIEND_API.action}`, body);
    }

    remove(body) {
        return http.post(`${FRIEND_API.remove}`, body);
    }

    
    status(id) {
        return http.get(`${FRIEND_API.getStatus}/${id}`);
    }

    cancelSendRequest(body) {
        return http.post(`${FRIEND_API.cancelSendRequest}`, body);
    }
}

export default new FriendService();