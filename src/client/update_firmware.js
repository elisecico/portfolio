import axios from 'axios';
import { getIdToken, getOriginUrl } from '../lib/token_handlers';

/* -------------- POST ------------------------------- */

// Handles call to backend which checks
// the firmware update file

const uploadFile = (data) => {
  const idToken = getIdToken();
  const originUrl = getOriginUrl();
  return axios.post(`${originUrl}/api/v1/uploadFirmware`, data, {
    headers: {
      authorization: `Bearer ${idToken}`,
    },
  });
};

/* -------------- POST ------------------------------- */

// Handles call to backend which uploads
// the firmware update file

const confirmUpgrade = () => {
  const idToken = getIdToken();
  const originUrl = getOriginUrl();
  return axios.post(`${originUrl}/api/v1/confirmUpgrade`, {}, {
    headers: {
      authorization: `Bearer ${idToken}`,
    },
  });
};

const cliUpdateFirmware = {
  uploadFile,
  confirmUpgrade,
};

module.exports = cliUpdateFirmware;
