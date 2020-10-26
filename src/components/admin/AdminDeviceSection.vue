<template>
  <div class="admin-device-section">
    <div class="row">
      <div class="col-12 mb-4">
        <div class="admin-device-section__title">
          {{ title }}
        </div>
      </div>
    </div>
    <div class="row">
      <div
        v-for="(item, index) in sensorList"
        :key="index"
        class="col-12 col-sm-6 col-lg-4 col-xl-3 mb-3"
      >
        <div class="admin-device-section__item">
          <div class="admin-device-section__item-title">
            {{ item }}
          </div>
          <div class="admin-device-section__item-value">
            {{ getSensorValue(item) }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import get from 'lodash/get';

  export default {
    name: 'AdminDeviceSection',
    props: {
      title: {
        type: String,
        default: '',
      },
      sensors: {
        type: Object,
        default: () => ({}),
      },
    },
    computed: {
      sensorList() {
        const { sensors } = this;
        return Object.keys(sensors);
      },
    },
    methods: {
      getSensorValue(item) {
        const { sensors } = this;
        const value = get(sensors, item, 0);
        return value.toFixed(2);
      },
    },
  };
</script>

<style lang="scss" scoped>
  .admin-device-section__title {
    display: block;
    font-weight: 300;
    font-size: 15px;
    line-height: 20px;
    text-transform: uppercase;
    color: $color-gray-01;
  }
  .admin-device-section__item {
    display: block;
    padding: 25px;
    background: $color-gray-06;
    box-shadow: 0 8px 24px $sensor-shadow-color;
    border-radius: 5px;
  }
  .admin-device-section__item-title {
    display: block;
    width: 100%;
    font-weight: 300;
    font-size: 16px;
    line-height: 20px;
    color: $color-gray-01;
    margin-bottom: 10px;
    word-break: break-all;
  }
  .admin-device-section__item-value {
    display: block;
    width: 100%;
    text-align: right;
    font-weight: 600;
    font-size: 28px;
    line-height: 38px;
    color: $color-gray-01;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  @media (min-width: $screen-md) {
    .admin-device-section__item-value {
      font-size: 48px;
      line-height: 48px;
    }
  }
</style>
