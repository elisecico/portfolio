import initStatusDecorator from '../lib/init_status_decorator';
import asyncStatusDecorator from '../lib/async_status_decorator';
import { cliSystemLog } from '../client';

/* --------- initial state ------------------------------------------- */

const initialState = {
  plaintxt: '',
  csv_link: '',
  text_link: '',
};

/* --------- actionTypes ------------------------------------------- */

const SYSTEM_LOG_INIT = 'SYSTEM_LOG_INIT';
const GET_PLAINTXT = 'GET_PLAINTXT';

const actionTypes = [
  SYSTEM_LOG_INIT,
  GET_PLAINTXT,
];

/* --------- actions ------------------------------------------- */

const init = () => (dispatch) => {
  const plaintxt = cliSystemLog.getPlaintxt();
  const csv = cliSystemLog.getLogCsv();
  const txt = cliSystemLog.getLogTxt();
  return Promise.all([plaintxt, csv, txt])
    .then((r) => {
      dispatch({
        type: SYSTEM_LOG_INIT,
        systemLog: r,
      });
    });
};

const getPlaintxt = () => (dispatch) => {
  return cliSystemLog.getPlaintxt()
    .then((r) => {
      dispatch({
        type: GET_PLAINTXT,
        plaintxt: r.data,
      });
    });
};

const actions = {
  init,
  getPlaintxt,
};

/* ---------------- api ----------------------------------------------- */

const moduleName = () => 'systemLog';
const stateSystemLog = state => state;
const statePlaintxt = state => state.plaintxt;

const api = {
  moduleName,
  systemLog: stateSystemLog,
  plaintxt: statePlaintxt,
};

/* --------- reducer ------------------------------------------- */

const reducer = (state = initialState, action) => {
  if (action.type === SYSTEM_LOG_INIT) {
    const updatedState = {
      plaintxt: action.systemLog[0].data,
      csv_link: action.systemLog[1].data,
      text_link: action.systemLog[2].data,
    };
    return {
      ...state,
      ...updatedState,
    };
  }
  if (action.type === GET_PLAINTXT) {
    const updatedState = {
      plaintxt: action.plaintxt,
    };
    return {
      ...state,
      ...updatedState,
    };
  }
  return state;
};

/* ------------------------------------------------------------- */
const systemLog = asyncStatusDecorator(
  'getPlaintxt', initStatusDecorator(
    'init', ({ actionTypes, actions, api, reducer })));

module.exports = systemLog;
