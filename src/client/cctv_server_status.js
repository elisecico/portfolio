import axios from 'axios';
import { getIdToken, getOriginUrl } from '../lib/token_handlers';

/* -------------- GET ------------------------------- */

// Handles call to backend which returns
// the list of data related to the cctv server status
// {
//     "systemDate": "2017-10-19T14:41:52.442+02:00",
//     "systemUptimeInMillis": 69145,
//     "storageDiskTotalSpace": 721380687872,
//     "storageDiskAvailableSpace": 568768450560,
//     "storageDiskTemperature": 39,
//     "storageDiskSMARTInformations": "SMART overall-health self-assessment test result: PASSED",
//     "cpuTemperature": 39,
//     "storageDiskSMARTOk": true
// }

const getStatus = () => {
  const idToken = getIdToken();
  const originUrl = getOriginUrl();
  return axios.get(`${originUrl}/api/v1/cctvStatus`, {
    headers: {
      authorization: `Bearer ${idToken}`,
    },
  });
};

const cliCctvServerStatus = {
  getStatus,
};

module.exports = cliCctvServerStatus;
