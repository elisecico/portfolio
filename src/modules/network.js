import initStatusDecorator from '../lib/init_status_decorator';
import asyncStatusDecorator from '../lib/async_status_decorator';
import { cliNetwork } from '../client';

/* --------- initial state ------------------------------------------- */

const initialState = {
  network: {
    ipAddress: '',
    subnetMask: '',
    gateway: '',
  },
};

/* --------- actionTypes ------------------------------------------- */

const NETWORK_INIT = 'NETWORK_INIT';
const NETWORK_EDIT = 'NETWORK_EDIT';

const actionTypes = [
  NETWORK_INIT,
  NETWORK_EDIT,
];

/* --------- actions ------------------------------------------- */

const init = () => (dispatch) => {
  return cliNetwork.getNetwork()
    .then((r) => {
      dispatch({
        type: NETWORK_INIT,
        network: r.data,
      });
    });
};

const editNetwork = payload => (dispatch) => {
  const updatedNetParams = {
    ipAddress: payload.ipAddress,
    subnetMask: payload.subnetMask,
    gateway: payload.gateway,
  };
  return cliNetwork.editNetwork(payload)
    .then(() => {
      dispatch({
        type: NETWORK_EDIT,
        updatedNetParams,
      });
    });
};

const actions = {
  init,
  editNetwork,
};

/* ---------------- api ----------------------------------------------- */

const moduleName = () => 'network';
const stateNetwork = state => state.network;

const api = {
  moduleName,
  network: stateNetwork,
};

/* --------- reducer ------------------------------------------- */

const reducer = (state = initialState, action) => {
  if (action.type === NETWORK_INIT) {
    return {
      ...state,
      network: action.network,
    };
  }
  if (action.type === NETWORK_EDIT) {
    return {
      ...state,
      network: action.updatedNetParams,
    };
  }
  return state;
};

/* ------------------------------------------------------------- */
const network = asyncStatusDecorator(
  'editNetwork', initStatusDecorator(
    'init', ({ actionTypes, actions, api, reducer })));

module.exports = network;
