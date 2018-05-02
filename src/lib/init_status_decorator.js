const ModuleStatus = {
  NOT_INITIALIZED: 'not initialized',
  INITIALIZING: 'initializing',
  INITIALIZED: 'initialized',
  FAILED: 'failed',
};

const decorator = (initActionName, { reducer, actions, actionTypes, api }) => {
  /* -------------- action types and creators ---------------------- */
  const actionTypePrefix = api.moduleName().toUpperCase();
  const DECORATOR_SET_STATUS = `${actionTypePrefix}_INIT_STATUS_DECORATOR_SET_STATUS`;
  const _actionTypes = [...actionTypes, DECORATOR_SET_STATUS];

  const setStatus = (status) => {
    return {
      type: DECORATOR_SET_STATUS,
      status,
    };
  };
  /* -------------- actions ---------------------------------------- */
  const newInit = (...args) => (dispatch) => {
    dispatch(setStatus(ModuleStatus.INITIALIZING));
    return dispatch(actions[initActionName](...args))
      .then((res) => {
        dispatch(setStatus(ModuleStatus.INITIALIZED));
        return res;
      })
      .catch((e) => {
        console.warn('initialization encountered an error: ', e); // eslint-disable-line no-console
        dispatch(setStatus(ModuleStatus.FAILED));
      });
  };

  const _actions = { ...actions, [initActionName]: newInit };
  /* -------------- api -------------------------------------------- */
  const _api = {
    ...api,
    isInitialized: state => state.initStatus === ModuleStatus.INITIALIZED,
    isInitializing: state => state.initStatus === ModuleStatus.INITIALIZING,
    isFailed: state => state.initStatus === ModuleStatus.FAILED,
  };
  /* -------------- reducer ---------------------------------------- */
  const initialState = {
    ...reducer(undefined, { type: '' }),
    initStatus: ModuleStatus.NOT_INITIALIZED,
  };

  const _reducer = (state, action) => {
    if (typeof state === 'undefined') {
      return initialState;
    }
    if (actionTypes.includes(action.type)) {
      return reducer(state, action);
    }
    if (action.type === DECORATOR_SET_STATUS) {
      return { ...state, initStatus: action.status };
    }
    return state;
  };
  return {
    reducer: _reducer,
    actions: _actions,
    actionTypes: _actionTypes,
    api: _api,
  };
};

export default decorator;
