import MODULE from './types';

export default {
  [MODULE.MUTATE_DEVICE_DATA]: (state, deviceData) => {
    state.deviceData = deviceData;
  },
  [MODULE.MUTATE_USER_DATA]: (state, userData) => {
    state.userData = userData;
  },
  [MODULE.MUTATE_SELECTED_USER]: (state, selectedUser) => {
    state.selectedUser = selectedUser;
  },
};
