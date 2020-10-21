import MODULE from './types';

export default {
  [MODULE.GET_USER_TOKEN]: ({ userToken }) => userToken,
  [MODULE.GET_USER_TYPE]: ({ userType }) => userType,
};
