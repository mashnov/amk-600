<template>
  <div class="user-page">
    <div class="user-page__wrapper">
      <div class="user-page__content">
        <div class="row">
          <div class="col-12 mb-5">
            <UserMomentData />
          </div>
          <template v-if="reportTypes.length">
            <div class="col-12 mb-4">
              <UserChartLegend
                :active-list="reportTypes"
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
                <UserChartJs />
              </div>
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
  import { mapGetters } from 'vuex';
  import { REFERENCES, REPORTS, VIEWPORT } from '~/store/types';

  import LayoutDeviceInfo from '~/components/layout/LayoutDeviceInfo';
  import UserMomentData from './UserMomentData';
  import UserChartLegend from './UserChartLegend';
  import UserChartJs from './UserChartJs';
  import UserStatData from './UserStatData';
  import PreloaderIcon from '~/assets/svg/preloader-icon.svg';

  const DEVICE_INFO_IS_LAYOUT_FROM = 1640;

  export default {
    name: 'UserPage',
    components: {
      UserMomentData,
      UserChartLegend,
      UserChartJs,
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
      }),
      ...mapGetters('viewport', {
        viewportWidth: VIEWPORT.GET_VIEWPORT_WIDTH,
      }),
      deviceInfoIsLayout() {
        const { viewportWidth } = this;
        return viewportWidth >= DEVICE_INFO_IS_LAYOUT_FROM;
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
