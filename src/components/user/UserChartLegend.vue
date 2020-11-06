<template>
  <div
    class="user-chart-legend"
    :class="fetchIsLock && 'user-chart-legend_disabled'"
  >
    <transition-group
      class="row"
      name="fade-in"
      mode="out-in"
      tag="div"
    >
      <div
        v-for="(chartType, index) in list"
        :key="`select-item${index}`"
        class="col-3 col-md-3 col-lg-1 mb-3"
      >
        <div
          v-tooltip="{ content: getIconTitle(chartType), offset: 15 }"
          class="user-chart-legend__icon"
          :style="getItemStyle(chartType)"
          @click="itemClickHandler(chartType)"
        >
          <Component :is="getIconName(chartType)" />
        </div>
      </div>
      <div
        class="col-12 col-lg-2 ml-lg-auto"
        key="select"
      >
        <UserChartPeriodSelect />
      </div>
    </transition-group>
  </div>
</template>

<script>
  import { mapGetters, mapActions } from 'vuex';
  import { REFERENCES, REPORTS, AUTH } from '~/store/types';
  import { AUTH as AUTH_ROUTE_NAMES } from '~/router/names';

  import UserChartPeriodSelect from './UserChartPeriodSelect';
  import temperatureIcon from '~/assets/svg/temperature-icon.svg';
  import rainIcon from '~/assets/svg/rain-icon.svg';
  import humidityIcon from '~/assets/svg/humidity-icon.svg';
  import pressureIcon from '~/assets/svg/pressure-icon.svg';
  import windDirectionIcon from '~/assets/svg/wind-d-icon.svg';
  import windHSpeedIcon from '~/assets/svg/wind-h-icon.svg';
  import windVSpeedIcon from '~/assets/svg/wind-v-icon.svg';

  const TEMPERATURE_BASE_COLOR = process.env.VUE_APP_CHART_STYLE_TEMPERATURE_COLOR;
  const HUMIDITY_BASE_COLOR = process.env.VUE_APP_CHART_STYLE_HUMIDITY_COLOR;
  const PRESSURE_BASE_COLOR = process.env.VUE_APP_CHART_STYLE_PRESSURE_COLOR;
  const RAIN_BASE_COLOR = process.env.VUE_APP_CHART_STYLE_RAIN_COLOR;
  const WIND_W_BASE_COLOR = process.env.VUE_APP_CHART_STYLE_WIND_W_COLOR;
  const WIND_H_BASE_COLOR = process.env.VUE_APP_CHART_STYLE_WIND_H_COLOR;
  const WIND_D_BASE_COLOR = process.env.VUE_APP_CHART_STYLE_WIND_D_COLOR;

  const CHART_BACKGROUND_MAPPER = {
    temperature: `rgb(${TEMPERATURE_BASE_COLOR})`,
    humidity: `rgb(${HUMIDITY_BASE_COLOR})`,
    pressure: `rgb(${PRESSURE_BASE_COLOR})`,
    rain: `rgb(${RAIN_BASE_COLOR})`,
    windDirection: `rgb(${WIND_D_BASE_COLOR})`,
    windHSpeed: `rgb(${WIND_H_BASE_COLOR})`,
    windVSpeed: `rgb(${WIND_W_BASE_COLOR})`,
  };

  const ICON_NAME_MAPPER = {
    temperature: 'temperatureTitle',
    humidity: 'humidityTitle',
    pressure: 'pressureTitle',
    rain: 'rainTitle',
    windVSpeed: 'verticalSpeedTitle',
    windHSpeed: 'horizontalSpeedTitle',
    windDirection: 'directionTitle',
  };

  export default {
    name: 'UserChartLegend',
    components: {
      UserChartPeriodSelect,
      temperatureIcon,
      rainIcon,
      humidityIcon,
      pressureIcon,
      windDirectionIcon,
      windHSpeedIcon,
      windVSpeedIcon,
    },
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
      ...mapGetters('reports', {
        fetchIsLock: REPORTS.GET_FETCH_IS_LOCK,
      }),
    },
    methods: {
      ...mapActions('reports', {
        setReportTypes: REPORTS.SET_REPORT_TYPES,
        fetchChartData: REPORTS.FETCH_CHART_DATA,
      }),
      ...mapActions('auth', {
        logoutHandler: AUTH.LOGOUT_HANDLER,
      }),
      getItemStyle(chartType) {
        return {
          color: CHART_BACKGROUND_MAPPER[chartType],
        };
      },
      getIconName(chartType) {
        return `${chartType}Icon`;
      },
      getIconTitle(chartType) {
        const { i18n } = this;
        const iconKey = ICON_NAME_MAPPER[chartType];
        return i18n[iconKey];
      },
      async itemClickHandler(reportType) {
        const { fetchIsLock } = this;
        if (fetchIsLock) {
          return;
        }
        this.setReportTypes(reportType);
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
  .user-chart-legend_disabled {
    cursor: not-allowed;
  }
  .user-chart-legend__icon {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    cursor: pointer;
  }
  .user-chart-legend__icon svg {
    display: block;
    max-width: 100%;
    height: 40px;
    margin: auto;
    transform: scale(0.9);
    opacity: 0.7;
    transition: opacity $animation-time-01 $animation-easing, transform $animation-time-01 $animation-easing;
  }
  .user-chart-legend__icon:hover svg {
    transform: scale(1);
    opacity: 1;
  }
</style>
