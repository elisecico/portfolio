const ModuleStatus = {
  NOT_STARTED: 'not started',
  PENDING: 'pending',
  SUCCESS: 'success',
  FAILED: 'failed',
};

const decorator = (asyncActionName, { reducer, actions, actionTypes, api }) => {
  /* -------------- action types and creators ---------------------- */
  const actionTypePrefix = asyncActionName.toUpperCase();
  const DECORATOR_SET_STATUS = `${actionTypePrefix}_ASYNC_STATUS_DECORATOR_SET_STATUS`;
  const _actionTypes = [...actionTypes, DECORATOR_SET_STATUS];

  const setStatus = (status) => {
    return {
      type: DECORATOR_SET_STATUS,
      status,
    };
  };
  /* -------------- actions ---------------------------------------- */
  const newAsync = (...args) => (dispatch) => {
    dispatch(setStatus(ModuleStatus.PENDING));
    return dispatch(actions[asyncActionName](...args))
      .then((res) => {
        dispatch(setStatus(ModuleStatus.SUCCESS));
        return res;
      })
      .catch((e) => {
        console.warn(e); // eslint-disable-line no-console
        dispatch(setStatus(ModuleStatus.FAILED));
      });
  };


  const _actions = { ...actions, [asyncActionName]: newAsync };
  /* -------------- api -------------------------------------------- */
  const _api = {
    ...api,
    [`${asyncActionName}Success`]: state => state[`${asyncActionName}Status`] === ModuleStatus.SUCCESS,
    [`${asyncActionName}Pending`]: state => state[`${asyncActionName}Status`] === ModuleStatus.PENDING,
    [`${asyncActionName}Failed`]: state => state[`${asyncActionName}Status`] === ModuleStatus.FAILED,
  };
  /* -------------- reducer ---------------------------------------- */
  const initialState = {
    ...reducer(undefined, { type: '' }),
    [`${asyncActionName}Status`]: ModuleStatus.NOT_STARTED,
  };

  const _reducer = (state, action) => {
    if (typeof state === 'undefined') {
      return initialState;
    }
    if (actionTypes.includes(action.type)) {
      return reducer(state, action);
    }
    if (action.type === DECORATOR_SET_STATUS) {
      return { ...state, [`${asyncActionName}Status`]: action.status };
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
