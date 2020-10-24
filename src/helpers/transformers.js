import get from 'lodash/get';
import { DateTime } from 'luxon';
import { replaceCurly } from '~/helpers/system';

const TEMPERATURE_BASE_COLOR = process.env.VUE_APP_CHART_STYLE_TEMPERATURE_COLOR;
const HUMIDITY_BASE_COLOR = process.env.VUE_APP_CHART_STYLE_HUMIDITY_COLOR;
const PRESSURE_BASE_COLOR = process.env.VUE_APP_CHART_STYLE_PRESSURE_COLOR;
const RAIN_BASE_COLOR = process.env.VUE_APP_CHART_STYLE_RAIN_COLOE;
const SENSOR_TRANSLATION_KEY = 'momentData_{chartType}SensorTitle';

const CHART_BACKGROUND_MAPPER = {
  temperature: `rgba(${TEMPERATURE_BASE_COLOR}, 0.4)`,
  humidity: `rgba(${HUMIDITY_BASE_COLOR}, 0.4)`,
  pressure: `rgba(${PRESSURE_BASE_COLOR}, 0.4)`,
  rain: `rgba(${RAIN_BASE_COLOR}, 0.4)`,
};
const CHART_BORDER_MAPPER = {
  temperature: `rgba(${TEMPERATURE_BASE_COLOR}, 0.8)`,
  humidity: `rgba(${HUMIDITY_BASE_COLOR}, 0.8)`,
  pressure: `rgba(${PRESSURE_BASE_COLOR}, 0.8)`,
  rain: `rgba(${RAIN_BASE_COLOR}, 0.8)`,
};
const CHART_HOVER_MAPPER = {
  temperature: `rgba(${TEMPERATURE_BASE_COLOR}, 1)`,
  humidity: `rgba(${HUMIDITY_BASE_COLOR}, 1)`,
  pressure: `rgba(${PRESSURE_BASE_COLOR}, 1)`,
  rain: `rgba(${RAIN_BASE_COLOR}, 1)`,
};

export const userDataTransformer = (data) => {
  const temperatureMainSensor = get(data, 'sensors.temperature.main', null);
  const humidityMainSensor = get(data, 'sensors.humidity.main', null);
  const pressureMainSensor = get(data, 'sensors.pressure.main', null);
  const rainMainSensor = get(data, 'sensors.rain.main', null);

  const momentData = {
    temperature: get(data, `sensors.temperature.allSensors[${temperatureMainSensor}]`, null),
    humidity: get(data, `sensors.humidity.allSensors[${humidityMainSensor}]`, null),
    pressure: get(data, `sensors.pressure.allSensors[${pressureMainSensor}]`, null),
    rainfall: get(data, `sensors.rain.allSensors[${rainMainSensor}]`, null),
    windVerticalSpeed: get(data, 'sensors.wind.minute2.vertical', null),
    windSpeed: get(data, 'sensors.wind.minute2.horizontal', null),
    windDirection: get(data, 'sensors.wind.minute2.direction', null),
  };
  const deviceData = {
    name: get(data, 'deviceName', null),
    positionN: get(data, 'sensors.GPS.N', null),
    positionW: get(data, 'sensors.GPS.W', null),
    date: get(data, 'sensors.date', null),
    time: get(data, 'sensors.time', null),
    temperature1: get(data, 'sensors.power.battery[0].temperatureInsideEquipment', null),
    temperature2: get(data, 'sensors.power.battery[0].temperatureInsideEquipment', null),
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
export const chartDataTransformer = ({ reportTypes, chartData, chartPeriod, i18n }) => {
  const chartDataTypes = Object.keys(chartData);
  const filteredChartTypes = chartDataTypes.filter((chartType) => (reportTypes.includes(chartType)));
  const mappedChartData = filteredChartTypes.map((chartType) => {
    const chartTypeData = get(chartData, `${chartType}.${chartPeriod}`, []);
    const translationKey = replaceCurly(SENSOR_TRANSLATION_KEY, ['chartType'], [chartType]);
    return {
      label: get(i18n, translationKey, chartType),
      data: chartTypeData.map((item) => (item.y)),
      dataLabel: chartTypeData.map((item) => (item.time)),
      spanGaps: false,
      backgroundColor: CHART_BACKGROUND_MAPPER[chartType],

      borderColor: CHART_BORDER_MAPPER[chartType],
      borderCapStyle: 'round',
      borderJoinStyle: 'round',
      borderWidth: 1,

      pointBorderColor: CHART_BORDER_MAPPER[chartType],
      pointHoverBorderColor: CHART_HOVER_MAPPER[chartType],
      pointBackgroundColor: CHART_BACKGROUND_MAPPER[chartType],
      pointHoverBackgroundColor: CHART_HOVER_MAPPER[chartType],
      pointRadius: 2,
      pointHoverRadius: 8,
      pointBorderWidth: 1,
    };
  });
  const sortedDataItems = mappedChartData.sort((chartData1, chartData2) => {
    const data1 = get(chartData1, 'data', []);
    const data2 = get(chartData2, 'data', []);
    const sum1 = data1.reduce((a, b) => (a + b), 0) / data1.length;
    const sum2 = data2.reduce((a, b) => (a + b), 0) / data2.length;
    return sum1 - sum2;
  });
  const chartDataTimes = get(mappedChartData, '[0].dataLabel', []);
  const chartDataLabels = chartDataTimes.map((timestamp) => (DateTime.fromSeconds(timestamp).toISODate()));
  return {
    datasets: sortedDataItems,
    labels: chartDataLabels,
  };
};
