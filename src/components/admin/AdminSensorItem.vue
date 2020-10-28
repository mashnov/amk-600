<template>
  <div class="admin-sensor-item">
    <div class="admin-sensor-item__title">
      {{ title }}
    </div>
    <div
      class="admin-sensor-item__status"
      :class="!status && 'admin-sensor-item__status_red'"
    >
      {{ status ? i18n.connected : i18n.disconnected }}
    </div>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex';
  import { REFERENCES } from '~/store/types';

  export default {
    name: 'AdminSensorItem',
    props: {
      title: {
        type: String,
        default: '',
      },
      status: {
        type: Boolean,
        default: false,
      },
    },
    computed: {
      ...mapGetters('references', {
        i18n: REFERENCES.GET_I18N,
      }),
    },
  };
</script>

<style lang="scss" scoped>
  .admin-sensor-item {
    display: block;
    width: 100%;
    padding: 15px;
    background: rgba($color-gray-06, 0.6);
    border-radius: 5px;
  }
  .admin-sensor-item__title {
    display: block;
    font-weight: 500;
    font-size: 16px;
    line-height: 20px;
    margin-bottom: 10px;
    color: $color-gray-01;
    text-transform: uppercase;
  }
  .admin-sensor-item__status {
    display: block;
    font-weight: 300;
    font-size: 12px;
    line-height: 15px;
    color: $color-green-01;
    text-transform: uppercase;
    text-align: right;
    transition: color $animation-time-01 $animation-easing;
  }
  .admin-sensor-item__status_red {
    color: $color-red-02;
  }
</style>
