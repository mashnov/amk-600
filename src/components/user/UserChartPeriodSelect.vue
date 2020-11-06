<template>
  <div class="user-chart-period-select">
    <div class="row">
      <div class="col-12">
        <label>
          <select
            :value="chartPeriod"
            :disabled="fetchIsLock"
            @input="inputHandler($event.target.value)"
          >
            <option
              v-for="(period, index) in options"
              :key="index"
              :value="period"
              v-html="getItemName(period)"
            />
          </select>
        </label>
      </div>
    </div>
  </div>
</template>

<script>
  import { mapGetters, mapActions } from 'vuex';
  import { REFERENCES, AUTH, REPORTS } from '~/store/types';
  import { AUTH as AUTH_ROUTE_NAMES } from '~/router/names';
  import { replaceCurly } from '~/helpers/system';

  const CHART_PERIOD_TYPES = ['day', 'week', 'month', 'year'];
  const PERIOD_TRANSLATION_KEY = '{period}Period';

  export default {
    name: 'UserChartPeriodSelect',
    data: () => ({
      options: CHART_PERIOD_TYPES,
    }),
    computed: {
      ...mapGetters('references', {
        i18n: REFERENCES.GET_I18N,
      }),
      ...mapGetters('reports', {
        chartPeriod: REPORTS.GET_REPORT_RANGE,
        fetchIsLock: REPORTS.GET_FETCH_IS_LOCK,
      }),
    },
    methods: {
      ...mapActions('auth', {
        logoutHandler: AUTH.LOGOUT_HANDLER,
      }),
      ...mapActions('reports', {
        setReportRange: REPORTS.SET_REPORT_RANGE,
        fetchChartData: REPORTS.FETCH_CHART_DATA,
      }),
      async logoutAction() {
        await this.logoutHandler();
        this.$router.push({ name: AUTH_ROUTE_NAMES.auth });
      },
      async inputHandler(period) {
        const { chartPeriod, disabled } = this;
        if (chartPeriod !== period && !disabled) {
          this.setReportRange(period);
          const { successes } = await this.fetchChartData();
          if (!successes) {
            this.logoutAction();
          }
        }
      },
      getItemName(period) {
        const { i18n } = this;
        const translationKey = replaceCurly(PERIOD_TRANSLATION_KEY, ['period'], [period]);
        return i18n[translationKey] || translationKey;
      },
    },
  };
</script>

<style lang="scss" scoped>
  .user-chart-period-select select {
    position: relative;
    display: block;
    margin-left: auto;
    padding: 10px 20px;
    background: $color-gray-06;
    box-shadow: 0 8px 24px $sensor-shadow-color;
    border-radius: 5px;
    text-transform: uppercase;
    color: $color-gray-01;
  }
</style>
