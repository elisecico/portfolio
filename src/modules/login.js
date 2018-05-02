import initStatusDecorator from '../lib/init_status_decorator';
import asyncStatusDecorator from '../lib/async_status_decorator';
import { cliLogin } from '../client';

/* --------- initial state ------------------------------------------- */

const initialState = {
  userProfile: '',
  username: '',
};

/* --------- actionTypes ------------------------------------------- */

const INIT = 'INIT';
const SET_PROFILE_TYPE = 'SET_PROFILE_TYPE';
const LOGOUT = 'LOGOUT';

const actionTypes = [
  INIT,
  SET_PROFILE_TYPE,
  LOGOUT,
];

/* --------- actions ------------------------------------------- */

const init = payload => (dispatch) => {
  return cliLogin.logUser(payload)
    .then((r) => {
      dispatch({
        type: INIT,
        profile: r.data,
      });
    });
};

const setProfile = profileType => (dispatch) => {
  return Promise.resolve()
    .then(() => {
      dispatch({
        type: SET_PROFILE_TYPE,
        profileType,
      });
    });
};

const logout = () => (dispatch) => {
  return Promise.resolve()
    .then(() => {
      dispatch({
        type: LOGOUT,
      });
    });
};

const actions = {
  setProfile,
  init,
  logout,
};

/* ---------------- api ----------------------------------------------- */

const moduleName = () => 'login';
const stateUserProfile = state => state.userProfile;
const stateUsername = state => state.username;

const api = {
  moduleName,
  userProfile: stateUserProfile,
  username: stateUsername,
};

/* --------- reducer ------------------------------------------- */

const reducer = (state = initialState, action) => {
  if (action.type === INIT) {
    window.localStorage.setItem('idToken', action.profile.token);
    window.localStorage.setItem('profileType', action.profile.profilo);
    return {
      ...state,
      userProfile: action.profile.profilo,
      username: action.profile.username,
    };
  }
  if (action.type === SET_PROFILE_TYPE) {
    return {
      ...state,
      userProfile: action.profileType,
    };
  }
  if (action.type === LOGOUT) {
    window.localStorage.setItem('idToken', '');
    window.localStorage.setItem('profileType', '');
    return {
      ...initialState,
    };
  }
  return state;
};

/* ------------------------------------------------------------- */

const login = asyncStatusDecorator(
  'setProfile', initStatusDecorator(
    'init', ({ actionTypes, actions, api, reducer })));

module.exports = login;
