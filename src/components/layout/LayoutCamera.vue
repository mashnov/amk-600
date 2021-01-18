<template>
  <div
    class="layout-camera"
    :class="[
      fullScreen && 'col-12',
      !fullScreen && 'col-11 col-sm-8',
    ]"
  >
    <div
      v-tooltip.right="{ content: i18n.fullScreen, offset: 15 }"
      class="layout-camera__resize"
      @click="fullScreenClickHandler"
    >
      <ResizeIcon />
    </div>
    <div class="layout-camera__wrapper">
      <div class="row">
        <div class="col-12 mb-5">
          <div class="layout-camera__stream">
            <iframe :src="cameraStreamUrl" />
          </div>
        </div>
        <div class="col-12">
          <a
            class="layout-camera__interface-link"
            target="_blank"
            :href="cameraInterfaceUrl"
          >
            {{ i18n.cameraInterfaceLink }}
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import { REFERENCES, USER } from '~/store/types';

import ResizeIcon from '~/assets/svg/resize-icon.svg';

const API_URL = process.env.VUE_APP_API_URL;

export default {
  name: 'LayoutCamera',
  components: {
    ResizeIcon,
  },
  data: () => ({
    fullScreen: false,
  }),
  computed: {
    ...mapGetters('references', {
      i18n: REFERENCES.GET_I18N,
    }),
    ...mapGetters('user', {
      cameraData: USER.GET_CAMERA_DATA,
    }),
    cameraStreamUrl() {
      const { cameraData } = this;
      return cameraData.streamUrl;
    },
    cameraInterfaceUrl() {
      const { cameraData } = this;
      return `${API_URL}:${cameraData.interfacePort}`;
    },
  },
  methods: {
    fullScreenClickHandler() {
      const { fullScreen } = this;
      this.fullScreen = !fullScreen;
    },
  },
};
</script>

<style lang="scss" scoped>
.layout-camera__resize {
  position: absolute;
  top: 18px;
  left: 18px;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  width: 20px;
  cursor: pointer;
  z-index: 2;
  transition: transform $animation-easing $animation-time-01;
}
.layout-camera__resize:hover {
  transform: scale(1.2);
}
.layout-camera__resize svg {
  display: block;
  width: 100%;
  margin: auto;
  color: $color-gray-01;
}
.layout-camera__wrapper {
  padding: 0 30px;
}
.layout-camera__stream {
  position: relative;
  display: block;
  width: 100%;
  height: 0;
  padding-bottom: 56.25%;
  background: $color-gray-03;
}
.layout-camera__stream iframe {
  position: absolute;
  border: none;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  z-index: 1;
}
.layout-camera__interface-link {
  font-weight: 300;
  font-size: 16px;
  line-height: 24px;
  color: $color-gray-01;
  text-transform: capitalize;
  float: right;
}
.layout-camera__interface-link:hover {
  text-decoration: underline;
}
</style>
