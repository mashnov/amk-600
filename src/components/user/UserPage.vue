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
        <UserChart
          :chart-data="chartDataSets"
        />
      </div>
      <div class="col-12 mb-5">
        <UserChartPeriodSelect
          :value="chartPeriod"
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
  import { REFERENCES, PRELOADER, REPORTS, AUTH } from '~/store/types';
  import { chartDataTransformer } from '~/helpers/transformers';

  import UserMomentData from './UserMomentData';
  import UserChartLegend from './UserChartLegend';
  import UserChart from './UserChart';
  import UserChartPeriodSelect from './UserChartPeriodSelect';
  import UserStatData from './UserStatData';
  import { AUTH as AUTH_ROUTE_NAMES } from '~/router/names';

  const PRELOADER_KEY = 'fetchChartData';

  export default {
    name: 'UserPage',
    components: {
      UserMomentData,
      UserChartLegend,
      UserChart,
      UserChartPeriodSelect,
      UserStatData,
    },
    computed: {
      ...mapGetters('references', {
        currentLanguage: REFERENCES.GET_LANGUAGE_ID,
        i18n: REFERENCES.GET_I18N,
      }),
      ...mapGetters('reports', {
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
      ...mapActions('preloader', {
        showPreloader: PRELOADER.SHOW_PRELOADER,
        hidePreloader: PRELOADER.HIDE_PRELOADER,
      }),
      ...mapActions('auth', {
        logoutHandler: AUTH.LOGOUT_HANDLER,
      }),
      async setReportPeriod(period) {
        this.showPreloader(PRELOADER_KEY);
        this.setReportRange(period);
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

<style lang="scss" scoped>
  .user-page {
    padding: 20px 10px;
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
