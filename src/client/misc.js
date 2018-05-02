import axios from 'axios';
import { getIdToken, getOriginUrl } from '../lib/token_handlers';

/* -------------- GET ------------------------------- */

// Handles call to backend which returns
// the list of all misc settings

const getDvvr = () => {
  const idToken = getIdToken();
  const originUrl = getOriginUrl();
  return axios.get(`${originUrl}/api/v1/dvvr`, {
    headers: {
      authorization: `Bearer ${idToken}`,
    },
  });
};

const getObcu = () => {
  const idToken = getIdToken();
  const originUrl = getOriginUrl();
  return axios.get(`${originUrl}/api/v1/obcu`, {
    headers: {
      authorization: `Bearer ${idToken}`,
    },
  });
};

const getTds = () => {
  const idToken = getIdToken();
  const originUrl = getOriginUrl();
  return axios.get(`${originUrl}/api/v1/tds`, {
    headers: {
      authorization: `Bearer ${idToken}`,
    },
  });
};

const getIdentifiers = () => {
  const idToken = getIdToken();
  const originUrl = getOriginUrl();
  return axios.get(`${originUrl}/api/v1/identifiers`, {
    headers: {
      authorization: `Bearer ${idToken}`,
    },
  });
};

const getDiagnostic = () => {
  const idToken = getIdToken();
  const originUrl = getOriginUrl();
  return axios.get(`${originUrl}/api/v1/diagnostic`, {
    headers: {
      authorization: `Bearer ${idToken}`,
    },
  });
};

/* -------------- PUT ------------------------------- */

// Handles call to backend which edits a subset of misc settings
// with characteristics specified in the payload
// const payload = {
//   dvvrSettings: {
//     dvvr_ip_address: string,
//     dvvr_username: string,
//     dvvr_password: string,
//     dvvr_path: string,
//   },
// }

const editDvvr = (payload) => {
  const idToken = getIdToken();
  const originUrl = getOriginUrl();
  return axios.put(`${originUrl}/api/v1/dvvr/save`, payload, {
    headers: {
      authorization: `Bearer ${idToken}`,
    },
  });
};

const editObcu = (payload) => {
  const idToken = getIdToken();
  const originUrl = getOriginUrl();
  return axios.put(`${originUrl}/api/v1/obcu/save`, payload, {
    headers: {
      authorization: `Bearer ${idToken}`,
    },
  });
};

const editTds = (payload) => {
  const idToken = getIdToken();
  const originUrl = getOriginUrl();
  return axios.put(`${originUrl}/api/v1/tds/save`, payload, {
    headers: {
      authorization: `Bearer ${idToken}`,
    },
  });
};

const editIdentifiers = (payload) => {
  const idToken = getIdToken();
  const originUrl = getOriginUrl();
  return axios.put(`${originUrl}/api/v1/identifiers/save`, payload, {
    headers: {
      authorization: `Bearer ${idToken}`,
    },
  });
};

const editDiagnostic = (payload) => {
  const idToken = getIdToken();
  const originUrl = getOriginUrl();
  return axios.put(`${originUrl}/api/v1/diagnostic/save`, payload, {
    headers: {
      authorization: `Bearer ${idToken}`,
    },
  });
};

const cliMisc = {
  getDvvr,
  getObcu,
  getTds,
  getIdentifiers,
  getDiagnostic,
  editDvvr,
  editObcu,
  editTds,
  editIdentifiers,
  editDiagnostic,
};

module.exports = cliMisc;
