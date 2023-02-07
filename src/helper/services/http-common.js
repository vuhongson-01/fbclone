import axios from "axios";
import { BASE_URL } from "../../constants/constants";

export default axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-type": "application/json",
  }
});