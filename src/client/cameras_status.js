import axios from 'axios';
import { getIdToken, getOriginUrl } from '../lib/token_handlers';

/* -------------- GET ------------------------------- */

// Handles call to backend which returns
// the list of all cameras

const getCameras = () => {
  const idToken = getIdToken();
  const originUrl = getOriginUrl();
  return axios.get(`${originUrl}/api/v1/cameras/status`, {
    headers: {
      authorization: `Bearer ${idToken}`,
    },
  });
};

/* -------------- PUT ------------------------------- */

// Handles call to backend which edits the status key of
// the cameras whose ids are specified in the payload
// const payload = [id, id, id, ...];

const startRec = (payload) => {
  const idToken = getIdToken();
  const originUrl = getOriginUrl();
  return axios.put(`${originUrl}/api/v1/recorders/startRecording`, payload, {
    headers: {
      authorization: `Bearer ${idToken}`,
    },
  });
};

const stopRec = (payload) => {
  const idToken = getIdToken();
  const originUrl = getOriginUrl();
  return axios.put(`${originUrl}/api/v1/recorders/stopRecording`, payload, {
    headers: {
      authorization: `Bearer ${idToken}`,
    },
  });
};

/* -------------- PUT ------------------------------- */

// Handles call to backend which edits the alarm key of
// the cameras whose ids are specified in the payload
// const payload = [id, id, id, ...];

const alarmStart = (payload) => {
  const idToken = getIdToken();
  const originUrl = getOriginUrl();
  return axios.put(`${originUrl}/api/v1/recorders/startAlarm`, payload, {
    headers: {
      authorization: `Bearer ${idToken}`,
    },
  });
};

/* -------------- PUT ------------------------------- */

// Handles call to backend which edits the alarm key of
// the cameras whose ids are specified in the payload
// const payload = [id, id, id, ...];

const alarmStop = (payload) => {
  const idToken = getIdToken();
  const originUrl = getOriginUrl();
  return axios.put(`${originUrl}/api/v1/recorders/stopAlarm`, payload, {
    headers: {
      authorization: `Bearer ${idToken}`,
    },
  });
};

/* -------------- PUT ------------------------------- */

// Handles call to backend which reboots cameras' system

const reboot = () => {
  const idToken = getIdToken();
  const originUrl = getOriginUrl();
  return axios.put(`${originUrl}/api/v1/systemReboot`, {}, {
    headers: {
      authorization: `Bearer ${idToken}`,
    },
  });
};

/* -------------- GET ------------------------------- */

// Handles call to backend which checks if system has
// rebooted. Returns boolean.

const isRebooting = () => {
  const originUrl = getOriginUrl();
  return axios.get(`${originUrl}/isRebooting`);
};

const cliCamerasStatus = {
  getCameras,
  startRec,
  stopRec,
  alarmStart,
  alarmStop,
  reboot,
  isRebooting,
};

module.exports = cliCamerasStatus;
