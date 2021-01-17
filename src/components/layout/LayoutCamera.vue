<template>
  <div class="col-11 col-sm-8 layout-camera">
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

const API_URL = process.env.VUE_APP_API_URL;

export default {
  name: 'LayoutCamera',
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
};
</script>

<style lang="scss" scoped>
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
