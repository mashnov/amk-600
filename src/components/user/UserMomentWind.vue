<template>
  <div class="user-moment-wind">
    <div class="user-moment-wind__title">
      {{ i18n.windData2 }}
    </div>
    <div class="user-moment-wind__wrapper">
      <div class="row d-sm-flex align-items-center">
        <div class="col-sm-7 d-none d-sm-flex align-items-center">
          <UserMomentCompass
            :value="momentData.windDirection"
          />
        </div>
        <div class="col-12 col-sm-5 mb-3 mb-sm-0">
          <div class="row mb-4">
            <div class="col-12">
              <UserMomentWindItem
                v-tooltip.bottom="{ content: i18n.addWindHSpeedToChart, offset: 15 }"
                :title="i18n.horizontalSpeedTitle"
                :value="momentData.windSpeed"
                :unit="i18n.windUnit"
                :disabled="fetchIsLock"
                :is-active="reportTypes.includes('windHSpeed')"
                @select-item="selectReportItem('windHSpeed')"
              />
            </div>
          </div>
          <div class="row mb-4">
            <div class="col-12">
              <UserMomentWindItem
                v-tooltip.bottom="{ content: i18n.addWindDirectionToChart, offset: 15 }"
                :title="i18n.directionTitle"
                :value="momentData.windDirection"
                :unit="i18n.degreeUnit"
                :disabled="fetchIsLock"
                :is-active="reportTypes.includes('windDirection')"
                @select-item="selectReportItem('windDirection')"
              />
            </div>
          </div>
          <div class="row">
            <div class="col-12">
              <UserMomentWindItem
                v-tooltip.bottom="{ content: i18n.addWindWSpeedToChart, offset: 15 }"
                :title="i18n.verticalSpeedTitle"
                :value="momentData.windVerticalSpeed"
                :unit="i18n.windUnit"
                :disabled="fetchIsLock"
                :is-active="reportTypes.includes('windVSpeed')"
                @select-item="selectReportItem('windVSpeed')"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import { mapGetters, mapActions } from 'vuex';
  import { REFERENCES, USER, REPORTS, AUTH } from '~/store/types';
  import { AUTH as AUTH_ROUTE_NAMES } from '~/router/names';

  import UserMomentWindItem from './UserMomentWindItem';
  import UserMomentCompass from './UserMomentCompass';

  export default {
    name: 'UserMomentWind',
    components: {
      UserMomentWindItem,
      UserMomentCompass,
    },
    computed: {
      ...mapGetters('references', {
        i18n: REFERENCES.GET_I18N,
      }),
      ...mapGetters('user', {
        momentData: USER.GET_MOMENT_DATA,
      }),
      ...mapGetters('reports', {
        fetchIsLock: REPORTS.GET_FETCH_IS_LOCK,
        reportTypes: REPORTS.GET_REPORT_TYPES,
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
      async selectReportItem(reportType) {
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
  .user-moment-wind {
    display: flex;
    flex-direction: column;
    width: 100%;
  }
  .user-moment-wind__title {
    display: block;
    font-weight: 300;
    font-size: 16px;
    line-height: 20px;
    color: $color-gray-01;
    text-transform: uppercase;
    margin-bottom: 10px;
  }
  .user-moment-wind__wrapper {
    display: block;
    padding: 25px;
    flex: 1 0 auto;
    background: $color-gray-06;
    box-shadow: 0 8px 24px $sensor-shadow-color;
    border-radius: 5px;
    transition: background-color $animation-time-01 $animation-easing, box-shadow $animation-time-01 $animation-easing;
  }
  .user-moment-wind__sensor-title {
    display: block;
    font-weight: 300;
    font-size: 12px;
    line-height: 15px;
    color: $color-gray-01;
    text-transform: capitalize;
    margin-bottom: 5px;
    text-align: right;
  }
  .user-moment-wind__sensor-value {
    display: block;
    width: 100%;
    font-weight: 600;
    font-size: 48px;
    line-height: 48px;
    color: $color-gray-01;
    text-align: right;
  }
  .user-moment-wind__sensor-value span {
    display: inline-block;
    vertical-align: top;
    font-weight: 300;
    font-size: 16px;
    line-height: 20px;
    color: $color-gray-01;
  }
  @media (min-width: $screen-sm) {
    .user-moment-wind__sensor-title {
      text-align: left;
    }
    .user-moment-wind__sensor-value {
      text-align: left;
    }
  }
</style>
