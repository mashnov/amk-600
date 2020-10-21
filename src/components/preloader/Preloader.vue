<template>
  <transition
    appear
    name="fade-in"
  >
    <div
      v-if="isVisible"
      class="preloader"
    >
      <PreloaderIcon />
    </div>
  </transition>
</template>

<script>
  import { mapGetters } from 'vuex';
  import { PRELOADER } from '~/store/types';
  import PreloaderIcon from '~/assets/svg/preloader-icon.svg';

  export default {
    name: 'Preloader',
    components: {
      PreloaderIcon,
    },
    computed: {
      ...mapGetters('preloader', {
        isVisible: PRELOADER.PRELOADER_IS_VISIBLE,
      }),
    },
  };
</script>

<style lang="scss" scoped>
  .preloader {
    position: fixed;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    background-color: $color-overlay;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 12;
    transition: opacity $animation-time-03 $animation-easing;
  }
  .preloader svg {
    display: block;
    width: 120px;
    margin: 0 auto;
    color: $color-gray-01;
    will-change: transform;
    animation: preloader 3s linear infinite;
  }
</style>
