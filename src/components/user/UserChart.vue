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
  import { REFERENCES, PRELOADER, REPORTS } from '~/store/types';
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
      async setReportPeriod(period) {
        this.showPreloader(PRELOADER_KEY);
        this.setReportRange(period)
        await this.fetchChartData();
        this.hidePreloader(PRELOADER_KEY);
      }
    },
  };
</script>
