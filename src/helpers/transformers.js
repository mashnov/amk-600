import get from 'lodash/get';

export const userDataTransformer = (data) => {
  const temperatureMainSensor = get(data, 'sensors.temperature.main', null);
  const humidityMainSensor = get(data, 'sensors.humidity.main', null);
  const pressureMainSensor = get(data, 'sensors.pressure.main', null);

  const momentData = {
    temperature: get(data, `sensors.temperature.allSensors[${temperatureMainSensor}]`, null),
    humidity: get(data, `sensors.humidity.allSensors[${humidityMainSensor}]`, null),
    pressure: get(data, `sensors.pressure.allSensors[${pressureMainSensor}]`, null),
    //TODO: УТОЧНИТЬ КАКОЕ ИМЕННО ПОЛЕ ВЫВОДИТЬ
    rainfall: get(data, 'sensors.rain.rainPower', null),
    windVerticalSpeed: get(data, 'sensors.wind.minute2.vertical', null),
    windSpeed: get(data, 'sensors.wind.minute2.horizontal', null),
    windDirections: get(data, 'sensors.wind.minute2.direction', null),
  };
  const deviceData = {
    name: get(data, 'deviceName', null),
    positionN: get(data, 'sensors.GPS.N', null),
    positionW: get(data, 'sensors.GPS.W', null),
    date: get(data, 'sensors.date', null),
    time: get(data, 'sensors.time', null),
    temperature1: get(data, `sensors.power.battery[0].temperatureInsideEquipment`, null),
    temperature2: get(data, `sensors.power.battery[0].temperatureInsideEquipment`, null),
    power1: get(data, 'sensors.power.battery[0].batteryPower', null),
    power2: get(data, 'sensors.power.battery[1].batteryPower', null),
    voltage1: get(data, 'sensors.power.battery[0].batteryVoltage', null),
    voltage2: get(data, 'sensors.power.battery[1].batteryVoltage', null),
  };
  const statData = {
    windSpeed: get(data, 'sensors.wind.minute10.vertical', null),
    windHorizontalSpeed: get(data, 'sensors.wind.minute10.horizontal', null),
    windMaxSpeed: get(data, 'sensors.wind.minute10.max', null),
    windDirection: get(data, 'sensors.wind.minute10.direction', null),
    dewPoint: get(data, 'sensors.temperature.dewPoint', null),
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
export const adminDataTransformer = (data) => {
  return data;
};
