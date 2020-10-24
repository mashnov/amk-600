<template>
  <transition-group
    class="row"
    name="fade-in"
    mode="out-in"
    tag="div"
  >
    <div
      v-for="(chartType, index) in list"
      :key="index"
      class="col-12 col-sm-6 col-md-3 mb-3 mb-md-0"
    >
      <div class="user-chart-legend__item">
        <span
          :style="getItemStyle(chartType)"
        />
        <span>
          {{ getItemName(chartType) }}
        </span>
      </div>
    </div>
  </transition-group>
</template>

<script>
  import { mapGetters } from 'vuex';
  import { REFERENCES } from '~/store/types';
  import { replaceCurly } from '~/helpers/system';

  const TEMPERATURE_BASE_COLOR = process.env.VUE_APP_CHART_STYLE_TEMPERATURE_COLOR;
  const HUMIDITY_BASE_COLOR = process.env.VUE_APP_CHART_STYLE_HUMIDITY_COLOR;
  const PRESSURE_BASE_COLOR = process.env.VUE_APP_CHART_STYLE_PRESSURE_COLOR;
  const RAIN_BASE_COLOR = process.env.VUE_APP_CHART_STYLE_RAIN_COLOE;
  const TYPE_TRANSLATION_KEY = 'momentData_{chartType}SensorTitle';

  const CHART_BACKGROUND_MAPPER = {
    temperature: `rgb(${TEMPERATURE_BASE_COLOR})`,
    humidity: `rgb(${HUMIDITY_BASE_COLOR})`,
    pressure: `rgb(${PRESSURE_BASE_COLOR})`,
    rain: `rgb(${RAIN_BASE_COLOR})`,
  };

  export default {
    name: 'UserChartLegend',
    props: {
      list: {
        type: Array,
        required: true,
        default: () => ([]),
      },
    },
    computed: {
      ...mapGetters('references', {
        i18n: REFERENCES.GET_I18N,
      }),
    },
    methods: {
      getItemStyle(chartType) {
        return {
          backgroundColor: CHART_BACKGROUND_MAPPER[chartType],
        };
      },
      getItemName(chartType) {
        const { i18n } = this;
        const translationKey = replaceCurly(TYPE_TRANSLATION_KEY, ['chartType'], [chartType]);
        return i18n[translationKey];
      },
    },
  };
</script>

<style lang="scss" scoped>
  .user-chart-legend__item {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
  }
  .user-chart-legend__item span:first-child {
    display: block;
    width: 10px;
    height: 10px;
    margin-right: 5px;
    border-radius: 50%;
  }
  .user-chart-legend__item span:last-child {
    display: block;
    font-weight: 300;
    font-size: 13px;
    line-height: 20px;
    color: $color-gray-01;
    text-transform: uppercase;
  }
  @media (min-width: $screen-md) {
    .user-chart-legend__item span:last-child {
      font-size: 13px;
    }
  }
  @media (min-width: $screen-lg) {
    .user-chart-legend__item span:last-child {
      font-size: 16px;
    }
  }
</style>
