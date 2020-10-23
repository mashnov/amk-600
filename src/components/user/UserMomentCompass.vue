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
  }
  .user-moment-compass:after {
    content: '';
    position: absolute;
    width: 50px;
    height: 50px;
    top: calc(50% - 23px);
    left: calc(50% - 25px);
    background-color: $color-violet-02;
    border-radius: 50%;
    z-index: -1;
  }
  .user-moment-compass__image svg {
    display: block;
    width: 100%;
    margin: 0;
    color: $color-gray-01;
  }
  .user-moment-compass__arrow {
    position: absolute;
    height: 30%;
    left: calc(50% - 1px);
    top: calc(20% + 4px);
    width: 4px;
    transform-origin: 50% 100%;
    background: #79BFE9;
    border-radius: 100% 100% 0 0;
    transition: transform $animation-time-03 $animation-easing;
  }
  .user-moment-compass__arrow:before {
    content: '';
    position: absolute;
    width: 8px;
    height: 8px;
    border-radius: 50%;
    bottom: -3px;
    left: -2px;
    background: #79BFE9;
  }
</style>
