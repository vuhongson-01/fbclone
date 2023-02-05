import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import moment from 'moment/moment';
import { httpStatus } from '../../constants/constants';
import UserService from '../../helper/services/UserService';
import { deleteAllUsers, getToken, insertUser } from '../../helper/sqlite/user_query';
import { setAuthToken } from '../../utils/utils';

const initialState = {
  authLoading: true,
  isAuthenticated: false,
  user: null,
};

// Authenticate user
export const loadUser = createAsyncThunk('auth/loadUser', async () => {
  try {
    const token = await getToken();
    if (token) {
      setAuthToken(token);

      const response = await UserService.getCurrentUser();
      console.log(response);
      if (response.status != httpStatus.OK) {
        deleteAllUsers();
        setAuthToken(null);
        return { isAuthenticated: false, user: null }
      }

      return { isAuthenticated: true, user: response.data.data }
    }

    return { isAuthenticated: false, user: null }
  } catch (error) {
    // delete token in sqlite
    console.log(error.message)
    deleteAllUsers();
    setAuthToken(null);
    return { isAuthenticated: false, user: null }
  }
})

// Login
export const loginUser = createAsyncThunk('auth/login', async (loginForm) => {
  try {
    const response = await UserService.login(loginForm);

    if (response.status == httpStatus.OK) {
      console.log(response.data);
      const { data: { _id, phonenumber, username, avatar }, token } = response.data;
      setAuthToken(token);
      let res = await insertUser([_id, phonenumber, username, loginForm.password, response.data.token, moment().valueOf().toString()]);
      if (res?.code == 0) {
        return { success: false, message: 'Đã xảy ra lỗi khi lưu thông tin đăng nhập' }
      }
      return { success: true, user: response.data.data }
    }
    return { success: false, message: 'Tên đăng nhập hoặc mật khẩu chưa chính xác' }
  } catch (error) {
    console.log(error);
    if (error.response.data) return { success: false, ...error.response.data };
    else return { success: false, message: error.message };
  }
});

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logoutUser: (state) => {
      deleteAllUsers();
      setAuthToken(null);
      state.authLoading = false;
      state.isAuthenticated = false;
      state.user = null;
    }
  },
  extraReducers: builder => {
    builder
      .addCase(loadUser.pending, (state) => {
        state.authLoading = true;
      })
      .addCase(loadUser.fulfilled, (state, action) => {
        state.authLoading = false;
        state.isAuthenticated = action.payload.isAuthenticated;
        state.user = action.payload.user;
      })
      .addCase(loadUser.rejected, (state) => {
        state.authLoading = false;
        state.isAuthenticated = false;
        state.user = null;
      })

      .addCase(loginUser.fulfilled, (state, action) => {
        state.authLoading = false;
        state.isAuthenticated = true;
        state.user = action.payload.user;
      })
      .addCase(loginUser.rejected, (state) => {
        state.authLoading = false;
        state.isAuthenticated = false;
        state.user = null;
      })
  },
});

export const { logoutUser } = authSlice.actions;

export const selectAuth = state => state.auth;

export default authSlice.reducer;
