<template>
  <div class="col-11 col-sm-9 col-lg-8 col-xl-6 layout-devise-position">
    <div class="row">
      <div class="col-12">
        <div class="layout-devise-position__wrapper">
          <ScreenRotateImage />
          <span>
            {{ i18n.orientationWarning }}
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import { mapGetters, mapActions } from 'vuex';
  import { REFERENCES, VIEWPORT, MODAL } from '~/store/types';

  import ScreenRotateImage from '~/assets/svg/screen-rotate-image.svg';

  export default {
    name: 'LayoutDevicePosition',
    components: {
      ScreenRotateImage,
    },
    computed: {
      ...mapGetters('viewport', {
        viewportWidth: VIEWPORT.GET_VIEWPORT_WIDTH,
        viewportHeight: VIEWPORT.GET_VIEWPORT_HEIGHT,
      }),
      ...mapGetters('references', {
        i18n: REFERENCES.GET_I18N,
      }),
      screenProportion() {
        const { viewportWidth, viewportHeight } = this;
        return Math.floor(viewportWidth / viewportHeight);
      },
    },
    watch: {
      screenProportion: {
        immediate: true,
        handler() {
          this.hideDevicePositionModal();
        },
      },
    },
    methods: {
      ...mapActions('modal', {
        hideModal: MODAL.HIDE_MODAL,
      }),
      hideDevicePositionModal() {
        const { screenProportion } = this;
        if (screenProportion > 0) {
          this.hideModal();
        }
      },
    },
  };
</script>

<style lang="scss" scoped>
  .layout-devise-position__wrapper svg {
    display: block;
    width: 100%;
    max-width: 150px;
    color: $color-gray-01;
    margin: 0 auto 40px auto;
  }
  .layout-devise-position__wrapper span {
    display: block;
    text-align: center;
    font-size: 17px;
    font-weight: 500;
    color: $color-gray-01;
  }
</style>
