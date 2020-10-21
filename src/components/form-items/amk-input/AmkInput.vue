<template>
  <div
    class="pa-input"
    :class="[
      disabled && 'pa-input_disabled',
    ]"
  >
    <label>
      <input
        ref="input"
        :type="type"
        :inputmode="inputmode"
        :value="value"
        :placeholder="placeholder"
        :min="min"
        :max="max"
        :step="step"
        :disabled="disabled"
        @focus="eventHandler('focus')"
        @keypress.enter="eventHandler('enter-press')"
        @keydown="eventHandler('keypress', $event)"
        @keydown.38="eventHandler('up-press', $event)"
        @keydown.40="eventHandler('down-press', $event)"
        @keyup="eventHandler('keyup', $event)"
        @paste="eventHandler('paste', $event)"
        @input="eventHandler('input', $event)"
        @blur="eventHandler('blur')"
      />
    </label>
  </div>
</template>

<script>
  const INPUT_TYPES = ['text', 'password', 'number', 'email'];
  const INPUT_MODE_TYPES = ['none', 'numeric', 'tel', 'decimal', 'email', 'url', 'search'];

  export default {
    name: 'InputBase',
    props: {
      type: {
        default: INPUT_TYPES[0],
        type: String,
        validator: (value) => INPUT_TYPES.includes(value),
      },
      inputmode: {
        default: INPUT_MODE_TYPES[0],
        type: String,
        validator: (value) => INPUT_MODE_TYPES.includes(value),
      },
      value: {
        default: '',
        required: true,
        validator: (prop) => ['string', 'number'].includes(typeof prop) || prop === null,
      },
      placeholder: {
        default: '',
        validator: (prop) => ['string'].includes(typeof prop) || prop === null,
      },
      min: {
        default: null,
        validator: (prop) => ['string', 'number'].includes(typeof prop) || prop === null,
      },
      max: {
        default: null,
        validator: (prop) => ['string', 'number'].includes(typeof prop) || prop === null,
      },
      step: {
        default: null,
        validator: (prop) => ['string', 'number'].includes(typeof prop) || prop === null,
      },
      disabled: {
        default: false,
        type: Boolean,
      },
    },
    methods: {
      resetInputState() {
        this.$forceUpdate();
      },
      setFocus() {
        this.$refs.input.focus();
      },
      eventHandler(eventName, $event) {
        const { disabled } = this;
        if (!disabled) {
          this.$emit(eventName, $event);
        }
      },
    },
  };
</script>

<style lang="scss" scoped>
  .pa-input {
    display: block;
    width: 100%;
  }
  .pa-input label {
    display: block;
    width: 100%;
  }
  .pa-input label input {
    display: block;
    width: 100%;
    font-size: 15px;
    font-weight: 500;
    color: $color-gray-05;
    border: none;
    appearance: none;
    user-select: text;
    background-color: transparent;
  }
  .pa-input_disabled input {
    color: $color-gray-03;
    cursor: not-allowed;
  }
  .pa-input input::-webkit-input-placeholder {
    font-size: 12px;
    text-transform: lowercase;
    opacity: 1;
    text-indent: 0;
    transform: translateZ(0);
    color: $color-gray-04;
    transition: text-indent 0.2s $animation-easing, opacity 0.1s $animation-easing;
  }
  .pa-input input::-moz-placeholder {
    font-size: 12px;
    text-transform: lowercase;
    opacity: 1;
    text-indent: 0;
    transform: translateZ(0);
    color: $color-gray-04;
    transition: text-indent 0.2s $animation-easing, opacity 0.1s $animation-easing;
  }
  .pa-input input:-moz-placeholder {
    font-size: 12px;
    text-transform: lowercase;
    opacity: 1;
    text-indent: 0;
    transform: translateZ(0);
    color: $color-gray-04;
    transition: text-indent 0.2s $animation-easing, opacity 0.1s $animation-easing;
  }
  .pa-input input:-ms-input-placeholder {
    font-size: 12px;
    text-transform: lowercase;
    opacity: 1;
    text-indent: 0;
    transform: translateZ(0);
    color: $color-gray-04;
    transition: text-indent 0.2s $animation-easing, opacity 0.1s $animation-easing;
  }
  .pa-input input:focus::-webkit-input-placeholder {
    opacity: 0;
    text-indent: -500px;
    transition: text-indent 0.2s $animation-easing, opacity 0.1s $animation-easing;
  }
  .pa-input input:focus::-moz-placeholder {
    opacity: 0;
    text-indent: -500px;
    transition: text-indent 0.2s $animation-easing, opacity 0.1s $animation-easing;
  }
  .pa-input input:focus:-moz-placeholder {
    opacity: 0;
    text-indent: -500px;
    transition: text-indent 0.2s $animation-easing, opacity 0.1s $animation-easing;
  }
  .pa-input input:focus:-ms-input-placeholder {
    opacity: 0;
    text-indent: -500px;
    transition: text-indent 0.2s $animation-easing, opacity 0.1s $animation-easing;
  }
</style>
