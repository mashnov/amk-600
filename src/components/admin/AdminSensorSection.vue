<template>
  <div class="admin-sensor-section">
    <div class="row">
      <div class="col-12 mb-4">
        <div class="admin-sensor-section__title">
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
          class="admin-sensor-section__item"
          @click="itemClickHandler(sensors[item])"
        >
          <div
            class="admin-sensor-section__item-value"
            :class="value === sensors[item] && 'admin-sensor-section__item-value_selected'"
          />
          <div class="admin-sensor-section__item-title">
            {{ sensors[item] }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'AdminSensorSection',
    props: {
      title: {
        type: String,
        default: '',
      },
      sensors: {
        type: Array,
        default: () => ([]),
      },
      value: {
        default: '',
        required: true,
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
      itemClickHandler(name) {
        this.$emit('select-item', name);
      },
    },
  };
</script>

<style lang="scss" scoped>
  .admin-sensor-section__title {
    display: block;
    font-weight: 300;
    font-size: 15px;
    line-height: 20px;
    text-transform: uppercase;
    color: $color-gray-01;
  }
  .admin-sensor-section__item {
    display: block;
    padding: 25px;
    background: $color-gray-06;
    box-shadow: 0 8px 24px $sensor-shadow-color;
    border-radius: 5px;
    cursor: pointer;
  }
  .admin-sensor-section__item-value {
    display: block;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background-color: transparent;
    border: 2px solid rgba($color-gray-01, 0.5);
    transition: background-color $animation-time-01 $animation-easing, border $animation-time-01 $animation-easing;
  }
  .admin-sensor-section__item:hover .admin-sensor-section__item-value:not(.admin-sensor-section__item-value_selected) {
    background-color: rgba($color-green-01, 0.3);
    border: 2px solid rgba($color-green-01, 0.3);
  }
  .admin-sensor-section__item-value_selected {
    background-color: rgba($color-green-01, 0.5);
    border: 2px solid $color-green-01;
  }
  .admin-sensor-section__item-title {
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
    .admin-sensor-section__item-value {
      font-size: 48px;
      line-height: 48px;
    }
  }
</style>
