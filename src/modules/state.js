/**
 * This module holds the "main" redux store api, which gives access to the
 * top-level modules (e.g. users, accounts etc..).
 * Containers use this api to select the portion of redux state they are
 * interested in.
 * Note: to avoid circular dependencies between the store api and container
 * modules we have to keep this (and only this) api separated from store.js.
 */

/* ---------------- api ----------------------------------------------------- */

const getAccounts = state => state.accounts;
const getCameraDownload = state => state.cameraDownload;
const getCameraSettings = state => state.cameraSettings;
const getCameraStatus = state => state.cameraStatus;
const getCctvServerStatus = state => state.cctvServerStatus;
const getLogin = state => state.login;
const getMisc = state => state.misc;
const getNav = state => state.nav;
const getNetwork = state => state.network;
const getSystemLog = state => state.systemLog;
const getUpdateFirmware = state => state.updateFirmware;
const getVersion = state => state.version;

module.exports = {
  getAccounts,
  getCameraDownload,
  getCameraSettings,
  getCameraStatus,
  getCctvServerStatus,
  getLogin,
  getMisc,
  getNav,
  getNetwork,
  getSystemLog,
  getUpdateFirmware,
  getVersion,
};

/* -------------------------------------------------------------------------- */
