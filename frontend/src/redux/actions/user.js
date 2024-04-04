import axios from "axios";
import { server } from "../store";

export const loadUser = () => async (dispatch) => {
  try {
    dispatch({
      type: "loadUserRequest"
    });
    const { data } = await axios.get(`${server}/me`, {
      withCredentials: true,
    });
    // console.log(data);
    dispatch({
      type: "loadUserSuccess",
      payload: data.user,
    });
  } catch (error) {
    dispatch({
      type: "loadUserFail",
      payload: error.response.data.message,
    });
  }
};

export const logout = () => async (dispatch) => {
  try {
    dispatch({
      type: "logoutRequest"
    });
    const res = await axios.get(`${server}/logout`, {
      withCredentials: true,
    });
    console.log(res.data);
    dispatch({
      type: "logoutSuccess",
      payload: res.data,
    });
  } catch (error) {
    if (error.response && error.response.status === 401) {
      // Unauthorized error, user is not logged in
      dispatch({
        type: "logoutFail",
        payload: "Unauthorized",
      });
    } else {
      // Other error
      dispatch({
        type: "logoutFail",
        payload: error.response ? error.response.data.message : "Unknown error",
      });
    }
  }
};
