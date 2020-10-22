import MODULE from './types';

export default {
  [MODULE.GET_MOMENT_DATA]: ({ momentData }) => momentData,
  [MODULE.GET_STAT_DATA]: ({ statData }) => statData,
  [MODULE.GET_DEVICE_DATA]: ({ deviceData }) => deviceData,
  [MODULE.GET_SENSOR_DATA]: ({ sensorData }) => sensorData,
};
