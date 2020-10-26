<template>
  <div
    class="checkbox"
    :class="[
      value && 'checkbox_active',
    ]"
  >
    <div
      class="checkbox__icon"
      @click="clickHandler"
    >
      <CheckboxIcon />
    </div>
    <div class="checkbox__label">
      <slot />
    </div>
  </div>
</template>

<script>
  import throttle from 'lodash/throttle';
  import CheckboxIcon from '~/assets/svg/checkbox-icon.svg';

  export default {
    name: 'AmkCheckbox',
    components: {
      CheckboxIcon,
    },
    props: {
      value: {
        type: Boolean,
        default: false,
        required: true,
      },
    },
    methods: {
      clickHandler: throttle(function() {
        const { disabled, value } = this;
        if (!disabled) {
          this.$emit('input', !value);
        }
      }, 300),
    },
  };
</script>

<style lang="scss" scoped>
  .checkbox {
    display: flex;
    flex-wrap: wrap;
    align-items: flex-start;
  }
  .checkbox__icon {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    width: 24px;
    height: 24px;
    border-radius: 3px;
    background: $color-gray-01;
    overflow: hidden;
    cursor: pointer;
  }
  .checkbox__icon svg {
    display: block;
    width: 12px;
    margin: 0 auto;
    color: $color-gray-01;
    opacity: 0;
    transform: scale(2);
    transition: color $animation-time-01 $animation-easing, opacity $animation-time-01 $animation-easing, transform $animation-time-01 $animation-easing;
  }
  .checkbox_active .checkbox__icon svg {
    transform: scale(1);
    color: $color-violet-02;
    opacity: 1;
  }
  .checkbox__label {
    display: block;
    font-size: 15px;
    margin-left: 15px;
    line-height: 20px;
    color: $color-gray-01;
    width: calc(100% - 24px - 15px);
  }
</style>
