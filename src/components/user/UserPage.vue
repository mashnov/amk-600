<template>
  <div class="user-page">
    <div class="user-page__wrapper">
      <div class="user-page__content">
        <div class="row">
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
      </div>
      <div class="user-page__device">
        <div class="user-page__device-wrapper">
          <LayoutDeviceInfo
            v-if="deviceInfoIsLayout"
            :inline="true"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import { mapGetters, mapActions } from 'vuex';
  import { REFERENCES, REPORTS, AUTH, VIEWPORT } from '~/store/types';
  import { AUTH as AUTH_ROUTE_NAMES } from '~/router/names';
  import { chartDataTransformer } from '~/helpers/transformers';

  import LayoutDeviceInfo from '~/components/layout/LayoutDeviceInfo';

  import UserMomentData from './UserMomentData';
  import UserChartLegend from './UserChartLegend';
  import UserChart from './UserChart';
  import UserChartPeriodSelect from './UserChartPeriodSelect';
  import UserStatData from './UserStatData';
  import PreloaderIcon from '~/assets/svg/preloader-icon.svg';

  const DEVICE_INFO_IS_LAYOUT_FROM = 1640;

  export default {
    name: 'UserPage',
    components: {
      UserMomentData,
      UserChartLegend,
      UserChart,
      UserChartPeriodSelect,
      UserStatData,
      LayoutDeviceInfo,
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
      ...mapGetters('viewport', {
        viewportWidth: VIEWPORT.GET_VIEWPORT_WIDTH,
      }),
      deviceInfoIsLayout() {
        const { viewportWidth } = this;
        return viewportWidth >= DEVICE_INFO_IS_LAYOUT_FROM;
      },
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
  }
  @media (min-width: 1640px) {
    .user-page__wrapper {
      display: flex;
      flex-wrap: wrap;
      align-items: stretch;
    }
    .user-page__content {
      display: block;
      width: calc(100% - 580px - 50px);
    }
    .user-page__device {
      display: block;
      width: 580px;
      margin-left: 50px;
    }
    .user-page__device-wrapper {
      position: sticky;
      top: 50px;
      bottom: 50px;
    }
  }
</style>
