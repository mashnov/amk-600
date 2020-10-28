<template>
  <div class="row user-page">
    <div class="col-12 mb-5">
      <UserMomentData />
    </div>
    <template v-if="reportTypes.length">
      <div class="col-12 mb-5">
        <UserChartLegend
          :list="reportTypes"
        />
      </div>
      <div class="col-12 mb-5">
        <div class="user-page__chart">
          <transition
            appear
            name="fade-in"
          >
            <div
              v-if="fetchIsLock"
              class="user-page__chart-loader"
            >
              <PreloaderIcon />
            </div>
          </transition>
          <UserChart
            :chart-data="chartDataSets"
          />
        </div>
      </div>
      <div class="col-12 mb-5">
        <UserChartPeriodSelect
          :value="chartPeriod"
          :disabled="fetchIsLock"
          @select-period="setReportPeriod"
        />
      </div>
    </template>
    <div class="col-12">
      <UserStatData />
    </div>
  </div>
</template>

<script>
  import { mapGetters, mapActions } from 'vuex';
  import { REFERENCES, REPORTS, AUTH } from '~/store/types';
  import { AUTH as AUTH_ROUTE_NAMES } from '~/router/names';
  import { chartDataTransformer } from '~/helpers/transformers';

  import UserMomentData from './UserMomentData';
  import UserChartLegend from './UserChartLegend';
  import UserChart from './UserChart';
  import UserChartPeriodSelect from './UserChartPeriodSelect';
  import UserStatData from './UserStatData';
  import PreloaderIcon from '~/assets/svg/preloader-icon.svg';

  //TODO ПЕРЕДЕЛАТЬ ЛЭЙАУТ
  //TODO ПЕРЕНЕСТИ ЛОАДЕР НА ГРАФФИК

  export default {
    name: 'UserPage',
    components: {
      UserMomentData,
      UserChartLegend,
      UserChart,
      UserChartPeriodSelect,
      UserStatData,
      PreloaderIcon,
    },
    computed: {
      ...mapGetters('references', {
        currentLanguage: REFERENCES.GET_LANGUAGE_ID,
        i18n: REFERENCES.GET_I18N,
      }),
      ...mapGetters('reports', {
        fetchIsLock: REPORTS.GET_FETCH_IS_LOCK,
        reportTypes: REPORTS.GET_REPORT_TYPES,
        chartData: REPORTS.GET_CHART_DATA,
        chartPeriod: REPORTS.GET_REPORT_RANGE,
      }),
      chartDataSets() {
        const { reportTypes, chartData, chartPeriod, i18n, currentLanguage } = this;
        return chartDataTransformer({ reportTypes, chartData, chartPeriod, i18n, currentLanguage });
      },
    },
    methods: {
      ...mapActions('reports', {
        setReportRange: REPORTS.SET_REPORT_RANGE,
        fetchChartData: REPORTS.FETCH_CHART_DATA,
      }),
      ...mapActions('auth', {
        logoutHandler: AUTH.LOGOUT_HANDLER,
      }),
      async setReportPeriod(period) {
        this.setReportRange(period);
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

<style lang="scss" scoped>
  .user-page {
    padding: 20px 10px;
  }
  .user-page__chart {
    position: relative;
  }
  .user-page__chart-loader {
    position: absolute;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
  }
  .user-page__chart-loader svg {
    display: block;
    width: 80px;
    margin: 0 auto;
    color: $color-gray-01;
    will-change: transform;
    animation: preloader 3s linear infinite;
  }
  @media (min-width: $screen-lg) {
    .user-page {
      padding: 50px;
    }
    .user-page__device {
      position: sticky;
      top: 50px;
      bottom: 50px;
      padding: 0 50px;
    }
  }
</style>
