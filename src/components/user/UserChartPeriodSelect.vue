<template>
  <div class="user-chart-period-select">
    <div class="row">
      <div
        v-for="(period, index) in options"
        :key="index"
        class="col-12 col-sm-3"
        :class="index !== options.length - 1 && 'mb-3 mb-sm-0'"
      >
        <div
          class="user-chart-period-select__option"
          :class="[
            period === value && 'user-chart-period-select__option_selected',
            disabled && 'user-chart-period-select__option_disabled',
          ]"
          @click="itemClickEvent(period)"
        >
          {{ getItemName(period) }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex';
  import { REFERENCES } from '~/store/types';
  import { replaceCurly } from '~/helpers/system';

  const CHART_PERIOD_TYPES = ['day', 'week', 'month', 'year'];
  const PERIOD_TRANSLATION_KEY = '{period}Period';

  export default {
    name: 'UserChartPeriodSelect',
    props: {
      value: {
        default: '',
        required: true,
        validator: (prop) => ['string'].includes(typeof prop) || prop === null,
      },
      disabled: {
        type: Boolean,
        default: false,
      },
    },
    data: () => ({
      options: CHART_PERIOD_TYPES,
    }),
    computed: {
      ...mapGetters('references', {
        i18n: REFERENCES.GET_I18N,
      }),
    },
    methods: {
      getItemName(period) {
        const { i18n } = this;
        const translationKey = replaceCurly(PERIOD_TRANSLATION_KEY, ['period'], [period]);
        return i18n[translationKey] || translationKey;
      },
      itemClickEvent(period) {
        const { value, disabled } = this;
        if (value !== period && !disabled) {
          this.$emit('select-period', period);
        }
      },
    },
  };
</script>

<style lang="scss" scoped>
  .user-chart-period-select {
    display: block;
    background: $color-gray-06;
    box-shadow: 0 8px 24px $sensor-shadow-color;
    border-radius: 5px;
    overflow: hidden;
  }
  .user-chart-period-select__option {
    text-align: center;
    text-transform: uppercase;
    color: $color-gray-01;
    padding: 25px 0;
    font-size: 11px;
    transition: opacity $animation-time-01 $animation-easing,background-color $animation-time-01 $animation-easing, box-shadow $animation-time-01 $animation-easing;
    cursor: pointer;
  }
  .user-chart-period-select__option:hover {
    background: $color-gray-05;
    box-shadow: inset 0 0 10px $sensor-shadow-color;
  }
  .user-chart-period-select__option_selected {
    background: $color-gray-05;
    box-shadow: inset 0 0 10px $sensor-shadow-color;
    cursor: default;
  }
  .user-chart-period-select__option_disabled {
    opacity: 0.8;
    cursor: not-allowed;
  }
  @media (min-width: $screen-md) {
    .user-chart-period-select__option {
      font-size: 15px;
    }
  }
</style>
