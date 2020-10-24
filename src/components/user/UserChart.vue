<template>
  <div class="user-chart">
    <div class="user-chart__legend">
      <UserChartLegend
        :list="reportTypes"
      />
    </div>
    <transition
      appear
      name="fade-in"
    >
      <UserChartItem
        v-if="reportTypes.length"
        :chart-data="chartDataSets"
      />
    </transition>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex';
  import { REPORTS, REFERENCES } from '~/store/types';
  import { chartDataTransformer } from '~/helpers/transformers';

  import UserChartItem from './UserChartItem';
  import UserChartLegend from './UserChartLegend';

  export default {
    name: 'UserChart',
    components: {
      UserChartItem,
      UserChartLegend,
    },
    data: () => ({
      chartPeriod: 'week',
    }),
    computed: {
      ...mapGetters('reports', {
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
  };
</script>

<style lang="scss" scoped>
  .user-chart__legend {
    margin-bottom: 50px;
  }
</style>
