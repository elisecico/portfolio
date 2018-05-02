import axios from 'axios';
import { getIdToken, getOriginUrl } from '../lib/token_handlers';

/* -------------- GET ------------------------------- */

// Handles call to backend which returns
// the list of all cameras

const getCameras = () => {
  const idToken = getIdToken();
  const originUrl = getOriginUrl();
  return axios.get(`${originUrl}/api/v1/cameras`, {
    headers: {
      authorization: `Bearer ${idToken}`,
    },
  });
};


/* -------------- PUT ------------------------------- */

// Handles call to backend which edits a camera with
// characteristics specified in the payload
// const payload = {
//     camera_ip_address: string,
//     camera_name: string,
//     enabled: boolean,
//   };

const editCamera = (payload) => {
  const idToken = getIdToken();
  const originUrl = getOriginUrl();
  return axios.put(`${originUrl}/api/v1/cameras/save`, payload, {
    headers: {
      authorization: `Bearer ${idToken}`,
    },
  });
};

const cliCamerasSettings = {
  getCameras,
  editCamera,
};

module.exports = cliCamerasSettings;
