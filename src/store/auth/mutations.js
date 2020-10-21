import MODULE from './types';

export default {
  [MODULE.MUTATE_USER_TOKEN]: (state, userToken) => {
    state.userToken = userToken;
  },
  [MODULE.MUTATE_USER_TYPE]: (state, userType) => {
    state.userType = userType;
  },
};
