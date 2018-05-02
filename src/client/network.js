import axios from 'axios';
import { getIdToken, getOriginUrl } from '../lib/token_handlers';

/* -------------- GET ------------------------------- */

// Handles call to backend which returns
// the list of all network settings

const getNetwork = () => {
  const idToken = getIdToken();
  const originUrl = getOriginUrl();
  return axios.get(`${originUrl}/api/v1/network`, {
    headers: {
      authorization: `Bearer ${idToken}`,
    },
  });
};


/* -------------- PUT ------------------------------- */

// Handles call to backend which edits network settings
// with characteristics specified in the payload
// const payload = {
//   ip_address: string,
//   subnet_mask: string,
//   gateway: string,
// };

const editNetwork = (payload) => {
  const idToken = getIdToken();
  const originUrl = getOriginUrl();
  return axios.put(`${originUrl}/api/v1/network/save`, payload, {
    headers: {
      authorization: `Bearer ${idToken}`,
    },
  });
};

const cliNetwork = {
  getNetwork,
  editNetwork,
};

module.exports = cliNetwork;
