<template>
  <div class="user-status">
    <div class="row mb-5">
      <div class="col-12">
        <div class="row mb-5">
          <div class="col-12">
            <div class="user-status__title">
              {{ deviceData.name }}
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-12 mb-4">
            <div class="user-status__item">
              <GeolocationIcon />
              <span>
                <a
                  :href="googleMapsLink"
                  target="_blank"
                >
                {{deviceData.positionN}}N {{deviceData.positionW}}W
              </a>
              </span>
            </div>
          </div>
          <div class="col-12 mb-4">
            <div class="user-status__item">
              <TimeIcon />
              <span>
                {{ formattedTime }}
              </span>
            </div>
          </div>
          <div class="col-12 mb-4">
            <div class="user-status__item">
              <CalendarIcon />
              <span>
                {{ formattedDate }}
              </span>
            </div>
          </div>
          <div class="col-12 mb-4">
            <div
              class="user-status__item"
              :class="[
                temperatureIsOrange && 'user-status__item_orange',
                temperatureIsRed && 'user-status__item_red',
              ]"
            >
              <TemperatureIcon />
              <span>
                {{ i18n.deviceStatus_temperatureTitle }}: {{deviceData.temperature1}}{{i18n.deviceStatus_temperatureUnit}} | {{deviceData.temperature2}}{{i18n.deviceStatus_temperatureUnit}}
              </span>
            </div>
          </div>
          <div class="col-12 mb-4">
            <div
              class="user-status__item"
              :class="[
                powerIsOrange && 'user-status__item_orange',
                powerIsRed && 'user-status__item_red',
              ]"
            >
              <PowerIcon />
              <span>
                {{ i18n.deviceStatus_powerTitle }}: {{deviceData.power1}} {{i18n.deviceStatus_powerUnit}} | {{deviceData.power2}} {{i18n.deviceStatus_powerUnit}}
              </span>
            </div>
          </div>
          <div class="col-12 mb-4">
            <div
              class="user-status__item"
              :class="[
                voltageIsOrange && 'user-status__item_orange',
                voltageIsRed && 'user-status__item_red',
              ]"
            >
              <VoltageIcon />
              <span>
                {{ i18n.deviceStatus_voltageTitle }}: {{deviceData.voltage1}}{{i18n.deviceStatus_voltageUnit}} | {{deviceData.voltage2}}{{i18n.deviceStatus_voltageUnit}}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-12">
        <UserDevice />
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
  import UserDevice from './UserDevice';

  const GOOGLE_MAPS_LINK = 'http://www.google.com/maps/place/{positionN},{positionW}';

  export default {
    name: 'UserStatData',
    components: {
      GeolocationIcon,
      PowerIcon,
      CalendarIcon,
      TemperatureIcon,
      TimeIcon,
      VoltageIcon,
      UserDevice,
    },
    computed: {
      ...mapGetters('references', {
        currentLanguage: REFERENCES.GET_LANGUAGE_ID,
        i18n: REFERENCES.GET_I18N,
      }),
      ...mapGetters('user', {
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
  .user-status {
    position: sticky;
    top: 50px;
    bottom: 50px;
    padding: 0 50px;
  }
  .user-status__title {
    font-weight: 600;
    font-size: 36px;
    line-height: 44px;
    color: $color-gray-01;
  }
  .user-status__item {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
  }
  .user-status__item svg {
    display: block;
    width: 100%;
    max-width: 18px;
    max-height: 18px;
    margin-right: 10px;
    color: $color-gray-01;
  }
  .user-status__item_orange svg {
    color: $color-orange-01;
  }
  .user-status__item_red svg {
    color: $color-red-02;
  }
  .user-status__item span {
    display: block;
    font-weight: 300;
    font-size: 16px;
    line-height: 24px;
    color: $color-gray-01;
    text-transform: capitalize;
  }
  .user-status__item_orange span {
    color: $color-orange-01;
  }
  .user-status__item_red span {
    color: $color-red-02;
  }
  .user-status__item span a {
    color: $color-gray-01;
    text-decoration: underline;
  }
</style>
