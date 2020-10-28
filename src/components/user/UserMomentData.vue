<template>
  <div class="user-moment-data">
    <div class="row">
      <div class="col-12 col-lg-6">
        <div class="row mb-lg-4">
          <div class="col-12 col-sm-6 mb-4 mb-lg-0">
            <UserMomentSensor
              :title="i18n.temperatureTitle"
              :unit="i18n.celsiusUnit"
              :value="momentData.temperature"
              :is-active="reportTypes.includes('temperature')"
              :disabled="fetchIsLock"
              @select-item="selectReportItem('temperature')"
            />
          </div>
          <div class="col-12 col-sm-6 mb-4 mb-lg-0">
            <UserMomentSensor
              :title="i18n.humidityTitle"
              :unit="i18n.percentUnit"
              :value="momentData.humidity"
              :is-active="reportTypes.includes('humidity')"
              :disabled="fetchIsLock"
              @select-item="selectReportItem('humidity')"
            />
          </div>
        </div>
        <div class="row">
          <div class="col-12 col-sm-6 mb-4 mb-lg-0">
            <UserMomentSensor
              :title="i18n.pressureTitle"
              :unit="i18n.pascalUnit"
              :value="momentData.pressure"
              :is-active="reportTypes.includes('pressure')"
              :disabled="fetchIsLock"
              @select-item="selectReportItem('pressure')"
            />
          </div>
          <div class="col-12 col-sm-6 mb-4 mb-lg-0">
            <UserMomentSensor
              :title="i18n.rainTitle"
              :unit="i18n.rainUnit"
              :value="momentData.rainfall"
              :is-active="reportTypes.includes('rain')"
              :disabled="fetchIsLock"
              @select-item="selectReportItem('rain')"
            />
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
  import { REFERENCES, PRELOADER, USER, REPORTS, AUTH } from '~/store/types';
  import { AUTH as AUTH_ROUTE_NAMES } from '~/router/names';

  import UserMomentSensor from './UserMomentSensor';
  import UserMomentWind from './UserMomentWind';

  const PRELOADER_KEY = 'userFetchChartData';

  export default {
    name: 'UserMomentData',
    components: {
      UserMomentSensor,
      UserMomentWind,
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
      ...mapActions('preloader', {
        showPreloader: PRELOADER.SHOW_PRELOADER,
        hidePreloader: PRELOADER.HIDE_PRELOADER,
      }),
      ...mapActions('auth', {
        logoutHandler: AUTH.LOGOUT_HANDLER,
      }),
      async selectReportItem(reportType) {
        this.showPreloader(PRELOADER_KEY);
        this.setReportTypes(reportType);
        const { successes } = await this.fetchChartData();
        this.hidePreloader(PRELOADER_KEY);
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
