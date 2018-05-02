import initStatusDecorator from '../lib/init_status_decorator';
import asyncStatusDecorator from '../lib/async_status_decorator';
import { cliCamerasSettings } from '../client';

/* --------- initial state ------------------------------------------- */

const initialState = {
  cameras: [],
  selectedCameras: [],
};

/* --------- actionTypes ------------------------------------------- */

const CAMERAS_INIT = 'CAMERAS_INIT';
const CAMERAS_ADD = 'CAMERAS_ADD';
const CAMERAS_EDIT = 'CAMERAS_EDIT';
const CAMERAS_DELETE = 'CAMERAS_DELETE';

const actionTypes = [
  CAMERAS_INIT,
  CAMERAS_ADD,
  CAMERAS_EDIT,
  CAMERAS_DELETE,
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

const addCamera = payload => (dispatch) => {
  return Promise.resolve()
    .then(() => {
      const updatedCamera = {
        id: payload.id,
        camera_ip_address: payload.cameraAddress,
        camera_name: payload.cameraName,
        enabled: payload.enabled,
        status: 'running',
        alert: null,
      };
      dispatch({
        type: CAMERAS_ADD,
        updatedCamera,
      });
    });
};

const editCamera = (cameraIndex, payload) => (dispatch) => {
  const updatedCamera = {
    id: payload.id,
    camera_ip_address: payload.cameraAddress,
    camera_name: payload.cameraName,
    enabled: payload.enabled,
  };
  return cliCamerasSettings.editCamera(updatedCamera)
    .then(() => {
      dispatch({
        type: CAMERAS_EDIT,
        updatedCamera,
        cameraIndex,
      });
    });
};

const deleteCamera = cameraIds => (dispatch) => {
  return Promise.resolve()
    .then(() => {
      dispatch({
        type: CAMERAS_DELETE,
        cameraIds,
      });
    });
};

const actions = {
  init,
  addCamera,
  editCamera,
  deleteCamera,
};

/* ---------------- api ----------------------------------------------- */

const moduleName = () => 'cameras';
const stateCameras = state => state.cameras;
const stateSelectedCameras = state => state.selectedCameras;

const api = {
  moduleName,
  cameras: stateCameras,
  selectedCameras: stateSelectedCameras,
};

/* --------- reducer ------------------------------------------- */

const reducer = (state = initialState, action) => {
  if (action.type === CAMERAS_INIT) {
    const updatedCameras = action.cameras.map((camera) => {
      return {
        ...camera,
        ip_address: camera.camera_ip_address,
        description: camera.camera_name,
        'enabled/disabled': camera.enabled ? 'enabled' : 'disabled',
        ID: camera.id,
      };
    });
    return {
      ...state,
      cameras: updatedCameras,
    };
  }
  if (action.type === CAMERAS_ADD) {
    const updatedCamera = { ...action.updatedCamera };
    updatedCamera.ip_address = updatedCamera.camera_ip_address;
    updatedCamera.description = updatedCamera.camera_name;
    updatedCamera['enabled/disabled'] = updatedCamera.enabled ? 'enabled' : 'disabled';
    updatedCamera.ID = updatedCamera.id;
    const updatedCameras = state.cameras;
    updatedCameras.push(updatedCamera);
    return {
      ...state,
      cameras: updatedCameras,
    };
  }
  if (action.type === CAMERAS_EDIT) {
    const updatedCamera = { ...action.updatedCamera };
    updatedCamera.ip_address = updatedCamera.camera_ip_address;
    updatedCamera.description = updatedCamera.camera_name;
    updatedCamera['enabled/disabled'] = updatedCamera.enabled ? 'enabled' : 'disabled';
    updatedCamera.ID = updatedCamera.id;
    const cameras = state.cameras;
    const updatedCameras = cameras.map((cam, index) => {
      let camCopy = cam;
      if (action.cameraIndex === index) {
        camCopy = updatedCamera;
      }
      return camCopy;
    });
    return {
      ...state,
      cameras: updatedCameras,
      selectedCameras: [updatedCamera],
    };
  }
  if (action.type === CAMERAS_DELETE) {
    const updatedCameras = state.cameras.filter((cam) => {
      return !action.cameraIds.includes(cam.id);
    });
    return {
      ...state,
      cameras: updatedCameras,
    };
  }
  return state;
};

/* ------------------------------------------------------------- */
const cameraSettings = asyncStatusDecorator(
  'deleteCamera', asyncStatusDecorator(
    'editCamera', asyncStatusDecorator(
      'addCamera', initStatusDecorator(
        'init', ({ actionTypes, actions, api, reducer })))));

module.exports = cameraSettings;
