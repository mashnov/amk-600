<template>
  <div class="col-8 col-md-4 user-chart-period-select">
    <div class="user-chart-period-select__wrapper">
      <div class="row mb-5">
        <div class="col-12">
          <h2 class="user-chart-period-select__title">
            {{ i18n.SelectChartPeriod }}
          </h2>
        </div>
      </div>
      <div class="row">
        <div
          v-for="(period, index) in options"
          :key="index"
          class="col-12 mb-3"
        >
          <AmkButton
            :block="true"
            :disabled="fetchIsLock"
            @click="inputHandler(period)"
          >
            {{ getItemName(period) }}
          </AmkButton>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import { mapGetters, mapActions } from 'vuex';
  import { REFERENCES, AUTH, REPORTS, MODAL } from '~/store/types';
  import { AUTH as AUTH_ROUTE_NAMES } from '~/router/names';
  import { replaceCurly } from '~/helpers/system';

  import AmkButton from '~/components/form-items/amk-button/AmkButton';

  const CHART_PERIOD_TYPES = ['day', 'week', 'month', 'year'];
  const PERIOD_TRANSLATION_KEY = '{period}Period';

  export default {
    name: 'UserChartPeriodSelect',
    components: {
      AmkButton,
    },
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
      ...mapActions('modal', {
        closeModal: MODAL.HIDE_MODAL,
      }),
      ...mapActions('reports', {
        setReportRange: REPORTS.SET_REPORT_RANGE,
        fetchChartData: REPORTS.FETCH_CHART_DATA,
      }),
      async inputHandler(period) {
        const { chartPeriod, disabled } = this;
        if (chartPeriod !== period && !disabled) {
          this.setReportRange(period);
          const { successes } = await this.fetchChartData();
          if (!successes) {
            this.logoutAction();
          }
        }
        this.closeModal();
      },
      async logoutAction() {
        await this.logoutHandler();
        this.$router.push({ name: AUTH_ROUTE_NAMES.auth });
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
  .user-chart-period-select__wrapper {
    padding: 0 30px;
  }
  .user-chart-period-select__title {
    display: block;
    font-size: 25px;
    font-weight: 500;
    color: $color-gray-01;
    text-align: center;
  }
</style>
