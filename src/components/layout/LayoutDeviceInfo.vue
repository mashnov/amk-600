<template>
  <div class="col-11 col-sm-8 col-md-7 col-lg-9 col-xl-5 user-device-info">
    <div class="row">
      <div class="col-12 col-sm-10 offset-sm-1">
        <div class="row mb-5">
          <div class="col-12 mb-5">
            <div class="layout-devise-info__title">
              {{ deviceData.name }}
            </div>
          </div>
          <div class="col-12 col-lg-6 mb-4">
            <div class="layout-devise-info__status-item">
              <GeolocationIcon />
              <span>
                <a
                  :href="googleMapsLink"
                  target="_blank"
                >
                  {{ deviceData.positionN }}N {{ deviceData.positionW }}W
                </a>
              </span>
            </div>
          </div>
          <div class="col-12 col-lg-6 mb-4">
            <div class="layout-devise-info__status-item">
              <TimeIcon />
              <span>
                {{ formattedTime }}
              </span>
            </div>
          </div>
          <div class="col-12 col-lg-6 mb-4">
            <div class="layout-devise-info__status-item">
              <CalendarIcon />
              <span>
                {{ formattedDate }}
              </span>
            </div>
          </div>
          <div class="col-12 col-lg-6 mb-4">
            <div
              class="layout-devise-info__status-item"
              :class="[
                temperatureIsOrange && 'layout-devise-info__status-item_orange',
                temperatureIsRed && 'layout-devise-info__status-item_red',
              ]"
            >
              <TemperatureIcon />
              <span>
                {{ i18n.deviceStatus_temperatureTitle }}: {{ deviceData.temperature1 }}{{ i18n.deviceStatus_temperatureUnit }} | {{ deviceData.temperature2 }}{{ i18n.deviceStatus_temperatureUnit }}
              </span>
            </div>
          </div>
          <div class="col-12 col-lg-6 mb-4">
            <div
              class="layout-devise-info__status-item"
              :class="[
                powerIsOrange && 'layout-devise-info__status-item_orange',
                powerIsRed && 'layout-devise-info__status-item_red',
              ]"
            >
              <PowerIcon />
              <span>
                {{ i18n.deviceStatus_powerTitle }}: {{ deviceData.power1 }} {{ i18n.deviceStatus_powerUnit }} | {{ deviceData.power2 }} {{ i18n.deviceStatus_powerUnit }}
              </span>
            </div>
          </div>
          <div class="col-12 col-lg-6 mb-4">
            <div
              class="layout-devise-info__status-item"
              :class="[
                voltageIsOrange && 'layout-devise-info__status-item_orange',
                voltageIsRed && 'layout-devise-info__status-item_red',
              ]"
            >
              <VoltageIcon />
              <span>
                {{ i18n.deviceStatus_voltageTitle }}: {{ deviceData.voltage1 }}{{ i18n.deviceStatus_voltageUnit }} | {{ deviceData.voltage2 }}{{ i18n.deviceStatus_voltageUnit }}
              </span>
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-12 position-relative">
            <div class="d-none d-lg-block user-device-info__image">
              <img
                src="/images/device.png"
                :alt="deviceData.name"
              />
            </div>
            <div class="layout-devise-info__sensor-status-wrapper">
              <div
                class="layout-devise-info__sensor-status-item"
                :class="!sensorData.windIsOnLine && 'layout-devise-info__sensor-status-item_red'"
              >
                <span
                  v-html="i18n.deviceStatus_sensorWindTitle"
                />
                <span>
                  {{ sensorData.windIsOnLine ? i18n.deviceStatus_sensorStatusCorrect : i18n.deviceStatus_sensorStatusError }}
                </span>
              </div>
              <div
                class="layout-devise-info__sensor-status-item"
                :class="!sensorData.rainIsOnLine && 'layout-devise-info__sensor-status-item_red'"
              >
                <span
                  v-html="i18n.deviceStatus_sensorRainTitle"
                />
                <span>
                  {{ sensorData.rainIsOnLine ? i18n.deviceStatus_sensorStatusCorrect : i18n.deviceStatus_sensorStatusError }}
                </span>
              </div>
              <div
                class="layout-devise-info__sensor-status-item"
                :class="!sensorData.gpsIsOnLine && 'layout-devise-info__sensor-status-item_red'"
              >
                <span
                  v-html="i18n.deviceStatus_sensorGeoTitle"
                />
                <span>
                  {{ sensorData.gpsIsOnLine ? i18n.deviceStatus_sensorStatusCorrect : i18n.deviceStatus_sensorStatusError }}
                </span>
              </div>
              <div
                class="layout-devise-info__sensor-status-item"
                :class="!sensorData.weatherIsOnLine && 'layout-devise-info__sensor-status-item_red'"
              >
                <span
                  v-html="i18n.deviceStatus_sensorWeatherTitle"
                />
                <span>
                  {{ sensorData.weatherIsOnLine ? i18n.deviceStatus_sensorStatusCorrect : i18n.deviceStatus_sensorStatusError }}
                </span>
              </div>
              <div
                class="layout-devise-info__sensor-status-item"
                :class="!sensorData.compassIsOnLine && 'layout-devise-info__sensor-status-item_red'"
              >
                <span
                  v-html="i18n.deviceStatus_sensorCompassTitle"
                />
                <span>
                  {{ sensorData.compassIsOnLine ? i18n.deviceStatus_sensorStatusCorrect : i18n.deviceStatus_sensorStatusError }}
                </span>
              </div>
              <div
                class="layout-devise-info__sensor-status-item"
                :class="!sensorData.battery1IsOnLine && sensorData.battery2IsOnLine && 'layout-devise-info__sensor-status-item_red'"
              >
                <span
                  v-html="i18n.deviceStatus_sensorPowerTitle"
                />
                <span>
                  {{ sensorData.battery1IsOnLine && sensorData.battery2IsOnLine ? i18n.deviceStatus_sensorStatusCorrect : i18n.deviceStatus_sensorStatusError }}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import { DateTime } from 'luxon';
  import { mapGetters } from 'vuex';
  import { REFERENCES, USER } from '~/store/types';
  import { replaceCurly } from '~/helpers/system';

  import GeolocationIcon from '~/assets/svg/geolocation-icon.svg';
  import PowerIcon from '~/assets/svg/power-icon.svg';
  import CalendarIcon from '~/assets/svg/calendar-icon.svg';
  import TemperatureIcon from '~/assets/svg/temperature-icon.svg';
  import TimeIcon from '~/assets/svg/time-icon.svg';
  import VoltageIcon from '~/assets/svg/voltage-icon.svg';

  const GOOGLE_MAPS_LINK = 'http://www.google.com/maps/place/{positionN},{positionW}';

  export default {
    name: 'UserDevice',
    components: {
      GeolocationIcon,
      PowerIcon,
      CalendarIcon,
      TemperatureIcon,
      TimeIcon,
      VoltageIcon,
    },
    computed: {
      ...mapGetters('references', {
        currentLanguage: REFERENCES.GET_LANGUAGE_ID,
        i18n: REFERENCES.GET_I18N,
      }),
      ...mapGetters('user', {
        sensorData: USER.GET_SENSOR_DATA,
        deviceData: USER.GET_DEVICE_DATA,
      }),
      formattedTime() {
        const { deviceData, currentLanguage } = this;
        const deviceTime = deviceData.time || '00:00:00';
        const inputFormat = 'hh:mm:ss';
        const luxonDate = DateTime.fromFormat(deviceTime, inputFormat);
        return luxonDate.setLocale(currentLanguage).toFormat('tt');
      },
      formattedDate() {
        // TODO: TEST DATE FORMAT
        const { deviceData, currentLanguage } = this;
        const deviceDate = deviceData.date || '0000-000-00';
        const inputFormat = 'yyyy-LL-dd';
        const luxonDate = DateTime.fromFormat(deviceDate, inputFormat);
        return luxonDate.setLocale(currentLanguage).toFormat('DDDD');
      },
      temperatureIsOrange() {
        const { deviceData } = this;
        return parseInt(deviceData.temperature1) <= 40 || parseInt(deviceData.temperature2) <= 40;
      },
      temperatureIsRed() {
        const { deviceData } = this;
        return parseInt(deviceData.temperature1) <= 20 || parseInt(deviceData.temperature2) <= 20;
      },
      powerIsOrange() {
        const { deviceData } = this;
        return parseInt(deviceData.power1) <= 40 || parseInt(deviceData.power2) <= 40;
      },
      powerIsRed() {
        const { deviceData } = this;
        return parseInt(deviceData.power1) <= 20 || parseInt(deviceData.power2) <= 20;
      },
      voltageIsOrange() {
        const { deviceData } = this;
        return parseInt(deviceData.voltage1) <= 40 || parseInt(deviceData.voltage1) <= 40;
      },
      voltageIsRed() {
        const { deviceData } = this;
        return parseInt(deviceData.voltage1) <= 20 || parseInt(deviceData.voltage1) <= 20;
      },
      googleMapsLink() {
        const { deviceData } = this;
        const positionN = deviceData.positionN;
        const positionW = deviceData.positionW;
        return replaceCurly(GOOGLE_MAPS_LINK, ['positionN', 'positionW'], [positionN, positionW]);
      },
    },
  };
</script>

<style lang="scss" scoped>
  .user-device-info {
    min-height: 100vh;
  }
  .layout-devise-info__title {
    font-weight: 600;
    font-size: 36px;
    line-height: 44px;
    color: $color-gray-01;
  }
  .layout-devise-info__status-item svg {
    display: inline-block;
    width: 100%;
    max-width: 18px;
    max-height: 18px;
    margin-right: 10px;
    color: $color-gray-01;
  }
  .layout-devise-info__status-item_orange svg {
    color: $color-orange-01;
  }
  .layout-devise-info__status-item_red svg {
    color: $color-red-02;
  }
  .layout-devise-info__status-item span {
    display: inline-block;
    font-weight: 300;
    font-size: 16px;
    line-height: 24px;
    color: $color-gray-01;
    text-transform: capitalize;
  }
  .layout-devise-info__status-item span a {
    color: $color-gray-01;
  }
  .layout-devise-info__status-item span a:hover {
    text-decoration: underline;
  }
  .layout-devise-info__sensor-status-item {
    display: block;
    width: 100%;
    padding: 15px;
    background: rgba($color-gray-06, 0.6);
    border-radius: 5px;
  }
  .layout-devise-info__sensor-status-item:not(:last-child) {
    margin-bottom: 20px;
  }
  .layout-devise-info__sensor-status-item span:first-child {
    display: block;
    font-weight: 500;
    font-size: 16px;
    line-height: 20px;
    margin-bottom: 10px;
    color: $color-gray-01;
    text-transform: uppercase;
  }
  .layout-devise-info__sensor-status-item span:last-child {
    display: block;
    font-weight: 300;
    font-size: 12px;
    line-height: 15px;
    color: $color-green-01;
    text-transform: uppercase;
    text-align: right;
    transition: color $animation-time-01 $animation-easing;
  }
  .layout-devise-info__sensor-status-item_red span:last-child {
    color: $color-red-02;
  }
  @media (min-width: $screen-lg) {
    .user-device-info__image {
      position: relative;
      display: block;
      width: 400px;
      margin-left: auto;
    }
    .user-device-info__image img {
      display: block;
      width: 100%;
      margin: 0;
    }
    .layout-devise-info__sensor-status-item {
      position: absolute;
      width: 210px;
      left: 0;
    }
    .layout-devise-info__sensor-status-item:not(:last-child) {
      margin-bottom: 0;
    }
    .layout-devise-info__sensor-status-item:nth-child(1) {
      top: 0;
    }
    .layout-devise-info__sensor-status-item:nth-child(2) {
      top: 110px;
    }
    .layout-devise-info__sensor-status-item:nth-child(3) {
      top: 220px;
    }
    .layout-devise-info__sensor-status-item:nth-child(4) {
      top: 330px;
    }
    .layout-devise-info__sensor-status-item:nth-child(5) {
      top: 480px;
    }
    .layout-devise-info__sensor-status-item:nth-child(6) {
      top: 640px;
    }
  }
</style>
