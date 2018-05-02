import moment from 'moment';

import initStatusDecorator from '../lib/init_status_decorator';
import asyncStatusDecorator from '../lib/async_status_decorator';
import { cliCctvServerStatus } from '../client';

/* --------- initial state ------------------------------------------- */

const initialState = {
  systemDate: '',
  systemUptimeInMillis: 0,
  storageDiskTotalSpace: 0,
  storageDiskAvailableSpace: 0,
  storageDiskTemperature: 0,
  storageDiskSMARTInformations: '',
  cpuTemperature: 0,
  memoryStatus: false,
  memoryCheckDate: '',
};

/* --------- actionTypes ------------------------------------------- */

const CCTV_SERVER_STATUS_INIT = 'CCTV_SERVER_STATUS_INIT';
const CCTV_SERVER_STATUS_REFRESH = 'CCTV_SERVER_STATUS_REFRESH';

const actionTypes = [
  CCTV_SERVER_STATUS_INIT,
  CCTV_SERVER_STATUS_REFRESH,
];

/* --------- actions ------------------------------------------- */

const init = () => (dispatch) => {
  return cliCctvServerStatus.getStatus()
    .then((r) => {
      dispatch({
        type: CCTV_SERVER_STATUS_INIT,
        cctvServerStatus: r.data,
      });
    });
};

const refreshServerStatus = () => (dispatch) => {
  return cliCctvServerStatus.getStatus()
    .then((r) => {
      dispatch({
        type: CCTV_SERVER_STATUS_REFRESH,
        cctvServerStatus: r.data,
      });
    });
};

const actions = {
  init,
  refreshServerStatus,
};

/* ---------------- api ----------------------------------------------- */

const moduleName = () => 'cctvServerStatus';
const stateCctvServerStatus = state => state;

const api = {
  moduleName,
  cctvServerStatus: stateCctvServerStatus,
};

/* --------- reducer ------------------------------------------- */

const reducer = (state = initialState, action) => {
  if (action.type === CCTV_SERVER_STATUS_INIT) {
    const dateTime = action.cctvServerStatus.systemDate;
    const fmtDateTime = moment(dateTime).format('DD/MM/YYYY, h:mm:ss a');
    const duration = moment.duration(action.cctvServerStatus.systemUptimeInMillis, 'milliseconds');
    const sysUptime = `${duration.days()} days, ${duration.hours()} hours, ${duration.minutes()} minutes`;
    let lastCheckfmt = '';
    if (action.cctvServerStatus.memoryCheckDate) {
      lastCheckfmt = moment(action.cctvServerStatus.memoryCheckDate).format('DD/MM/YYYY, h:mm:ss a');
    }
    return {
      ...state,
      systemDate: fmtDateTime,
      systemUptimeInMillis: sysUptime,
      storageDiskTotalSpace: action.cctvServerStatus.storageDiskTotalSpace,
      storageDiskAvailableSpace: action.cctvServerStatus.storageDiskAvailableSpace,
      storageDiskTemperature: action.cctvServerStatus.storageDiskTemperature,
      storageDiskSMARTInformations: action.cctvServerStatus.storageDiskSMARTInformations,
      cpuTemperature: action.cctvServerStatus.cpuTemperature,
      memoryStatus: action.cctvServerStatus.memoryStatus,
      memoryCheckDate: lastCheckfmt,
    };
  }
  if (action.type === CCTV_SERVER_STATUS_REFRESH) {
    const dateTime = action.cctvServerStatus.systemDate;
    const fmtDateTime = moment(dateTime).format('DD/MM/YYYY, h:mm:ss a');
    const duration = moment.duration(action.cctvServerStatus.systemUptimeInMillis, 'milliseconds');
    const sysUptime = `${duration.days()} days, ${duration.hours()} hours, ${duration.minutes()} minutes`;
    let lastCheckfmt = '';
    if (action.cctvServerStatus.memoryCheckDate) {
      lastCheckfmt = moment(action.cctvServerStatus.memoryCheckDate).format('DD/MM/YYYY, h:mm:ss a');
    }
    return {
      ...state,
      systemDate: fmtDateTime,
      systemUptimeInMillis: sysUptime,
      storageDiskTotalSpace: action.cctvServerStatus.storageDiskTotalSpace,
      storageDiskAvailableSpace: action.cctvServerStatus.storageDiskAvailableSpace,
      storageDiskTemperature: action.cctvServerStatus.storageDiskTemperature,
      storageDiskSMARTInformations: action.cctvServerStatus.storageDiskSMARTInformations,
      cpuTemperature: action.cctvServerStatus.cpuTemperature,
      memoryStatus: action.cctvServerStatus.memoryStatus,
      memoryCheckDate: lastCheckfmt,
    };
  }
  return state;
};

/* ------------------------------------------------------------- */
const cctvServerStatus = asyncStatusDecorator(
  'refreshServerStatus', initStatusDecorator(
    'init', ({ actionTypes, actions, api, reducer })));

module.exports = cctvServerStatus;
