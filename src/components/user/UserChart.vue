<template>
  <div class="row">
    <div class="col-12">
      <div class="row mb-5">
        <div class="col-12">
          <UserChartLegend
            :list="reportTypes"
          />
        </div>
      </div>
      <div class="row mb-5">
        <div class="col-12">
          <UserChartItem
            :chart-data="chartDataSets"
          />
        </div>
      </div>
      <div class="row">
        <div class="col-12">
          <UserChartPeriodSelect
            :value="chartPeriod"
            @select-period="setReportPeriod"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import { mapGetters, mapActions } from 'vuex';
  import { REFERENCES, PRELOADER, REPORTS, AUTH } from '~/store/types';
  import { AUTH as AUTH_ROUTE_NAMES } from '~/router/names';
  import { chartDataTransformer } from '~/helpers/transformers';

  import UserChartItem from './UserChartItem';
  import UserChartLegend from './UserChartLegend';
  import UserChartPeriodSelect from './UserChartPeriodSelect';

  const PRELOADER_KEY = 'userPeriodFetchChartData';

  export default {
    name: 'UserChart',
    components: {
      UserChartItem,
      UserChartLegend,
      UserChartPeriodSelect,
    },
    computed: {
      ...mapGetters('reports', {
        chartPeriod: REPORTS.GET_REPORT_RANGE,
        reportTypes: REPORTS.GET_REPORT_TYPES,
        chartData: REPORTS.GET_CHART_DATA,
      }),
      ...mapGetters('references', {
        i18n: REFERENCES.GET_I18N,
      }),
      chartDataSets() {
        const { reportTypes, chartData, chartPeriod, i18n } = this;
        return chartDataTransformer({ reportTypes, chartData, chartPeriod, i18n });
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
        this.setReportRange(period)
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
