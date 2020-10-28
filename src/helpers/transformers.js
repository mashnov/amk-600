import get from 'lodash/get';
import { DateTime } from 'luxon';
import { replaceCurly, numberTransformer } from '~/helpers/system';

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
const CHART_PERIOD_LABEL_FORMAT_MAPPER = {
  day: 'HH:mm',
  week: 'dd MMM',
  month: 'dd.MM',
  year: 'MMM yyyy',
};

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
    positionN: numberTransformer(get(data, 'sensors.GPS.N', 0), '0,0.00000'),
    positionW: numberTransformer(get(data, 'sensors.GPS.W', 0), '0,0.00000'),
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

export const chartDataTransformer = ({ reportTypes, chartData, chartPeriod, i18n, currentLanguage }) => {
  const chartDataTypes = Object.keys(chartData);
  const filteredChartTypes = chartDataTypes.filter((chartType) => (reportTypes.includes(chartType)));
  const mappedChartData = filteredChartTypes.map((chartType) => {
    const chartTypeData = get(chartData, `${chartType}.${chartPeriod}`, []);
    const translationKey = replaceCurly(SENSOR_TRANSLATION_KEY, ['chartType'], [chartType]);
    return {
      label: get(i18n, translationKey, chartType),
      data: chartTypeData.map((item) => (numberTransformer(get(item, 'y', 0)))),
      dataLabel: chartTypeData.map((item) => (item.time)),
      pointBorderColor: CHART_BORDER_MAPPER[chartType],
      pointHoverBorderColor: CHART_HOVER_MAPPER[chartType],
      pointBackgroundColor: CHART_BACKGROUND_MAPPER[chartType],
      pointHoverBackgroundColor: CHART_HOVER_MAPPER[chartType],
      backgroundColor: CHART_BACKGROUND_MAPPER[chartType],
      borderColor: CHART_BORDER_MAPPER[chartType],
      borderWidth: 1,
      pointHoverRadius: 8,
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
  const chartDataLabels = chartDataTimes.map((timestamp) => {
    const outputFormat = CHART_PERIOD_LABEL_FORMAT_MAPPER[chartPeriod];
    const luxonTime = DateTime.fromSeconds(timestamp);
    return luxonTime.setLocale(currentLanguage).toFormat(outputFormat);
  });
  return {
    datasets: sortedDataItems,
    labels: chartDataLabels,
  };
};
