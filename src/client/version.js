import axios from 'axios';
import { getIdToken, getOriginUrl } from '../lib/token_handlers';

/* -------------- GET ------------------------------- */

// Handles calls to backend which returns
// the list of links to download ths system log

const getVersion = () => {
  const idToken = getIdToken();
  const originUrl = getOriginUrl();
  return axios.get(`${originUrl}/api/v1/getSoftwareVersion`, {
    headers: {
      authorization: `Bearer ${idToken}`,
    },
  });
};

const cliVersion = {
  getVersion,
};

module.exports = cliVersion;
