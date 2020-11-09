<template>
  <div class="user-moment-data">
    <div class="row">
      <div class="col-12 col-lg-6">
        <div class="row mb-lg-4">
          <div class="col-12 col-sm-6 mb-4 mb-lg-0">
            <UserMomentSensor
              v-tooltip.bottom="{ content: i18n.addTemperatureToChart, offset: 15 }"
              :title="i18n.temperatureTitle"
              :unit="i18n.celsiusUnit"
              :value="momentData.temperature"
              :is-active="reportTypes.includes('temperature')"
              :disabled="fetchIsLock"
              @select-item="selectReportItem('temperature')"
            >
              <template slot="icon">
                <TemperatureIcon />
              </template>
            </UserMomentSensor>
          </div>
          <div class="col-12 col-sm-6 mb-4 mb-lg-0">
            <UserMomentSensor
              v-tooltip.bottom="{ content: i18n.addHumidityToChart, offset: 15 }"
              :title="i18n.humidityTitle"
              :unit="i18n.percentUnit"
              :value="momentData.humidity"
              :is-active="reportTypes.includes('humidity')"
              :disabled="fetchIsLock"
              @select-item="selectReportItem('humidity')"
            >
              <template slot="icon">
                <HumidityIcon />
              </template>
            </UserMomentSensor>
          </div>
        </div>
        <div class="row">
          <div class="col-12 col-sm-6 mb-4 mb-lg-0">
            <UserMomentSensor
              v-tooltip.bottom="{ content: i18n.addPressureToChart, offset: 15 }"
              :title="i18n.pressureTitle"
              :unit="i18n.pascalUnit"
              :value="momentData.pressure"
              :is-active="reportTypes.includes('pressure')"
              :disabled="fetchIsLock"
              @select-item="selectReportItem('pressure')"
            >
              <template slot="icon">
                <PressureIcon />
              </template>
            </UserMomentSensor>
          </div>
          <div class="col-12 col-sm-6 mb-4 mb-lg-0">
            <UserMomentSensor
              v-tooltip.bottom="{ content: i18n.addRainToChart, offset: 15 }"
              :title="i18n.rainTitle"
              :unit="i18n.rainUnit"
              :value="momentData.rainfall"
              :is-active="reportTypes.includes('rain')"
              :disabled="fetchIsLock"
              @select-item="selectReportItem('rain')"
            >
              <template slot="icon">
                <RainIcon />
              </template>
            </UserMomentSensor>
          </div>
        </div>
      </div>
      <div class="col-12 col-lg-6 d-lg-flex">
        <UserMomentWind />
      </div>
    </div>
  </div>
</template>

<script>
  import { mapGetters, mapActions } from 'vuex';
  import { REFERENCES, USER, REPORTS, AUTH } from '~/store/types';
  import { AUTH as AUTH_ROUTE_NAMES } from '~/router/names';

  import UserMomentSensor from './UserMomentSensor';
  import UserMomentWind from './UserMomentWind';

  import TemperatureIcon from '~/assets/svg/temperature-icon.svg';
  import HumidityIcon from '~/assets/svg/humidity-icon.svg';
  import PressureIcon from '~/assets/svg/pressure-icon.svg';
  import RainIcon from '~/assets/svg/rain-icon.svg';

  export default {
    name: 'UserMomentData',
    components: {
      UserMomentSensor,
      UserMomentWind,
      TemperatureIcon,
      HumidityIcon,
      PressureIcon,
      RainIcon,
    },
    computed: {
      ...mapGetters('references', {
        i18n: REFERENCES.GET_I18N,
      }),
      ...mapGetters('user', {
        momentData: USER.GET_MOMENT_DATA,
      }),
      ...mapGetters('reports', {
        fetchIsLock: REPORTS.GET_FETCH_IS_LOCK,
        reportTypes: REPORTS.GET_REPORT_TYPES,
      }),
    },
    methods: {
      ...mapActions('reports', {
        setReportTypes: REPORTS.SET_REPORT_TYPES,
        fetchChartData: REPORTS.FETCH_CHART_DATA,
      }),
      ...mapActions('auth', {
        logoutHandler: AUTH.LOGOUT_HANDLER,
      }),
      async selectReportItem(reportType) {
        this.setReportTypes(reportType);
        const { successes } = await this.fetchChartData();
        if (!successes) {
          this.logoutAction();
        }
      },
      async logoutAction() {
        await this.logoutHandler();
        this.$router.push({ name: AUTH_ROUTE_NAMES.auth });
      },
    },
  };
</script>
