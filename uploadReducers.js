import { combineReducers } from 'redux';
import * as types from './uploadActionTypes';

const uploadReducer = (state = { uploading: [], shown: false, errors: [] }, action) => {
  switch (action.type) {
    case types.SHOW_FORM:
      return { ...state, shown: true };
    case types.HIDE_FORM:
      return { ...state, shown: false };
    case types.UPLOAD_START:
      return { ...state, uploading: [...state.uploading, action.payload] };
    case types.UPLOAD_FINISH:
      return { ...state, uploading: state.uploading.filter(file => file !== action.payload) };
    case types.UPLOAD_ERROR:
      return { ...state, error: action.payload };
    default:
      return state;
  }
};

export default uploadReducer;

export const selectors = {
  isShown: state => state.shown
};
