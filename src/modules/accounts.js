import initStatusDecorator from '../lib/init_status_decorator';
import asyncStatusDecorator from '../lib/async_status_decorator';
import { cliAccounts } from '../client';

/* --------- initial state ------------------------------------------- */

const initialState = {
  accounts: [],
  selectedAccounts: [],
  isLogoutRequired: false,
};

/* --------- actionTypes ------------------------------------------- */

const ACCOUNTS_INIT = 'ACCOUNTS_INIT';
const ACCOUNTS_ADD = 'ACCOUNTS_ADD';
const ACCOUNTS_EDIT = 'ACCOUNTS_EDIT';
const ACCOUNTS_DELETE = 'ACCOUNTS_DELETE';
const ACCOUNTS_RESET = 'ACCOUNTS_RESET';
const REQUIRE_LOGOUT = 'REQUIRE_LOGOUT';

const actionTypes = [
  ACCOUNTS_INIT,
  ACCOUNTS_ADD,
  ACCOUNTS_EDIT,
  ACCOUNTS_DELETE,
  ACCOUNTS_RESET,
  REQUIRE_LOGOUT,
];

/* --------- actions ------------------------------------------- */

const init = () => (dispatch) => {
  return cliAccounts.getAccounts()
    .then((r) => {
      dispatch({
        type: ACCOUNTS_INIT,
        accounts: r.data.users,
      });
    });
};

const addAccount = payload => (dispatch) => {
  const promessa = new Promise(() => {
  });
  let hashedPswd = '';
  return promessa.then((hash) => {
    hashedPswd = hash;
    const updatedAccountPayload = {
      profile: payload.profile,
      fullName: payload.fullName,
      username: payload.username,
      enabled: payload.enabled,
      password: hashedPswd,
    };
    return cliAccounts.addAccount(updatedAccountPayload);
  }).then(() => {
    const updatedAccount = {
      profile: payload.profile,
      fullName: payload.fullName,
      username: payload.username,
      enabled: payload.enabled,
      password: hashedPswd,
      id: payload.username,
      description: payload.fullName,
    };
    dispatch({
      type: ACCOUNTS_ADD,
      updatedAccount,
    });
  });
};

const editAccount = (account, payload) => (dispatch) => {
  if (account.password === payload.password) {
    const updatedAccountPayload = {
      profile: payload.profile,
      fullName: payload.fullName,
      username: payload.username,
      enabled: payload.enabled,
      id: payload.id,
      password: account.password,
    };
    return cliAccounts.editAccount(updatedAccountPayload)
      .then(() => {
        const updatedAccount = {
          profile: payload.profile,
          fullName: payload.fullName,
          username: payload.username,
          enabled: payload.enabled,
          password: account.password,
          id: payload.id,
          description: payload.fullName,
        };
        dispatch({
          type: ACCOUNTS_EDIT,
          updatedAccount,
        });
      });
  }
  const promessa = new Promise(() => {
  });
  let hashedPswd = '';
  return promessa.then((hash) => {
    hashedPswd = hash;
    const updatedAccountPayload = {
      profile: payload.profile,
      fullName: payload.fullName,
      username: payload.username,
      enabled: payload.enabled,
      id: payload.id,
      password: hashedPswd,
    };
    return cliAccounts.editAccount(updatedAccountPayload);
  }).then(() => {
    const updatedAccount = {
      profile: payload.profile,
      fullName: payload.fullName,
      username: payload.username,
      enabled: payload.enabled,
      password: hashedPswd,
      id: payload.id,
      description: payload.fullName,
    };
    dispatch({
      type: ACCOUNTS_EDIT,
      updatedAccount,
    });
  });
};

const deleteAccount = accountId => (dispatch) => {
  return cliAccounts.deleteAccount(accountId)
    .then(() => {
      dispatch({
        type: ACCOUNTS_DELETE,
        accountIds: accountId,
      });
    });
};

const requireLogout = () => {
  return {
    type: REQUIRE_LOGOUT,
  };
};

const resetAccounts = () => {
  return {
    type: ACCOUNTS_RESET,
  };
};

const actions = {
  init,
  addAccount,
  editAccount,
  deleteAccount,
  requireLogout,
  resetAccounts,
};

/* ---------------- api ----------------------------------------------- */

const moduleName = () => 'accounts';
const stateAccounts = state => state.accounts;
const stateSelectedAccounts = state => state.selectedAccounts;
const stateIsLogoutRequired = state => state.isLogoutRequired;

const api = {
  moduleName,
  accounts: stateAccounts,
  selectedAccounts: stateSelectedAccounts,
  isLogoutRequired: stateIsLogoutRequired,
};

/* --------- reducer ------------------------------------------- */

const reducer = (state = initialState, action) => {
  if (action.type === ACCOUNTS_INIT) {
    const updatedAccounts = action.accounts.map((account) => {
      return {
        ...account,
        description: account.fullName,
        'enabled/disabled': account.enabled ? 'enabled' : 'disabled',
      };
    });
    return {
      ...state,
      accounts: updatedAccounts,
    };
  }
  if (action.type === ACCOUNTS_ADD) {
    const updatedAccount = { ...action.updatedAccount };
    updatedAccount['enabled/disabled'] = updatedAccount.enabled ? 'enabled' : 'disabled';
    const updatedAccounts = state.accounts;
    updatedAccounts.push(updatedAccount);
    return {
      ...state,
      accounts: updatedAccounts,
    };
  }
  if (action.type === ACCOUNTS_EDIT) {
    const updatedAccount = { ...action.updatedAccount };
    updatedAccount['enabled/disabled'] = updatedAccount.enabled ? 'enabled' : 'disabled';
    const accounts = state.accounts;
    const updatedAccounts = accounts.map((acc) => {
      let accCopy = acc;
      if (updatedAccount.id === acc.id) {
        accCopy = updatedAccount;
      }
      return accCopy;
    });
    return {
      ...state,
      accounts: updatedAccounts,
      selectedAccounts: [updatedAccount.id],
    };
  }
  if (action.type === ACCOUNTS_DELETE) {
    const updatedAccounts = state.accounts.filter((account) => {
      return action.accountIds !== account.id;
    });
    return {
      ...state,
      accounts: updatedAccounts,
    };
  }
  if (action.type === REQUIRE_LOGOUT) {
    return {
      ...state,
      isLogoutRequired: true,
    };
  }
  if (action.type === ACCOUNTS_RESET) {
    return {
      ...initialState,
      accounts: state.accounts,
      selectedAccounts: state.selectedAccounts,
    };
  }
  return state;
};

/* ------------------------------------------------------------- */

const accounts = asyncStatusDecorator(
  'deleteAccount', asyncStatusDecorator(
    'editAccount', asyncStatusDecorator(
      'addAccount', initStatusDecorator(
        'init', ({ actionTypes, actions, api, reducer })))));

module.exports = accounts;
