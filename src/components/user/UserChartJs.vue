<template>
  <div class="user-chart-js">
    <canvas ref="chart" />
  </div>
</template>

<script>
  import get from 'lodash/get';
  import cloneDeep from 'lodash/cloneDeep';
  import Chart from 'chart.js';
  import { DateTime } from 'luxon';
  import { mapGetters } from 'vuex';
  import { REFERENCES, REPORTS } from '~/store/types';
  import { chartDataTransformer } from '~/helpers/transformers';

  const TEMPERATURE_BASE_COLOR = process.env.VUE_APP_CHART_STYLE_TEMPERATURE_COLOR;
  const HUMIDITY_BASE_COLOR = process.env.VUE_APP_CHART_STYLE_HUMIDITY_COLOR;
  const PRESSURE_BASE_COLOR = process.env.VUE_APP_CHART_STYLE_PRESSURE_COLOR;
  const RAIN_BASE_COLOR = process.env.VUE_APP_CHART_STYLE_RAIN_COLOR;
  const WIND_W_BASE_COLOR = process.env.VUE_APP_CHART_STYLE_WIND_V_COLOR;
  const WIND_H_BASE_COLOR = process.env.VUE_APP_CHART_STYLE_WIND_H_COLOR;
  const WIND_D_BASE_COLOR = process.env.VUE_APP_CHART_STYLE_WIND_D_COLOR;

  const CHART_BACKGROUND_MAPPER = {
    temperature: `rgba(${TEMPERATURE_BASE_COLOR}, 0.4)`,
    humidity: `rgba(${HUMIDITY_BASE_COLOR}, 0.4)`,
    pressure: `rgba(${PRESSURE_BASE_COLOR}, 0.4)`,
    rain: `rgba(${RAIN_BASE_COLOR}, 0.4)`,
    windDirection: `rgba(${WIND_D_BASE_COLOR}, 0.4)`,
    windHSpeed: `rgba(${WIND_H_BASE_COLOR}, 0.4)`,
    windVSpeed: `rgba(${WIND_W_BASE_COLOR}, 0.4)`,

  };
  const CHART_BORDER_MAPPER = {
    temperature: `rgba(${TEMPERATURE_BASE_COLOR}, 0.8)`,
    humidity: `rgba(${HUMIDITY_BASE_COLOR}, 0.8)`,
    pressure: `rgba(${PRESSURE_BASE_COLOR}, 0.8)`,
    rain: `rgba(${RAIN_BASE_COLOR}, 0.8)`,
    windDirection: `rgba(${WIND_D_BASE_COLOR}, 0.8)`,
    windHSpeed: `rgba(${WIND_H_BASE_COLOR}, 0.8)`,
    windVSpeed: `rgba(${WIND_W_BASE_COLOR}, 0.8)`,

  };
  const CHART_HOVER_MAPPER = {
    temperature: `rgba(${TEMPERATURE_BASE_COLOR}, 1)`,
    humidity: `rgba(${HUMIDITY_BASE_COLOR}, 1)`,
    pressure: `rgba(${PRESSURE_BASE_COLOR}, 1)`,
    rain: `rgba(${RAIN_BASE_COLOR}, 1)`,
    windDirection: `rgba(${WIND_D_BASE_COLOR}, 1)`,
    windHSpeed: `rgba(${WIND_H_BASE_COLOR}, 1)`,
    windVSpeed: `rgba(${WIND_W_BASE_COLOR}, 1)`,

  };
  const CHART_PERIOD_LABEL_FORMAT_MAPPER = {
    hour: 'HH:mm',
    day: 'HH:mm',
    week: 'dd MMM',
    month: 'dd.MM',
    year: 'MMM yyyy',
  };

  export default {
    name: 'UserChartJS',
    data: () => ({
      chart: null,
    }),
    computed: {
      ...mapGetters('references', {
        i18n: REFERENCES.GET_I18N,
        currentLanguage: REFERENCES.GET_LANGUAGE_ID,
      }),
      ...mapGetters('reports', {
        chartPeriod: REPORTS.GET_REPORT_RANGE,
        chartTypes: REPORTS.GET_REPORT_TYPES,
        chartData: REPORTS.GET_CHART_DATA,
        chartIsFilled: REPORTS.GET_CHART_FILL,
        chartIsScaled: REPORTS.GET_CHART_SCALED,
      }),
      filteredChartDataSet() {
        const { chartData, chartPeriod, chartTypes } = this;
        const chartDataSet = chartDataTransformer({ chartData, chartPeriod });
        return chartTypes.map((chartType) => ({
          chartType,
          chartData: chartDataSet[chartType],
        }));
      },
      chartOptions() {
        const { filteredChartDataSet, chartIsScaled } = this;
        return {
          responsive: true,
          stacked: true,
          legend: false,
          hoverMode: 'index',
          animation: {
            duration: 300,
          },
          scales: {
            yAxes: filteredChartDataSet.map((item, index) => ({
              id: `${item.chartType}-id`,
              position: index % 2 ? 'right' : 'left',
              type: 'linear',
              display: chartIsScaled,
              ticks: {
                fontColor: CHART_BORDER_MAPPER[item.chartType],
              },
            })),
            xAxes: [
              {
                ticks: {
                  fontColor: 'white',
                },
              },
            ],
          },
        };
      },
      chartLabels() {
        const { filteredChartDataSet, chartPeriod, currentLanguage } = this;
        const chartData = get(filteredChartDataSet, '[0].chartData', []);
        return chartData.map((chartItem) => {
          const outputFormat = CHART_PERIOD_LABEL_FORMAT_MAPPER[chartPeriod];
          const timestamp = chartItem.time;
          const luxonTime = DateTime.fromSeconds(timestamp);
          return luxonTime.setLocale(currentLanguage).toFormat(outputFormat);
        });
      },
      chartDataSet() {
        const { filteredChartDataSet, chartLabels, chartIsFilled } = this;
        return {
          labels: chartLabels,
          datasets: filteredChartDataSet.map((item) => ({
            data: item.chartData.map((chartItem) => (chartItem.y)),
            label: this.getLabelName(item),
            backgroundColor: CHART_BACKGROUND_MAPPER[item.chartType],
            borderColor: CHART_BORDER_MAPPER[item.chartType],
            pointBorderColor: CHART_BORDER_MAPPER[item.chartType],
            pointHoverBorderColor: CHART_HOVER_MAPPER[item.chartType],
            pointBackgroundColor: CHART_BACKGROUND_MAPPER[item.chartType],
            pointHoverBackgroundColor: CHART_HOVER_MAPPER[item.chartType],
            fill: chartIsFilled,
            borderWidth: 1,
            pointHoverRadius: 8,
            yAxisID: `${item.chartType}-id`,
          })),
        };
      },
    },
    watch: {
      currentLanguage() {
        this.changeChartJs();
      },
      chartIsFilled() {
        this.changeChartJs();
      },
      chartIsScaled() {
        this.changeChartJs();
      },
      chartData: {
        deep: true,
        handler() {
          this.changeChartJs();
        },
      },
    },
    mounted() {
      this.initChartJs();
    },
    methods: {
      getLabelName(item) {
        const { i18n } = this;
        return get(i18n, `${item.chartType}Title`, item.chartType);
      },
      initChartJs() {
        const canvas = this.$refs.chart;
        const context = canvas.getContext('2d');
        this.chart = new Chart(context, {
          type: 'line',
        });
      },
      changeChartJs() {
        const { chart } = this;
        if (chart) {
          this.updateChartJs();
        }
      },
      updateChartJs() {
        const { chartOptions, chartDataSet } = this;
        const options = cloneDeep(chartOptions);
        const data = cloneDeep(chartDataSet);
        this.chart.options = options;
        this.chart.data = data;
        this.chart.update();
      },
    },
  };
</script>

<style lang="scss" scoped>
  .user-chart-js canvas {
    display: block;
    width: 100%;
    height: 400px;
  }
</style>
