import MODULE from './types';

export default {
  [MODULE.GET_MOMENT_DATA]: ({ momentData }) => momentData,
  [MODULE.GET_STAT_DATA]: ({ statData }) => statData,
  [MODULE.GET_DEVICE_DATA]: ({ deviceData }) => deviceData,
  [MODULE.GET_SENSOR_DATA]: ({ sensorData }) => sensorData,
  [MODULE.GET_UNIT_SYSTEM]: ({ unitSystem }) => unitSystem,
  [MODULE.GET_CAMERA_PORT]: ({ cameraPort }) => cameraPort,
};
