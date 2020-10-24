<template>
  <div
    class="amk-select"
    :class="[
      disabled && 'amk-select_disabled',
    ]"
  >
    <label>
      <select
        ref="select"
        :value="value"
        :disabled="disabled"
        @input="eventHandler('input', $event)"
      >

      </select>
    </label>
  </div>
</template>

<script>

  export default {
    name: 'AmkSelect',
    props: {
      value: {
        default: '',
        required: true,
        validator: (prop) => ['string', 'number'].includes(typeof prop) || prop === null,
      },
      options: {
        type: Array,
        required: true,
        default: () => ([]),
      },
      disabled: {
        default: false,
        type: Boolean,
      },
    },
    methods: {
      resetSelectState() {
        this.$forceUpdate();
      },
      setFocus() {
        this.$refs.select.focus();
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
  .amk-select {
    display: block;
    width: 100%;
    background-color: $color-gray-01;
    border-radius: 5px;
    padding: 10px;
  }
  .amk-select label {
    display: block;
    width: 100%;
  }
</style>
