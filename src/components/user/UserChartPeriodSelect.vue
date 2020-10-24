<template>
  <div class="row">
    <div
      v-for="(period, index) in options"
      :key="index"
      class="col-12 col-sm-4 mb-3 mb-sm-0"
    >
      {{ period }}
    </div>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex';
  import { REFERENCES } from '~/store/types';
  import { replaceCurly } from '~/helpers/system';

  const PERIOD_TRANSLATION_KEY = 'userChart_{chartType}PeriodTitle';

  export default {
    name: 'UserChartPeriodSelect',
    props: {
      value: {
        default: '',
        required: true,
        validator: (prop) => ['string'].includes(typeof prop) || prop === null,
      },
      options: {
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
      getItemName(period) {
        const { i18n } = this;
        const translationKey = replaceCurly(PERIOD_TRANSLATION_KEY, ['period'], [period]);
        return i18n[translationKey];
      },
    },
  };
</script>

<style lang="scss" scoped>

</style>
