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
          <AmkSelect
            :value="chartPeriod"
            :options="chartPeriodOptions"
            @input="chartPeriod = $event"
          />
        </div>
      </div>
      <div class="row">
        <div class="col-12">
          <UserChartItem
            :chart-data="chartDataSets"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex';
  import { REPORTS, REFERENCES } from '~/store/types';
  import { chartDataTransformer } from '~/helpers/transformers';

  import UserChartItem from './UserChartItem';
  import UserChartLegend from './UserChartLegend';
  import AmkSelect from '~/components/form-items/amk-select/AmkSelect'

  const CHART_PERIOD_TYPES = ['week', 'month', 'year'];

  export default {
    name: 'UserChart',
    components: {
      UserChartItem,
      UserChartLegend,
      AmkSelect,
    },
    data: () => ({
      chartPeriod: CHART_PERIOD_TYPES[0],
      chartPeriodTypes: CHART_PERIOD_TYPES,
    }),
    computed: {
      ...mapGetters('reports', {
        reportTypes: REPORTS.GET_REPORT_TYPES,
        chartData: REPORTS.GET_CHART_DATA,
      }),
      ...mapGetters('references', {
        i18n: REFERENCES.GET_I18N,
      }),
      chartPeriodOptions() {
        const { chartPeriodTypes } = this;
        return chartPeriodTypes;
      },
      chartDataSets() {
        const { reportTypes, chartData, chartPeriod, i18n } = this;
        return chartDataTransformer({ reportTypes, chartData, chartPeriod, i18n });
      },
    },
  };
</script>
