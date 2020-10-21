<template>
  <div
    class="pa-button"
    :class="[
      theme && `pa-button_${theme}`,
      block && 'pa-button_block',
      disabled && 'pa-button_disabled',
    ]"
    @click="clickHandler"
  >
    <button
      :disabled="disabled"
      :type="type"
    >
      <span>
        <slot />
      </span>
    </button>
  </div>
</template>

<script>
  const THEMES_LIST = ['blue', 'white', 'text', 'white-text'];
  const TYPES_LIST = ['button', 'reset', 'submit'];

  export default {
    name: 'PaButton',
    props: {
      disabled: {
        type: Boolean,
        default: false,
      },
      block: {
        type: Boolean,
        default: false,
      },
      type: {
        default: TYPES_LIST[0],
        type: String,
        validator: (value) => TYPES_LIST.includes(value),
      },
      theme: {
        default: THEMES_LIST[0],
        type: String,
        validator: (value) => THEMES_LIST.includes(value),
      },
    },
    methods: {
      clickHandler() {
        const { disabled } = this;
        if (!disabled) {
          this.$emit('click');
        }
      },
    },
  };
</script>

<style lang="scss" scoped>
  .pa-button {
    display: inline-block !important;
    transition: filter $animation-time-01 $animation-easing, transform $animation-time-01 $animation-easing !important;
  }
  .pa-button:not(.pa-button_disabled):hover {
    transform: scale(1.02) !important;
    filter: brightness(0.8) !important;
  }
  .pa-button:not(.pa-button_disabled):active {
    transform: scale(0.98) !important;
  }
  .pa-button_block {
    display: block !important;
    width: 100% !important;
  }
  .pa-button_disabled {
    filter: brightness(0.7) !important;
  }
  .pa-button button {
    display: block !important;
    width: 100% !important;
    border-radius: 5px !important;
    border: 1px solid transparent !important;
    background-color: transparent !important;
    cursor: pointer !important;
  }
  .pa-button_blue button {
    background-color: $color-blue-1 !important;
    border-color: $color-blue-1 !important;
    color: $color-gray-01 !important;
  }
  .pa-button_white button {
    background-color: $color-gray-01 !important;
    border-color: $color-gray-11 !important;
    color: $color-gray-11 !important;
  }
  .pa-button_text button {
    color: $color-gray-11 !important;
    border-color: $color-gray-11 !important;
  }
  .pa-button_white-text button {
    color: $color-gray-01 !important;
    border-color: $color-gray-01 !important;
  }
  .pa-button_disabled button {
    cursor: not-allowed !important;
  }
  .pa-button button span {
    display: block !important;
    padding: 5px 10px !important;
    font-size: 15px !important;
    line-height: 20px !important;
    font-weight: 500 !important;
    text-transform: uppercase !important;
  }
</style>
