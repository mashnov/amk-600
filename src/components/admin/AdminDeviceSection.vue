<template>
  <div
    class="admin-device-section"
    :class="editable && 'admin-device-section_editable'"
  >
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
        <div
          class="admin-device-section__item"
          :class="[
            value === item && 'admin-device-section__item_selected',
            getIsBatteryCharging(item) === 1 && 'admin-device-section__item_blue',
            !getIsBatteryCharging(item) === 0 && 'admin-device-section__item_red',
          ]"
          @click="itemClickHandler(item)"
        >
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
      editable: {
        type: Boolean,
        default: false,
      },
      title: {
        type: String,
        default: '',
      },
      sensors: {
        type: Object,
        default: () => ({}),
      },
      value: {
        default: '',
        validator: (prop) => ['string'].includes(typeof prop) || prop === null,
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
        const fixedTypes = ['number'];
        return fixedTypes.includes(typeof (value)) ? value.toFixed(3) : value;
      },
      getIsBatteryCharging(item) {
        const { sensors } = this;
        const batteryChargeKey = 'isBatteryCharging';
        return item === batteryChargeKey ? Number(sensors[batteryChargeKey]) : null;
      },
      itemClickHandler(name) {
        const { editable } = this;
        if (editable) {
          this.$emit('select-item', name);
        }
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
    position: relative;
    display: block;
    padding: 25px;
    background: $color-gray-06;
    box-shadow: 0 8px 24px $sensor-shadow-color;
    border-radius: 5px;
  }
  .admin-device-section_editable .admin-device-section__item {
    overflow: hidden;
    cursor: pointer;
  }
  .admin-device-section__item:before {
    position: absolute;
    width: 8px;
    height: 100%;
    top: 0;
    left: 0;
    background-color: transparent;
    border-left: transparent;
    transition: background-color $animation-time-01 $animation-easing, border $animation-time-01 $animation-easing;
  }
  .admin-device-section_editable .admin-device-section__item:before {
    content: '';
  }
  .admin-device-section_editable .admin-device-section__item:not(.admin-device-section__item_selected):hover:before {
    background-color: rgba($color-green-01, 0.3);
  }
  .admin-device-section_editable .admin-device-section__item_selected:before {
    background-color: rgba($color-green-01, 0.5);
    border-left: 2px solid $color-green-01;
  }
  .admin-device-section__item_blue {
    overflow: hidden;
  }
  .admin-device-section__item_red {
    overflow: hidden;
  }
  .admin-device-section__item_blue:before {
    content: '';
    background-color: rgba($color-violet-03, 0.5);
    border-left: 2px solid $color-violet-03;
  }
  .admin-device-section__item_red:before {
    content: '';
    background-color: rgba($color-red-02, 0.5);
    border-left: 2px solid $color-red-02;
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
    font-size: 20px;
    line-height: 30px;
    color: $color-gray-01;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  @media (min-width: $screen-md) {
    .admin-device-section__item-value {
      font-size: 28px;
      line-height: 28px;
    }
  }
</style>
