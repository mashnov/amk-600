<template>
  <div
    class="layout-devise-info"
    :class="[
      !inline && 'col-11 col-sm-9 col-lg-8 col-xl-6',
      inline && 'col-12',
    ]"
  >
    <div
      v-if="deviceDataIsReady"
      class="row"
    >
      <div
        class="col-12"
        :class="[
          !inline && 'col-sm-10 offset-sm-1',
        ]"
      >
        <div class="row mb-5">
          <div class="col-12 mb-5">
            <div class="layout-devise-info__header">
              <div class="layout-devise-info__title">
                {{ deviceData.name }}
              </div>
              <a
                class="layout-devise-info__logo"
                :href="i18n.adventPageLink"
                target="_blank"
              >
                <AdventLogo />
                <span>
                  {{ i18n.adventLogoTitle }}
                </span>
              </a>
            </div>
          </div>
          <div class="col-12 col-md-6 mb-4">
            <div class="layout-devise-info__status-item">
              <GeolocationIcon />
              <span>
                <a
                  :href="googleMapsLink"
                  target="_blank"
                >
                  {{ deviceData.positionN }} | {{ deviceData.positionW }}
                </a>
              </span>
            </div>
          </div>
          <div class="col-12 col-md-6 mb-4">
            <div class="layout-devise-info__status-item">
              <TimeIcon />
              <span>
                {{ formattedTime }} GMT+0
              </span>
            </div>
          </div>
          <div class="col-12 col-md-6 mb-4">
            <div class="layout-devise-info__status-item">
              <CalendarIcon />
              <span>
                {{ formattedDate }}
              </span>
            </div>
          </div>
          <div class="col-12 col-md-6 mb-4">
            <div
              class="layout-devise-info__status-item layout-devise-info__status-item_no-text-transform"
              :class="[
                temperatureIsOrange && 'layout-devise-info__status-item_orange',
                temperatureIsRed && 'layout-devise-info__status-item_red',
              ]"
            >
              <TemperatureIcon />
              <span>
                {{ i18n.temperatureShortTitle }}: {{ deviceData.temperature1 }} | {{ deviceData.temperature2 }} {{ i18n.celsiusUnit }}
              </span>
            </div>
          </div>
          <div class="col-12 col-md-6 mb-4">
            <div
              class="layout-devise-info__status-item"
              :class="[
                powerIsOrange && 'layout-devise-info__status-item_orange',
                powerIsRed && 'layout-devise-info__status-item_red',
              ]"
            >
              <PowerIcon />
              <span>
                {{ i18n.powerTitle }}: {{ deviceData.power1 }} | {{ deviceData.power2 }} {{ i18n.percentUnit }}
              </span>
            </div>
          </div>
          <div class="col-12 col-md-6 mb-4">
            <div
              class="layout-devise-info__status-item"
              :class="[
                voltageIsOrange && 'layout-devise-info__status-item_orange',
                voltageIsRed && 'layout-devise-info__status-item_red',
              ]"
            >
              <VoltageIcon />
              <span>
                {{ i18n.voltageTitle }}: {{ deviceData.voltage1 }} | {{ deviceData.voltage2 }} {{ i18n.voltUnit }}
              </span>
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-12 position-relative">
            <div class="d-none d-md-block user-device-info__image">
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
                  v-html="i18n.wind"
                />
                <span>
                  {{ sensorData.windIsOnLine ? i18n.connected : i18n.disconnected }}
                </span>
              </div>
              <div
                class="layout-devise-info__sensor-status-item"
                :class="!sensorData.rainIsOnLine && 'layout-devise-info__sensor-status-item_red'"
              >
                <span
                  v-html="i18n.rain"
                />
                <span>
                  {{ sensorData.rainIsOnLine ? i18n.connected : i18n.disconnected }}
                </span>
              </div>
              <div
                class="layout-devise-info__sensor-status-item"
                :class="!sensorData.weatherIsOnLine && 'layout-devise-info__sensor-status-item_red'"
              >
                <span
                  v-html="i18n.weatherSensors"
                />
                <span>
                  {{ sensorData.weatherIsOnLine ? i18n.connected : i18n.disconnected }}
                </span>
              </div>
              <div
                class="layout-devise-info__sensor-status-item"
                :class="!sensorData.gpsIsOnLine && 'layout-devise-info__sensor-status-item_red'"
              >
                <span
                  v-html="i18n.gps"
                />
                <span>
                  {{ sensorData.gpsIsOnLine ? i18n.connected : i18n.disconnected }}
                </span>
              </div>
              <div
                class="layout-devise-info__sensor-status-item"
                :class="!sensorData.compassIsOnLine && 'layout-devise-info__sensor-status-item_red'"
              >
                <span
                  v-html="i18n.compass"
                />
                <span>
                  {{ sensorData.compassIsOnLine ? i18n.connected : i18n.disconnected }}
                </span>
              </div>
              <div
                class="layout-devise-info__sensor-status-item"
                :class="!sensorData.battery1IsOnLine || !sensorData.battery2IsOnLine && 'layout-devise-info__sensor-status-item_red'"
              >
                <ChargeIcon
                  class="layout-devise-info__sensor-status-item-icon layout-devise-info__sensor-status-item-icon_first"
                  :class="deviceData.battery1Charging && 'layout-devise-info__sensor-status-item-icon_orange'"
                />
                <ChargeIcon
                  class="layout-devise-info__sensor-status-item-icon"
                  :class="deviceData.battery2Charging && 'layout-devise-info__sensor-status-item-icon_orange'"
                />
                <div>
                  <span
                    v-html="i18n.powerSupply"
                  />
                  <span>
                    {{ sensorData.battery1IsOnLine && sensorData.battery2IsOnLine ? i18n.connected : i18n.disconnected }}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import isEmpty from 'lodash/isEmpty';
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
  import ChargeIcon from '~/assets/svg/charge-icon.svg';
  import AdventLogo from '~/assets/svg/adwent-logo.svg';

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
      ChargeIcon,
      AdventLogo,
    },
    props: {
      inline: {
        type: Boolean,
        default: false,
      },
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
      deviceDataIsReady() {
        const { deviceData, sensorData } = this;
        return !isEmpty(deviceData) && !isEmpty(sensorData);
      },
      formattedTime() {
        const { deviceData, currentLanguage } = this;
        const deviceTime = deviceData.time || '00:00:00';
        const inputFormat = 'hh:mm:ss';
        const luxonDate = DateTime.fromFormat(deviceTime, inputFormat);
        return luxonDate.setLocale(currentLanguage).toFormat('t');
      },
      formattedDate() {
        const { deviceData, currentLanguage } = this;
        const deviceDate = deviceData.date || '0000:000:00';
        const inputFormat = 'yyyy:LL:dd';
        const luxonDate = DateTime.fromFormat(deviceDate, inputFormat);
        const localDate = luxonDate.setLocale(currentLanguage);
        const isRussian = currentLanguage === 'ru';
        const dateString = `${localDate.toFormat('ccc')}, ${localDate.toFormat('DD')}`;
        return !isRussian ? dateString : dateString.slice(0, -2);
      },
      temperatureIsOrange() {
        const { deviceData } = this;
        return parseInt(deviceData.realTemperature1) >= 55 || parseInt(deviceData.realTemperature1) >= 55;
      },
      temperatureIsRed() {
        const { deviceData } = this;
        return parseInt(deviceData.realTemperature2) >= 65 || parseInt(deviceData.realTemperature2) >= 65;
      },
      powerIsOrange() {
        const { deviceData } = this;
        return parseInt(deviceData.realPower1) <= 40 || parseInt(deviceData.realPower2) <= 40;
      },
      powerIsRed() {
        const { deviceData } = this;
        return parseInt(deviceData.realPower1) <= 20 || parseInt(deviceData.realPower2) <= 20;
      },
      voltageIsOrange() {
        const { deviceData } = this;
        return parseInt(deviceData.realVoltage1) <= 21 || parseInt(deviceData.realVoltage2) <= 21;
      },
      voltageIsRed() {
        const { deviceData } = this;
        return parseInt(deviceData.realVoltage1) <= 20 || parseInt(deviceData.realVoltage2) <= 20;
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
  .layout-devise-info {
    min-height: 100vh;
  }
  .layout-devise-info__header {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
  }
  .layout-devise-info__title {
    display: block;
    width: calc(100% - 100px);
    font-weight: 600;
    font-size: 36px;
    line-height: 44px;
    color: $color-gray-01;
  }
  .layout-devise-info__logo {
    display: block;
    width: 100px;
  }
  .layout-devise-info__logo svg {
    display: block;
    width: 100%;
    margin: auto;
    color: $color-gray-01;
  }
  .layout-devise-info__logo:hover svg {
    animation: rotate3d $animation-time-05 $animation-easing infinite;
  }
  .layout-devise-info__logo:active svg {
    animation: rotate3d $animation-time-04 $animation-easing infinite;
  }
  .layout-devise-info__logo span {
    display: block;
    text-align: center;
    margin-top: 5px;
    font-size: 15px;
    line-height: 20px;
    color: $color-gray-01;
    text-transform: uppercase;
  }
  .layout-devise-info__status-item svg {
    display: inline-block;
    vertical-align: middle;
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
    vertical-align: middle;
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
  .layout-devise-info__status-item_no-text-transform span {
    text-transform: none;
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
    font-size: 15px;
    line-height: 18px;
    margin-bottom: 10px;
    color: $color-gray-01;
    text-transform: uppercase;
  }
  .layout-devise-info__sensor-status-item span:last-child {
    display: block;
    font-weight: 300;
    font-size: 13px;
    line-height: 15px;
    color: $color-gray-01;
    text-transform: uppercase;
    text-align: right;
    transition: color $animation-time-01 $animation-easing;
  }
  .layout-devise-info__sensor-status-item_red span:last-child {
    color: $color-red-02;
  }
  .layout-devise-info__sensor-status-item-icon {
    position: absolute;
    width: 20px;
    height: 20px;
    bottom: 10px;
    right: 5px;
    color: $color-gray-05;
    transition: color $animation-time-01 $animation-easing;
  }
  .layout-devise-info__sensor-status-item-icon_first {
    right: 20px;
  }
  .layout-devise-info__sensor-status-item-icon_orange {
    color: $color-orange-01;
  }
  @media (min-width: $screen-sm) {
    .layout-devise-info__sensor-status-item {
      display: inline-block;
      vertical-align: top;
      width: calc(50% - 10px);
    }
    .layout-devise-info__sensor-status-item:nth-child(2n-1) {
      margin-right: 20px;
    }
  }
  @media (min-width: $screen-md) {
    .user-device-info__image {
      position: relative;
      display: block;
      width: 350px;
      margin-left: auto;
      margin-right: auto;
    }
    .user-device-info__image img {
      display: block;
      width: 100%;
      margin: 0;
    }
    .layout-devise-info__sensor-status-wrapper {
      position: absolute;
      height: 100%;
      width: 550px;
      left: 50%;
      top: 0;
      transform: translateX(-50%);
    }
    .layout-devise-info__sensor-status-item {
      position: absolute;
      width: 150px;
    }
    .layout-devise-info__sensor-status-item:nth-child(2n-1) {
      margin-right: 0;
    }
    .layout-devise-info__sensor-status-item:not(:last-child) {
      margin-bottom: 0;
    }
    .layout-devise-info__sensor-status-item:nth-child(1) {
      top: 40px;
      left: 30px;
    }
    .layout-devise-info__sensor-status-item:nth-child(2) {
      top: 110px;
      right: 10px;
    }
    .layout-devise-info__sensor-status-item:nth-child(3) {
      top: 190px;
      right: 10px;
    }
    .layout-devise-info__sensor-status-item:nth-child(4) {
      top: 225px;
      left: 100px;
    }
    .layout-devise-info__sensor-status-item:nth-child(5) {
      top: 300px;
      left: 100px;
    }
    .layout-devise-info__sensor-status-item:nth-child(6) {
      top: 530px;
      right: 20px;
    }
    .layout-devise-info__sensor-status-item span:first-child {
      font-size: 11px;
      line-height: 13px;
    }
    .layout-devise-info__sensor-status-item span:last-child {
      font-size: 10px;
      line-height: 10px;
      text-transform: lowercase;
      text-align: left;
    }
  }
</style>
