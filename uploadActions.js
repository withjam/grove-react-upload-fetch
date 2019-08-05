import * as types from './uploadActionTypes';

export const showForm = () => {
  return {
    type: types.SHOW_FORM
  };
};

export const hideForm = () => {
  return {
    type: types.HIDE_FORM
  };
};

export const startUpload = payload => {
  return {
    type: types.UPLOAD_FINISH,
    payload: payload
  };
};

export const finishUpload = payload => {
  return {
    type: types.UPLOAD_FINISH,
    payload: payload
  };
};

export const uploadError = payload => {
  return {
    type: types.UPLOAD_ERROR,
    payload: payload
  };
};

export const uploadFiles = files => {
  return dispatch => {
    dispatch(startUpload(files));
    files.forEach(file => {
      console.log('posting file', file);
      const ext = file.name.substring(file.name.lastIndexOf('.') + 1);
      return fetch(new URL('/v1/documents?extension='+ext, document.baseURI).toString(), {
        method: 'POST',
        body: file,
        credentials: 'same-origin'
      })
      .then(response => {
        if (!response.ok) throw Error('failed response');
        return response;
      })
      .then(response => {
        console.log('successful fetch response', file, response);
        dispatch(finishUpload(file.name));
      })
      .catch(err => {
        console.log('upload file error', err);
        dispatch(uploadError(file.name))
      })
    })
  };
};
