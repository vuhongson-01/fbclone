import { CHAT_API } from "../../constants/api";
import http from "./http-common";

class ChatService {
    sendMessage(body) {
        return http.post(`${CHAT_API.sendMessage}`, body)
    }
    getSingleChat(chatId) {
        return http.get(`${CHAT_API.getSingleChat}/${chatId}`)
    }
    getAllChats() {
        return http.get(`${CHAT_API.getAllChats}/`)
    }
}

export default new ChatService()