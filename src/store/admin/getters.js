import MODULE from './types';

export default {
  [MODULE.GET_DEVICE_DATA]: ({ deviceData }) => deviceData,
  [MODULE.GET_USER_DATA]: ({ userData }) => userData,
  [MODULE.GET_SELECTED_USER]: ({ selectedUser }) => selectedUser,
};
