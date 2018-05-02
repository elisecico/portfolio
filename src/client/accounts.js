import axios from 'axios';
import { getIdToken, getOriginUrl } from '../lib/token_handlers';

/* -------------- GET ------------------------------- */

// Handles call to backend which returns
// the list of all accounts

const getAccounts = () => {
  const idToken = getIdToken();
  const originUrl = getOriginUrl();
  return axios.get(`${originUrl}/api/v1/accounts`, {
    headers: {
      authorization: `Bearer ${idToken}`,
    },
  });
};

/* -------------- POST ------------------------------- */

// Handles call to backend which adds an account with
// characteristics specified in the payload
// const payload = {
//   profile: string,
//   full_name: string,
//   username: string,
//   enabled: boolean,
//   password: string,
// };

const addAccount = (payload) => {
  const idToken = getIdToken();
  const originUrl = getOriginUrl();
  return axios.post(`${originUrl}/api/v1/accounts/save`, payload, {
    headers: {
      authorization: `Bearer ${idToken}`,
    },
  });
};

/* -------------- PUT ------------------------------- */

// Handles call to backend which edits an account with
// characteristics specified in the payload
// const payload = {
//   profile: string,
//   full_name: string,
//   username: string,
//   enabled: boolean,
//   password: string,
// };

const editAccount = (payload) => {
  const idToken = getIdToken();
  const originUrl = getOriginUrl();
  return axios.put(`${originUrl}/api/v1/accounts/save`, payload, {
    headers: {
      authorization: `Bearer ${idToken}`,
    },
  });
};

/* -------------- DELETE ------------------------------- */

// Handles call to backend which deletes
// the accounts whose ids are specified in the payload
// const payload = [id, id, id, ...];

const deleteAccount = (id) => {
  const idToken = getIdToken();
  const originUrl = getOriginUrl();
  return axios.delete(`${originUrl}/api/v1/accounts/delete/${id}`, {
    headers: {
      authorization: `Bearer ${idToken}`,
    },
  });
};

const cliAccounts = {
  getAccounts,
  addAccount,
  editAccount,
  deleteAccount,
};

module.exports = cliAccounts;
