import initStatusDecorator from '../lib/init_status_decorator';
import asyncStatusDecorator from '../lib/async_status_decorator';
import { cliCamerasStatus } from '../client';

/* --------- initial state ------------------------------------------- */

const initialState = {
  cameras: [],
  refreshedCameras: [],
  selectedCameras: [],
  isRebooting: false,
};

/* --------- actionTypes ------------------------------------------- */

const CAMERAS_STATUS_INIT = 'CAMERAS_STATUS_INIT';
const CAMERAS_STATUS_REFRESH = 'CAMERAS_STATUS_REFRESH';
const CAMERAS_START = 'CAMERAS_START';
const CAMERAS_STOP = 'CAMERAS_STOP';
const CAMERAS_ALARM_START = 'CAMERAS_ALARM_START';
const CAMERAS_ALARM_STOP = 'CAMERAS_ALARM_STOP';
const CAMERAS_REBOOT = 'CAMERAS_REBOOT';
const RESET_REBOOT = 'RESET_REBOOT';
const CHECK_CAMERAS = 'CHECK_CAMERAS';
const IS_REBOOTING = 'IS_REBOOTING';

const actionTypes = [
  CAMERAS_STATUS_INIT,
  CAMERAS_STATUS_REFRESH,
  CAMERAS_START,
  CAMERAS_STOP,
  CAMERAS_ALARM_START,
  CAMERAS_ALARM_STOP,
  CAMERAS_REBOOT,
  RESET_REBOOT,
  CHECK_CAMERAS,
  IS_REBOOTING,
];

/* --------- actions ------------------------------------------- */

const init = () => (dispatch) => {
  return cliCamerasStatus.getCameras()
    .then((r) => {
      dispatch({
        type: CAMERAS_STATUS_INIT,
        cameras: r.data.cameras,
      });
    });
};

const refreshCameraStatus = () => (dispatch) => {
  return cliCamerasStatus.getCameras()
    .then((r) => {
      dispatch({
        type: CAMERAS_STATUS_REFRESH,
        cameras: r.data.cameras,
      });
    });
};

const startCameras = cameraIds => (dispatch) => {
  return cliCamerasStatus.startRec(cameraIds)
    .then(() => {
      dispatch({
        type: CAMERAS_START,
        cameraIds,
      });
    });
};

const stopCameras = cameraIds => (dispatch) => {
  return cliCamerasStatus.stopRec(cameraIds)
    .then(() => {
      dispatch({
        type: CAMERAS_STOP,
        cameraIds,
      });
    });
};

const alarmStartCameras = cameraIds => (dispatch) => {
  return cliCamerasStatus.alarmStart(cameraIds)
    .then(() => {
      dispatch({
        type: CAMERAS_ALARM_START,
        cameraIds,
      });
    });
};

const alarmStopCameras = cameraIds => (dispatch) => {
  return cliCamerasStatus.alarmStop(cameraIds)
    .then(() => {
      dispatch({
        type: CAMERAS_ALARM_STOP,
        cameraIds,
      });
    });
};

const startAllCameras = cameraIds => (dispatch) => {
  return cliCamerasStatus.startRec(cameraIds)
    .then(() => {
      dispatch({
        type: CAMERAS_START,
        cameraIds,
      });
    });
};

const stopAllCameras = cameraIds => (dispatch) => {
  return cliCamerasStatus.stopRec(cameraIds)
    .then(() => {
      dispatch({
        type: CAMERAS_STOP,
        cameraIds,
      });
    });
};

const rebootCameras = () => (dispatch) => {
  return cliCamerasStatus.reboot()
    .then(() => {
      dispatch({
        type: CAMERAS_REBOOT,
      });
    });
};

const resetReboot = () => {
  return {
    type: RESET_REBOOT,
  };
};

const checkCameras = () => (dispatch) => {
  return cliCamerasStatus.getCameras()
    .then((r) => {
      dispatch({
        type: CHECK_CAMERAS,
        cameras: r.data.cameras,
      });
    });
};

const isRebooting = () => (dispatch) => {
  return cliCamerasStatus.isRebooting()
    .then((r) => {
      dispatch({
        type: IS_REBOOTING,
        isRebooting: r.data,
      });
    });
};

const actions = {
  init,
  refreshCameraStatus,
  startCameras,
  stopCameras,
  startAllCameras,
  stopAllCameras,
  alarmStartCameras,
  alarmStopCameras,
  rebootCameras,
  resetReboot,
  checkCameras,
  isRebooting,
};

/* ---------------- api ----------------------------------------------- */

const moduleName = () => 'cameras';
const stateCameras = state => state.cameras;
const stateRefreshedCameras = state => state.refreshedCameras;
const stateSelectedCameras = state => state.selectedCameras;
const stateIsRebooting = state => state.isRebooting;

const api = {
  moduleName,
  cameras: stateCameras,
  selectedCameras: stateSelectedCameras,
  refreshedCameras: stateRefreshedCameras,
  isRebooting: stateIsRebooting,
};

/* --------- reducer ------------------------------------------- */

const reducer = (state = initialState, action) => {
  if (action.type === CAMERAS_STATUS_INIT) {
    const updatedCameras = action.cameras.map((camera) => {
      return {
        ...camera,
        ip_address: camera.camera_ip_address,
        description: camera.camera_name,
        alarm: camera.alarmed,
        ID: camera.id,
      };
    }).filter(cam => cam.status !== 'DISABLED');
    return {
      ...state,
      cameras: updatedCameras,
    };
  }
  if (action.type === CAMERAS_STATUS_REFRESH) {
    const refreshedCameras = action.cameras.map((camera) => {
      return {
        ...camera,
        ip_address: camera.camera_ip_address,
        description: camera.camera_name,
        alarm: camera.alarmed,
        ID: camera.id,
      };
    }).filter(cam => cam.status !== 'DISABLED');
    const getById = (id) => {
      return refreshedCameras.filter(newCam => newCam.id === id);
    };
    let isToUpdate = false;
    const updatedCameras = state.cameras.map((oldCam) => {
      const newCam = getById(oldCam.id)[0];
      if (newCam && ((newCam.status !== oldCam.status) || (newCam.alarm !== oldCam.alarm))) {
        console.log('update cams!'); // eslint-disable-line no-console
        const camCopy = {
          ...oldCam,
          status: newCam.status,
          alarmed: newCam.alarmed,
          alarm: newCam.alarm,
        };
        isToUpdate = true;
        return camCopy;
      }
      return oldCam;
    });
    if (isToUpdate) {
      return {
        ...state,
        cameras: updatedCameras,
        refreshedCameras,
      };
    }
    return {
      ...state,
      refreshedCameras,
    };
  }
  if (action.type === CAMERAS_START) {
    const cameras = state.cameras;
    const updatedCameras = cameras.map((cam) => {
      const camCopy = cam;
      if (action.cameraIds.includes(cam.id)) {
        camCopy.status = 'RECORDING';
      }
      return camCopy;
    });
    return {
      ...state,
      cameras: updatedCameras,
      selectedCameras: [],
    };
  }
  if (action.type === CAMERAS_STOP) {
    const cameras = state.cameras;
    const updatedCameras = cameras.map((cam) => {
      const camCopy = cam;
      if (action.cameraIds.includes(cam.id)) {
        camCopy.status = 'NOT RECORDING';
      }
      return camCopy;
    });
    return {
      ...state,
      cameras: updatedCameras,
      selectedCameras: [],
    };
  }
  if (action.type === CAMERAS_ALARM_START) {
    const cameras = state.cameras;
    const updatedCameras = cameras.map((cam) => {
      const camCopy = cam;
      if (action.cameraIds.includes(cam.id)) {
        camCopy.alarm = true;
        camCopy.alarmed = true;
      }
      return camCopy;
    });
    return {
      ...state,
      cameras: updatedCameras,
      selectedCameras: [],
    };
  }
  if (action.type === CAMERAS_ALARM_STOP) {
    const cameras = state.cameras;
    const updatedCameras = cameras.map((cam) => {
      const camCopy = cam;
      if (action.cameraIds.includes(cam.id)) {
        camCopy.alarm = false;
        camCopy.alarmed = false;
      }
      return camCopy;
    });
    return {
      ...state,
      cameras: updatedCameras,
      selectedCameras: [],
    };
  }
  if (action.type === CAMERAS_REBOOT) {
    return {
      ...state,
    };
  }
  if (action.type === RESET_REBOOT) {
    return {
      ...initialState,
      rebootCamerasStatus: 'not started',
    };
  }
  if (action.type === CHECK_CAMERAS) {
    const refreshedCameras = action.cameras.map((camera) => {
      return {
        ...camera,
        ip_address: camera.camera_ip_address,
        description: camera.camera_name,
        alarm: camera.alarmed,
        ID: camera.id,
      };
    }).filter(cam => cam.status !== 'DISABLED');
    const getById = (id) => {
      return refreshedCameras.filter(newCam => newCam.id === id);
    };
    let isToUpdate = false;
    const updatedCameras = state.cameras.map((oldCam) => {
      const newCam = getById(oldCam.id)[0];
      if (newCam && ((newCam.status !== oldCam.status) || (newCam.alarm !== oldCam.alarm))) {
        console.log('update cams!'); // eslint-disable-line no-console
        const camCopy = {
          ...oldCam,
          status: newCam.status,
          alarmed: newCam.alarmed,
          alarm: newCam.alarm,
        };
        isToUpdate = true;
        return camCopy;
      }
      return oldCam;
    });
    if (isToUpdate) {
      return {
        ...state,
        cameras: updatedCameras,
        refreshedCameras,
      };
    }
    return {
      ...state,
      refreshedCameras,
    };
  }
  if (action.type === IS_REBOOTING) {
    return {
      ...state,
      isRebooting: action.isRebooting,
    };
  }
  return state;
};

/* ------------------------------------------------------------- */

const cameraStatus = asyncStatusDecorator(
  'refreshCameraStatus', asyncStatusDecorator(
    'startCameras', asyncStatusDecorator(
      'stopCameras', asyncStatusDecorator(
        'alarmStartCameras', asyncStatusDecorator(
          'alarmStopCameras', asyncStatusDecorator(
            'startAllCameras', asyncStatusDecorator(
              'stopAllCameras', asyncStatusDecorator(
                'rebootCameras', asyncStatusDecorator(
                  'checkCameras', asyncStatusDecorator(
                    'isRebooting', initStatusDecorator(
                      'init', ({ actionTypes, actions, api, reducer }))))))))))));

module.exports = cameraStatus;
