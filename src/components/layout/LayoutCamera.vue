<template>
  <div class="col-11 col-sm-8 layout-camera">
    <div class="layout-camera__wrapper">
      <div class="row">
        <div class="col-12 mb-5">
          <iframe
            class="layout-camera__stream"
            :src="cameraStreamLink"
          />
        </div>
        <div class="col-12">
          <a
            class="layout-camera__interface-link"
            target="_blank"
            :href="cameraLink"
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
import { REFERENCES } from '~/store/types';

const CAMERA_LINK = process.env.VUE_APP_CAMERA_LINK;
const CAMERA_STREAM_LINK = process.env.VUE_APP_CAMERA_STREAM_LINK;

export default {
  name: 'LayoutCamera',
  data: () => ({
    cameraLink: CAMERA_LINK,
    cameraStreamLink: CAMERA_STREAM_LINK,
  }),
  computed: {
    ...mapGetters('references', {
      i18n: REFERENCES.GET_I18N,
    }),
  },
};
</script>

<style lang="scss" scoped>
.layout-camera__wrapper {
  padding: 0 30px;
}
.layout-camera__stream {
  display: block;
  width: 100%;
  height: 0;
  padding-bottom: 56.25%;
  border: none;
  background: $color-gray-03;
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
