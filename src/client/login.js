import axios from 'axios';
import { getOriginUrl } from '../lib/token_handlers';

/* -------------- POST  ------------------------------- */

// retrieves profile
// payload ={
//   username,
//   password,
// };
// Returns profile (with idToken)

const logUser = (payload) => {
  const originUrl = getOriginUrl();
  return axios.post(`${originUrl}/login`, payload);
};

const cliLogin = {
  logUser,
};

module.exports = cliLogin;
