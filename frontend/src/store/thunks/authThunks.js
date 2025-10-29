import { authAPI } from '../../services/authApi';
import { loginSuccess, logout } from '../slices/authSlice';

export const loginUser = (username, password) => async (dispatch) => {
  try {
    const formData=new FormData();
    formData.append('email',username);
    formData.append('password',password);
    const data = await authAPI.login(formData);
    dispatch(loginSuccess(data));
    localStorage.setItem('creator_auth', JSON.stringify(data.data.user));
    localStorage.setItem('creator_token', data.data.token);
    return data;
  } catch (error) {
    throw error;
  }
};

export const registerUser = (username,email, password) => async (dispatch) => {
  try {
    const formData= new FormData();
    formData.append('name',username)
    formData.append('email',email);
    formData.append('password',password)

    const data = await authAPI.register(formData);
    dispatch(loginSuccess(data));
    localStorage.setItem('creator_auth', JSON.stringify(data.data.user));
    localStorage.setItem('creator_token', data.data.token);
    return data;
  } catch (error) {
    throw error;
  }
};

export const logoutUser = () => (dispatch) => {
  localStorage.removeItem('creator_auth');
  localStorage.removeItem('creator_token');
  dispatch(logout());
};