import MODULE from './types';

export default {
  [MODULE.MUTATE_MOMENT_DATA]: (state, momentData) => {
    state.momentData = momentData;
  },
  [MODULE.MUTATE_STAT_DATA]: (state, statData) => {
    state.statData = statData;
  },
  [MODULE.MUTATE_DEVICE_DATA]: (state, deviceData) => {
    state.deviceData = deviceData;
  },
  [MODULE.MUTATE_SENSOR_DATA]: (state, sensorData) => {
    state.sensorData = sensorData;
  },
};
