<template>
  <div
    class="amk-button"
    :class="[
      block && 'amk-button_block',
      disabled && 'amk-button_disabled',
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
  const TYPES_LIST = ['button', 'reset', 'submit'];

  export default {
    name: 'AmkButton',
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
  .amk-button {
    display: inline-block;
    transform: scale(0.96);
    filter: brightness(0.96);
    transition: filter $animation-time-01 $animation-easing, transform $animation-time-01 $animation-easing;
  }
  .amk-button:not(.amk-button_disabled):hover {
    transform: scale(0.98);
    filter: brightness(0.98);
  }
  .amk-button:not(.amk-button_disabled):active {
    transform: scale(1);
    filter: brightness(1);
  }
  .amk-button_disabled {
    filter: brightness(0.6);
  }
  .amk-button button {
    display: block;
    width: 100%;
    border-radius: 5px;
    border: 1px solid transparent;
    background-color: $color-violet-01;
    cursor: pointer;
  }
  .amk-button_disabled button {
    cursor: not-allowed;
  }
  .amk-button button span {
    display: block;
    text-align: center;
    padding: 10px 25px 8px 25px;
    font-size: 15px;
    line-height: 20px;
    font-weight: 500;
    text-transform: uppercase;
    color: $color-gray-01;
  }
</style>
