<template>
  <transition
    appear
    name="fade-in"
  >
    <div
      v-if="isVisible"
      class="preloader"
      :class="[
        blurIsSupport && 'preloader_blur',
        !blurIsSupport && 'preloader_opacity',
      ]"
    >
      <PreloaderIcon />
    </div>
  </transition>
</template>

<script>
  import { mapGetters } from 'vuex';
  import { LOGGER, PRELOADER } from '~/store/types';
  import PreloaderIcon from '~/assets/svg/preloader-icon.svg';

  export default {
    name: 'Preloader',
    components: {
      PreloaderIcon,
    },
    computed: {
      ...mapGetters('logger', {
        blurIsSupport: LOGGER.GET_BLUR_IS_SUPPORT,
      }),
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
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 20;
  }
  .preloader_blur {
    backdrop-filter: blur(2px);
    background-color: rgba($color-black-01, 0.2);
  }
  .preloader_opacity {
    background-color: rgba($color-black-01, 0.4);
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
