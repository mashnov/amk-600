import get from 'lodash/get';
import { numberTransformer } from '~/helpers/system';

export const userDataTransformer = (data) => {
  const temperatureMainSensor = get(data, 'sensors.temperature.main', null);
  const humidityMainSensor = get(data, 'sensors.humidity.main', null);
  const pressureMainSensor = get(data, 'sensors.pressure.main', null);
  const rainMainSensor = get(data, 'sensors.rain.main', null);

  const momentData = {
    temperature: numberTransformer(get(data, `sensors.temperature.allSensors[${temperatureMainSensor}]`, 0)),
    humidity: numberTransformer(get(data, `sensors.humidity.allSensors[${humidityMainSensor}]`, 0)),
    pressure: numberTransformer(get(data, `sensors.pressure.allSensors[${pressureMainSensor}]`, 0)),
    rainfall: numberTransformer(get(data, `sensors.rain.allSensors[${rainMainSensor}]`, 0)),
    windVerticalSpeed: numberTransformer(get(data, 'sensors.wind.minute2.vertical', 0)),
    windSpeed: numberTransformer(get(data, 'sensors.wind.minute2.horizontal', 0)),
    windDirection: numberTransformer(get(data, 'sensors.wind.minute2.direction', 0)),
  };
  const deviceData = {
    name: get(data, 'deviceName', null),
    positionN: get(data, 'sensors.GPS.N', 0),
    positionW: get(data, 'sensors.GPS.W', 0),
    date: get(data, 'sensors.date', null),
    time: get(data, 'sensors.time', null),
    temperature1: numberTransformer(get(data, 'sensors.power.battery[0].temperatureInsideEquipment', 0)),
    temperature2: numberTransformer(get(data, 'sensors.power.battery[0].temperatureInsideEquipment', 0)),
    realTemperature1: get(data, 'sensors.power.battery[0].temperatureInsideEquipment', 0),
    realTemperature2: get(data, 'sensors.power.battery[0].temperatureInsideEquipment', 0),
    power1: numberTransformer(get(data, 'sensors.power.battery[0].batteryPower', 0)),
    power2: numberTransformer(get(data, 'sensors.power.battery[1].batteryPower', 0)),
    realPower1: get(data, 'sensors.power.battery[0].batteryPower', 0),
    realPower2: get(data, 'sensors.power.battery[1].batteryPower', 0),
    voltage1: numberTransformer(get(data, 'sensors.power.battery[0].batteryVoltage', 0)),
    voltage2: numberTransformer(get(data, 'sensors.power.battery[1].batteryVoltage', 0)),
    realVoltage1: get(data, 'sensors.power.battery[0].batteryVoltage', 0),
    realVoltage2: get(data, 'sensors.power.battery[1].batteryVoltage', 0),
    battery1Charging: get(data, 'sensors.power.battery[0].isBatteryCharging', false),
    battery2Charging: get(data, 'sensors.power.battery[1].isBatteryCharging', false),
  };
  const statData = {
    windSpeed: numberTransformer(get(data, 'sensors.wind.minute10.vertical', 0)),
    windHorizontalSpeed: numberTransformer(get(data, 'sensors.wind.minute10.horizontal', 0)),
    windMaxSpeed: numberTransformer(get(data, 'sensors.wind.minute10.max', 0)),
    windDirection: numberTransformer(get(data, 'sensors.wind.minute10.direction', 0)),
    dewPoint: numberTransformer(get(data, 'sensors.temperature.dewPoint', 0)),
  };
  const sensorData = {
    windIsOnLine: get(data, 'sensors.modulesStatus.wind', false),
    rainIsOnLine: get(data, 'sensors.modulesStatus.rain', false),
    weatherIsOnLine: get(data, 'sensors.modulesStatus.weather', false),
    gpsIsOnLine: get(data, 'sensors.modulesStatus.GPS', false),
    compassIsOnLine: get(data, 'sensors.modulesStatus.compass', false),
    battery1IsOnLine: get(data, 'sensors.modulesStatus.battery[0]', false),
    battery2IsOnLine: get(data, 'sensors.modulesStatus.battery[1]', false),
  };
  return { momentData, statData, deviceData, sensorData };
};

export const chartDataTransformer = ({ chartData, chartPeriod }) => {
  return {
    temperature: get(chartData, `temperature.${chartPeriod}`, []),
    humidity: get(chartData, `humidity.${chartPeriod}`, []),
    pressure: get(chartData, `pressure.${chartPeriod}`, []),
    rain: get(chartData, `rain.${chartPeriod}`, []),
    windVSpeed: get(chartData, `windVSpeed.${chartPeriod}`, []),
    windDirection: get(chartData, `windDirection.${chartPeriod}`, []),
    windHSpeed: get(chartData, `windHSpeed.${chartPeriod}`, []),
  };
};
