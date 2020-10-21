import MODULE from './types';

export default {
  [MODULE.MUTATE_USERNAME]: (state, username) => {
    state.username = username;
  },
  [MODULE.MUTATE_PASSWORD]: (state, password) => {
    state.password = password;
  },
  [MODULE.MUTATE_USER_TOKEN]: (state, userToken) => {
    state.userToken = userToken;
  },
  [MODULE.MUTATE_USER_TYPE]: (state, userType) => {
    state.userType = userType;
  },
};
