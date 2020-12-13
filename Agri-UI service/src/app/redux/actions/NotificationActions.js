import axios from "axios";
import {getNotificationOfUser,deleteNotificationById} from "../../services/api-services"

export const GET_NOTIFICATION = "GET_NOTIFICATION";
export const CREATE_NOTIFICATION = "CREATE_NOTIFICATION";
export const DELETE_NOTIFICATION = "DELETE_NOTIFICATION";
export const DELETE_ALL_NOTIFICATION = "DELETE_ALL_NOTIFICATION";

export const getNotification = id => dispatch => {
  getNotificationOfUser(id).then(res => {
    dispatch({
      type: GET_NOTIFICATION,
      payload: res.data
    });
  });
};

export const deleteNotification = id => dispatch => {
  deleteNotificationById(id).then(res => {
    dispatch({
      type: DELETE_NOTIFICATION,
      payload: res.data
    });
  });
};

export const deleteAllNotification = () => dispatch => {
  axios.post("/api/notification/delete-all").then(res => {
    dispatch({
      type: DELETE_ALL_NOTIFICATION,
      payload: res.data
    });
  });
};

export const createNotification = notification => dispatch => {
  axios.post("/api/notification/add", { notification }).then(res => {
    dispatch({
      type: CREATE_NOTIFICATION,
      payload: res.data
    });
  });
};
