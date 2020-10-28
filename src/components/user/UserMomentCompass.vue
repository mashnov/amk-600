<template>
  <div class="user-moment-compass">
    <div class="user-moment-compass__image">
      <CompassImage />
    </div>
    <div
      class="user-moment-compass__arrow"
      :style="directionStyles"
    />
  </div>
</template>

<script>
  import CompassImage from '~/assets/svg/compass-image.svg';

  const VALUE_TYPES = ['string', 'number'];

  export default {
    name: 'UserMomentCompass',
    components: {
      CompassImage,
    },
    props: {
      value: {
        default: null,
        required: true,
        validator: (prop) => VALUE_TYPES.includes(typeof prop) || prop === null,
      },
    },
    computed: {
      directionStyles() {
        const { value } = this;
        const parsedValue = parseInt(value);
        const rotateValue = parsedValue ? `${parsedValue}deg` : '0';
        return {
          transform: `rotate(${rotateValue})`,
        };
      },
    },
  };
</script>

<style lang="scss" scoped>
  .user-moment-compass {
    position: relative;
    max-width: 240px;
    margin: auto;
  }
  .user-moment-compass:after {
    content: '';
    position: absolute;
    width: 40%;
    height: 40%;
    top: 50%;
    left: 50%;
    transform: translateX(-50%) translateY(-50%);
    background-color: rgba($color-violet-02, 0.7);
    border-radius: 100%;
    z-index: 1;
  }
  .user-moment-compass__image{
    position: relative;
    z-index: 2;
  }
  .user-moment-compass__image svg {
    position: relative;
    display: block;
    width: 100%;
    margin: 0;
    color: $color-gray-01;
    background-color: transparent;
  }
  .user-moment-compass__arrow {
    position: absolute;
    height: 30%;
    left: calc(50% - 1px);
    top: calc(20% - 1px);
    width: 4px;
    transform-origin: 50% 100%;
    background: #79BFE9;
    border-radius: 100% 100% 0 0;
    transition: transform 0.15s linear;
    z-index: 3;
  }
  .user-moment-compass__arrow:before {
    content: '';
    position: absolute;
    width: 8px;
    height: 8px;
    border-radius: 100%;
    bottom: -3px;
    left: -2px;
    background: #79BFE9;
  }
</style>
