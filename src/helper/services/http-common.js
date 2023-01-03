import axios from "axios";
import { BASE_URL } from "../../constants/constants";
import { useSelector } from 'react-redux';

// get token from redux
// const token = useSelector(state => state.auth.token);

// change token after login

const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImxlbWFuaGN1b25nIiwiaWQiOiI2MzlkODVmNzY1OGQ4NzBkNjRmYzk2NTYiLCJpYXQiOjE2NzE2ODIwNzF9.ZfYs6GnbpelX3V6VaAGOAxNIBLC2x8tp-t31Hj_I5Pc';


export default axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-type": "application/json",
    "Authorization": `Bearer ${token}`
  }
});