import MODULE from './types';

export default {
  [MODULE.GET_DEVICE_DATA]: ({ deviceData }) => deviceData,
  [MODULE.GET_USER_DATA]: ({ userData }) => userData,
};
