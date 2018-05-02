import initStatusDecorator from '../lib/init_status_decorator';
import { cliVersion } from '../client';

/* --------- initial state ------------------------------------------- */

const initialState = {
  version: {},
};

/* --------- actionTypes ------------------------------------------- */

const INIT_VERSION = 'INIT_VERSION';

const actionTypes = [
  INIT_VERSION,
];

/* --------- actions ------------------------------------------- */

const init = () => (dispatch) => {
  return cliVersion.getVersion()
    .then((r) => {
      dispatch({
        type: INIT_VERSION,
        version: r.data,
      });
    });
};

const actions = {
  init,
};

/* ---------------- api ----------------------------------------------- */

const moduleName = () => 'version';
const stateVersion = state => state.version;

const api = {
  moduleName,
  version: stateVersion,
};

/* --------- reducer ------------------------------------------- */

const reducer = (state = initialState, action) => {
  if (action.type === INIT_VERSION) {
    return {
      ...state,
      version: action.version,
    };
  }
  return state;
};

/* ------------------------------------------------------------- */
const version = initStatusDecorator(
  'init', ({ actionTypes, actions, api, reducer }));

module.exports = version;
