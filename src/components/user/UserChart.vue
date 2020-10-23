<template>
  <div class="user-chart">
    {{ reportTypes }}
  </div>
</template>

<script>
  import { mapGetters } from 'vuex';
  import { REPORTS } from '~/store/types';

  export default {
    name: 'UserChart',
    computed: {
      ...mapGetters('reports', {
        reportTypes: REPORTS.GET_REPORT_TYPES,
      }),
    },
  };
</script>
