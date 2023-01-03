import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import axios from 'axios';
import { USER_API } from '../../constants/api';
import { BASE_URL } from '../../constants/constants';

const initialState = {
  authLoading: true,
  isAuthenticated: false,
  token: null,
};

export const registerUser = createAsyncThunk(
  'auth/register',
  async registerForm => {
    try {
      const response = await axios.post(`${BASE_URL}${USER_API.register}`, registerForm);
      return {isAuthenticated: true, token: response.token};
    } catch (error) {
      console.log(error);
      return {isAuthenticated: false, token: null};
    }
  },
);

export const loginUser = createAsyncThunk('auth/login', async loginForm => {
  try {
    const response = await axios.post(`${BASE_URL}${USER_API.login}`, loginForm);
    return {isAuthenticated: true, token: response.token};
    // name, avatar
  } catch (error) {
    console.log(error);
    return {isAuthenticated: false, token: null};
  }
});

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(registerUser.pending, state => {
        state.authLoading = true;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.authLoading = false;
        state.isAuthenticated = action.payload.isAuthenticated;
        state.token = action.payload.token;
      })
      .addCase(registerUser.rejected, state => {
        state.authLoading = false;
        state.isAuthenticated = false;
        state.token = null;
      })
      .addCase(loginUser.pending, state => {
        state.authLoading = true;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.authLoading = false;
        state.isAuthenticated = action.payload.isAuthenticated;
        state.token = action.payload.token;
      })
      .addCase(loginUser.rejected, state => {
        state.authLoading = false;
        state.isAuthenticated = false;
        state.token = null;
      });
  },
});

export const selectAuth = state => state.auth;

export default authSlice.reducer;
