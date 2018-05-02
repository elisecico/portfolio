import initStatusDecorator from '../lib/init_status_decorator';
import asyncStatusDecorator from '../lib/async_status_decorator';
import { cliCamerasSettings, cliCamerasDownload } from '../client';

/* --------- initial state ------------------------------------------- */

const initialState = {
  cameras: [],
  fileSize: 0,
  filename: '',
  errorStatus: 0,
};

/* --------- actionTypes ------------------------------------------- */

const CAMERAS_INIT = 'CAMERAS_INIT';
const GET_FILE_INFOS = 'GET_FILE_INFOS';
const MERGE_FILES = 'MERGE_FILES';
const RESET_STATE = 'RESET_STATE';
const INSUFFICIENT_STORAGE = 'INSUFFICIENT_STORAGE';

const actionTypes = [
  CAMERAS_INIT,
  GET_FILE_INFOS,
  MERGE_FILES,
  RESET_STATE,
  INSUFFICIENT_STORAGE,
];

/* --------- actions ------------------------------------------- */

const init = () => (dispatch) => {
  return cliCamerasSettings.getCameras()
    .then((r) => {
      dispatch({
        type: CAMERAS_INIT,
        cameras: r.data.cameras,
      });
    });
};

const getFileInfos = payload => (dispatch) => {
  return cliCamerasDownload.retrieveFileInfos(payload)
    .then((r) => {
      dispatch({
        type: GET_FILE_INFOS,
        fileSize: r.data.size,
      });
    })
    .catch((error) => {
      if (error.response) {
        dispatch({
          type: INSUFFICIENT_STORAGE,
          errorStatus: error.response.status,
        });
      }
    });
};

const mergeFiles = payload => (dispatch) => {
  return cliCamerasDownload.mergeFiles(payload)
    .then((r) => {
      dispatch({
        type: MERGE_FILES,
        filename: r.data.fileName,
        fileSize: r.data.size,
      });
    });
};

const resetState = () => {
  return {
    type: RESET_STATE,
  };
};

const actions = {
  init,
  getFileInfos,
  mergeFiles,
  resetState,
};

/* ---------------- api ----------------------------------------------- */

const moduleName = () => 'cameraDownload';
const stateCameras = state => state.cameras;
const stateFileSize = state => state.fileSize;
const stateFilename = state => state.filename;
const stateErrorStatus = state => state.errorStatus;

const api = {
  moduleName,
  cameras: stateCameras,
  fileSize: stateFileSize,
  filename: stateFilename,
  errorStatus: stateErrorStatus,
};

/* --------- reducer ------------------------------------------- */

const reducer = (state = initialState, action) => {
  if (action.type === CAMERAS_INIT) {
    const updatedCameras = action.cameras.map((camera) => {
      return {
        ...camera,
        ID: camera.id,
        description: camera.camera_name,
      };
    });
    return {
      ...state,
      cameras: updatedCameras,
    };
  }
  if (action.type === GET_FILE_INFOS) {
    return {
      ...state,
      fileSize: action.fileSize,
    };
  }
  if (action.type === MERGE_FILES) {
    return {
      ...state,
      filename: action.filename,
      fileSize: action.fileSize,
    };
  }
  if (action.type === INSUFFICIENT_STORAGE) {
    return {
      ...state,
      errorStatus: action.errorStatus,
    };
  }
  if (action.type === RESET_STATE) {
    return {
      ...initialState,
      cameras: state.cameras,
      initStatus: 'initialized',
    };
  }
  return state;
};

/* ------------------------------------------------------------- */
const cameraDownload = asyncStatusDecorator(
  'getFileInfos', asyncStatusDecorator(
    'mergeFiles', initStatusDecorator(
      'init', ({ actionTypes, actions, api, reducer }))));

module.exports = cameraDownload;
