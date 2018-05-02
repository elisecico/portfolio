import asyncStatusDecorator from '../lib/async_status_decorator';
import { cliUpdateFirmware } from '../client';

/* --------- initial state ------------------------------------------- */

const initialState = {
  date: '',
  version: '',
};

/* --------- actionTypes ------------------------------------------- */

const UPLOAD_FILE = 'UPLOAD_FILE';
const RESET_STATE = 'RESET_STATE';
const CONFIRM_UPGRADE = 'CONFIRM_UPGRADE';

const actionTypes = [
  UPLOAD_FILE,
  RESET_STATE,
  CONFIRM_UPGRADE,
];

/* --------- actions ------------------------------------------- */

const uploadFile = data => (dispatch) => {
  return cliUpdateFirmware.uploadFile(data)
    .then((r) => {
      dispatch({
        type: UPLOAD_FILE,
        date: r.data.Date,
        version: r.data.Version,
      });
    });
};

const confirmUpgrade = () => (dispatch) => {
  return cliUpdateFirmware.confirmUpgrade()
    .then(() => {
      dispatch({
        type: CONFIRM_UPGRADE,
      });
    });
};

const resetState = () => {
  return {
    type: RESET_STATE,
  };
};

const actions = {
  uploadFile,
  confirmUpgrade,
  resetState,
};

/* ---------------- api ----------------------------------------------- */

const moduleName = () => 'updateFirmware';
const stateDate = state => state.date;
const stateVersion = state => state.version;

const api = {
  moduleName,
  date: stateDate,
  version: stateVersion,
};

/* --------- reducer ------------------------------------------- */

const reducer = (state = initialState, action) => {
  if (action.type === UPLOAD_FILE) {
    return {
      ...state,
      date: action.date,
      version: action.version,
    };
  }
  if (action.type === CONFIRM_UPGRADE) {
    return {
      ...state,
    };
  }
  if (action.type === RESET_STATE) {
    return {
      ...initialState,
    };
  }
  return state;
};

/* ------------------------------------------------------------- */
const updateFirmware = asyncStatusDecorator(
  'confirmUpgrade', asyncStatusDecorator(
    'uploadFile', ({ actionTypes, actions, api, reducer })));

module.exports = updateFirmware;
