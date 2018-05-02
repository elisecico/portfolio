import axios from 'axios';
import { getIdToken, getOriginUrl } from '../lib/token_handlers';

/* -------------- GET ------------------------------- */

// Handles calls to backend which returns
// the list of links to download ths system log

const getPlaintxt = () => {
  const idToken = getIdToken();
  const originUrl = getOriginUrl();
  return axios.get(`${originUrl}/api/v1/log/plaintxt`, {
    headers: {
      authorization: `Bearer ${idToken}`,
    },
  });
};

const getLogCsv = () => {
  const idToken = getIdToken();
  const originUrl = getOriginUrl();
  return axios.get(`${originUrl}/api/v1/log/csv`, {
    headers: {
      authorization: `Bearer ${idToken}`,
    },
  });
};

const getLogTxt = () => {
  const idToken = getIdToken();
  const originUrl = getOriginUrl();
  return axios.get(`${originUrl}/api/v1/log/txt`, {
    headers: {
      authorization: `Bearer ${idToken}`,
    },
  });
};

const cliSystemLog = {
  getPlaintxt,
  getLogCsv,
  getLogTxt,
};

module.exports = cliSystemLog;
