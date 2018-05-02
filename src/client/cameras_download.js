import axios from 'axios';
import { getIdToken, getOriginUrl } from '../lib/token_handlers';

/* -------------- PUT ------------------------------- */

// Handles call to backend which retrieves file size
// and name with characteristics specified in the payload
// const payload = {
//   cameraIds: ['id', 'id', ...],
//   from: UTCdatetime,
//   to: UTCdatetime,
// };

const retrieveFileInfos = (payload) => {
  const idToken = getIdToken();
  const originUrl = getOriginUrl();
  return axios.put(`${originUrl}/api/v1/download/search`, payload, {
    headers: {
      authorization: `Bearer ${idToken}`,
    },
  });
};

/* -------------- PUT ------------------------------- */

// Handles call to backend which merges files
// with characteristics specified in the payload
// const payload = {
//   cameraIds: ['id', 'id', ...],
//   from: UTCdatetime,
//   to: UTCdatetime,
// };

const mergeFiles = (payload) => {
  const idToken = getIdToken();
  const originUrl = getOriginUrl();
  return axios.put(`${originUrl}/api/v1/download/merge`, payload, {
    headers: {
      authorization: `Bearer ${idToken}`,
    },
  });
};

const cliCamerasDownload = {
  retrieveFileInfos,
  mergeFiles,
};

module.exports = cliCamerasDownload;
