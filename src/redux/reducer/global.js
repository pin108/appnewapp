const initGlobalState = {
  isError: false,
  message: '',
  isLogin: false,
  loading: false,
  listCart: [],
};

export const globalReducer = (state = initGlobalState, action) => {
  if (action.type === 'SET_ERROR') {
    return {
      ...state,
      isError: action.value.isError,
      message: action.value.message,
    };
  }
  if (action.type === 'SET_LOGIN') {
    return {
      ...state,
      isLogin: action.value,
    };
  }
  if (action.type === 'SET_LOADING') {
    return {
      ...state,
      loading: action.value,
    };
  }
  if (action.type === 'SET_LIST_CART') {
    return {
      ...state,
      listCart: action.value,
    };
  }
  return state;
};
