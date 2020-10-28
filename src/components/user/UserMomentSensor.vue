<template>
  <div
    class="user-moment-sensor"
    :class="[
      isActive && 'user-moment-sensor_active',
      disabled && 'user-moment-sensor_disabled',
    ]"
    @click="itemClickHandler"
  >
    <div class="user-moment-sensor__title">
      {{ title }}
    </div>
    <div class="user-moment-sensor__wrapper">
      <div class="user-moment-sensor__unit">
        {{ unit || 0 }}
      </div>
      <div class="user-moment-sensor__value">
        {{ value || 0 }}
      </div>
    </div>
  </div>
</template>

<script>
  const VALUE_TYPES = ['string', 'number'];
  const UNIT_TYPES = ['string'];
  const TITLE_TYPES = ['string'];

  export default {
    name: 'UserMomentSensor',
    props: {
      isActive: {
        type: Boolean,
        default: false,
        required: true,
      },
      disabled: {
        type: Boolean,
        default: false,
      },
      title: {
        default: null,
        required: true,
        validator: (prop) => TITLE_TYPES.includes(typeof prop) || prop === null,
      },
      unit: {
        default: null,
        required: true,
        validator: (prop) => UNIT_TYPES.includes(typeof prop) || prop === null,
      },
      value: {
        default: null,
        required: true,
        validator: (prop) => VALUE_TYPES.includes(typeof prop) || prop === null,
      },
    },
    methods: {
      itemClickHandler() {
        const { disabled } = this;
        if (!disabled) {
          this.$emit('select-item');
        }
      },
    },
  };
</script>

<style lang="scss" scoped>
  .user-moment-sensor__title {
    display: block;
    font-weight: 300;
    font-size: 16px;
    line-height: 20px;
    color: $color-gray-01;
    text-transform: uppercase;
    margin-bottom: 10px;
  }
  .user-moment-sensor__wrapper {
    display: block;
    padding: 25px;
    background: $color-gray-06;
    box-shadow: 0 8px 24px $sensor-shadow-color;
    border-radius: 5px;
    transition: background-color $animation-time-01 $animation-easing, box-shadow $animation-time-01 $animation-easing, opacity $animation-time-01 $animation-easing;
    cursor: pointer;
  }
  .user-moment-sensor_active .user-moment-sensor__wrapper {
    background: $color-gray-05;
    box-shadow: inset 0 0 10px $sensor-shadow-color;
  }
  .user-moment-sensor_disabled .user-moment-sensor__wrapper {
    opacity: 0.8;
    cursor: not-allowed;
  }
  .user-moment-sensor__wrapper:hover {
    background: $color-gray-05;
    box-shadow: inset 0 0 10px $sensor-shadow-color;
  }
  .user-moment-sensor__unit {
    display: block;
    width: 100%;
    text-align: right;
    font-weight: 300;
    font-size: 16px;
    line-height: 20px;
    color: $color-gray-01;
    margin-bottom: 10px;
  }
  .user-moment-sensor__value {
    display: block;
    width: 100%;
    text-align: right;
    font-weight: 600;
    font-size: 28px;
    line-height: 28px;
    color: $color-gray-01;
  }
  @media (min-width: $screen-sm) {
    .user-moment-sensor__value {
      font-size: 30px;
      line-height: 30px;
    }
  }
  @media (min-width: $screen-md) {
    .user-moment-sensor__value {
      font-size: 40px;
      line-height: 40px;
    }
  }
  @media (min-width: $screen-lg) {
    .user-moment-sensor__value {
      font-size: 35px;
      line-height: 35px;
    }
  }
</style>
