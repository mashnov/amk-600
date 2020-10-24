<template>
  <transition-group
    class="user-chart-legend"
    name="fade-in"
    tag="div"
  >
    <div
      class="user-chart-legend__item"
      v-for="(item, index) in list"
      :key="index"
    >
      <span
        :style="getItemStyle(item)"
      />
      <span>
        {{ getItemName(item) }}
      </span>
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
  const TYPE_TRANSLATION_KEY = 'momentData_{type}SensorTitle';

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
      getItemStyle(type) {
        return {
          backgroundColor: CHART_BACKGROUND_MAPPER[type],
        }
      },
      getItemName(type) {
        const { i18n } = this;
        const translationKey = replaceCurly(TYPE_TRANSLATION_KEY, ['type'], [type]);
        return i18n[translationKey];
      }
    },
  };
</script>

<style lang="scss" scoped>
  .user-chart-legend {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
  }
  .user-chart-legend__item {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
  }
  .user-chart-legend__item:not(:last-child) {
    margin-right: 50px;
  }
  .user-chart-legend__item span:first-child {
    display: block;
    width: 10px;
    height: 10px;
    margin-right: 10px;
    border-radius: 50%;
  }
  .user-chart-legend__item span:last-child {
    display: block;
    font-weight: 300;
    font-size: 16px;
    line-height: 20px;
    color: $color-gray-01;
    text-transform: uppercase;
  }
</style>