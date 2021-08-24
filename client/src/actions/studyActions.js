import {
  CREATE_STUDY_REQUEST,
  CREATE_STUDY_FAIL,
  CREATE_STUDY_SUCCESS,
  FETCH_STUDY_REQUEST,
  FETCH_STUDY_FAIL,
  FETCH_STUDY_SUCCESS,
  STUDY_UPDATE_REQUEST,
  STUDY_UPDATE_SUCCESS,
  STUDY_UPDATE_FAIL,
  DELETE_STUDY_SUCCESS,
  DELETE_STUDY_REQUEST,
  DELETE_STUDY_FAIL,
} from "./actionTypes";
import axios from "axios";
import { axiosInstance } from "../config";

export const listStudy = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: FETCH_STUDY_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axiosInstance.get(`/api/study`, config);

    dispatch({
      type: FETCH_STUDY_SUCCESS,
      payload: data,
    });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({
      type: FETCH_STUDY_FAIL,
      payload: message,
    });
  }
};

export const createStudyAction =
  (assignment, minutes, subject, notes) => async (dispatch, getState) => {
    try {
      dispatch({
        type: CREATE_STUDY_REQUEST,
      });

      const {
        userLogin: { userInfo },
      } = getState();

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      const { data } = await axiosInstance.post(
        `/api/study/create`,
        { assignment, minutes, subject, notes },
        config
      );

      dispatch({
        type: CREATE_STUDY_SUCCESS,
        payload: data,
      });
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      dispatch({
        type: CREATE_STUDY_FAIL,
        payload: message,
      });
    }
  };

export const updateStudyAction =
  (id, assignment, minutes, subject, notes) => async (dispatch, getState) => {
    try {
      dispatch({
        type: STUDY_UPDATE_REQUEST,
      });

      const {
        userLogin: { userInfo },
      } = getState();

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      const { data } = await axiosInstance.put(
        `/api/study/${id}`,
        { assignment, minutes, subject, notes },
        config
      );

      dispatch({
        type: STUDY_UPDATE_SUCCESS,
        payload: data,
      });
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      dispatch({
        type: STUDY_UPDATE_FAIL,
        payload: message,
      });
    }
  };

export const deleteStudyAction = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: DELETE_STUDY_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axiosInstance.delete(`/api/study/${id}`, config);

    dispatch({
      type: DELETE_STUDY_SUCCESS,
      payload: data,
    });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({
      type: DELETE_STUDY_FAIL,
      payload: message,
    });
  }
};
