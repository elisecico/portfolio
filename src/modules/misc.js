import initStatusDecorator from '../lib/init_status_decorator';
import asyncStatusDecorator from '../lib/async_status_decorator';
import { cliMisc } from '../client';

/* --------- initial state ------------------------------------------- */

const initialState = {
  dvvrSettings: {
    ipAddress: '',
    username: '',
    password: '',
    path: '',
  },
  obcuSettings: {
    port: 0,
  },
  tdsSettings: {
    ipAddress: '',
  },
  identifiers: {
    line: '',
    train: '',
  },
  diagnostic: {
    systemDiskTemperatureThreshold: 0,
    storageDiskTemperatureThreshold: 0,
    diskOccupancyThresholdPercent: 0,
    cpuTemperatureThreshold: 0,
  },
};

/* --------- actionTypes ------------------------------------------- */

const MISC_INIT = 'MISC_INIT';
const MISC_EDIT = 'MISC_EDIT';

const actionTypes = [
  MISC_INIT,
  MISC_EDIT,
];

/* --------- actions ------------------------------------------- */

const init = () => (dispatch) => {
  const dvvr = cliMisc.getDvvr();
  const tds = cliMisc.getTds();
  const identifiers = cliMisc.getIdentifiers();
  const diagnostic = cliMisc.getDiagnostic();
  return Promise.all([dvvr, tds, identifiers, diagnostic])
    .then((r) => {
      dispatch({
        type: MISC_INIT,
        misc: r,
      });
    });
};

const editMisc = (subSetting, payload) => (dispatch) => {
  const updatedMiscParams = {
    [subSetting]: payload,
  };
  const mirror = {
    dvvrSettings: 'editDvvr',
    tdsSettings: 'editTds',
    identifiers: 'editIdentifiers',
    diagnostic: 'editDiagnostic',
  };
  return cliMisc[mirror[subSetting]](payload)
    .then(() => {
      dispatch({
        type: MISC_EDIT,
        updatedMiscParams,
      });
    });
};

const actions = {
  init,
  editMisc,
};

/* ---------------- api ----------------------------------------------- */

const moduleName = () => 'misc';
const dvvrSettingsState = state => state.dvvrSettings;
const tdsSettingsState = state => state.tdsSettings;
const cctvServerMgmtBoardState = state => state.cctvServerMgmtBoard;
const identifiersState = state => state.identifiers;
const diagnosticState = state => state.diagnostic;

const api = {
  moduleName,
  dvvrSettings: dvvrSettingsState,
  tdsSettings: tdsSettingsState,
  cctvServerMgmtBoard: cctvServerMgmtBoardState,
  identifiers: identifiersState,
  diagnostic: diagnosticState,
};

/* --------- reducer ------------------------------------------- */

const reducer = (state = initialState, action) => {
  if (action.type === MISC_INIT) {
    const updatedState = {
      dvvrSettings: action.misc[0].data,
      tdsSettings: action.misc[1].data,
      identifiers: action.misc[2].data,
      diagnostic: action.misc[3].data,
    };
    return {
      ...state,
      ...updatedState,
    };
  }
  if (action.type === MISC_EDIT) {
    const updatedState = action.updatedMiscParams;
    return {
      ...state,
      ...updatedState,
    };
  }
  return state;
};

/* ------------------------------------------------------------- */
const misc = asyncStatusDecorator(
  'editMisc', initStatusDecorator(
    'init', ({ actionTypes, actions, api, reducer })));

module.exports = misc;
