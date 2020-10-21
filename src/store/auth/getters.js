import MODULE from './types';

export default {
  [MODULE.GET_USERNAME]: ({ username }) => username,
  [MODULE.GET_PASSWORD]: ({ password }) => password,
  [MODULE.GET_USER_TOKEN]: ({ userToken }) => userToken,
  [MODULE.GET_USER_TYPE]: ({ userType }) => userType,
};
