<template>
  <div class="col-10 col-sm-7 col-lg-5 col-xl-4 admin-device-name-edit">
    <div class="row">
      <div class="col-12 mb-5">
        <div class="admin-device-name-edit__title">
          {{ i18n.changeName }}
        </div>
      </div>
    </div>
    <div class="row mb-4">
      <div class="col-12">
        <AmkInput
          :value="deviceName"
          :placeholder="currentDeviceName"
          @input="deviceName = $event.target.value"
          @enter-press="submitClickHandler"
        />
      </div>
    </div>
    <div class="row">
      <div class="col-12 col-md-6 d-flex">
        <AmkButton
          class="ml-auto mr-auto"
          :block="true"
          @click="cancelClickHandler"
        >
          {{ i18n.cancel }}
        </AmkButton>
      </div>
      <div class="col-12 col-md-6 d-flex">
        <AmkButton
          class="ml-auto mr-auto"
          :block="true"
          :disabled="submitIsDisabled"
          @click="submitClickHandler"
        >
          {{ i18n.submit }}
        </AmkButton>
      </div>
    </div>
  </div>
</template>

<script>
  import get from 'lodash/get';
  import { mapGetters, mapActions } from 'vuex';
  import { REFERENCES, PRELOADER, MODAL, ADMIN, AUTH } from '~/store/types';
  import { AUTH as AUTH_ROUTE_NAMES } from '~/router/names';

  import AmkButton from '~/components/form-items/amk-button/AmkButton';
  import AmkInput from '~/components/form-items/amk-input/AmkInput';

  const PRELOADER_KEY = 'deviceNameEdit';

  export default {
    name: 'AdminDeviceNameEdit',
    components: {
      AmkInput,
      AmkButton,
    },
    data: () => ({
      deviceName: null,
    }),
    computed: {
      ...mapGetters('references', {
        i18n: REFERENCES.GET_I18N,
      }),
      ...mapGetters('admin', {
        deviceData: ADMIN.GET_DEVICE_DATA,
      }),
      currentDeviceName() {
        const { deviceData } = this;
        return get(deviceData, 'deviceName', '');
      },
      submitIsDisabled() {
        const { deviceName, currentDeviceName } = this;
        const isDeviceName = (deviceName || '').length;
        return !isDeviceName || currentDeviceName === deviceName;
      },
    },
    methods: {
      ...mapActions('auth', {
        logoutHandler: AUTH.LOGOUT_HANDLER,
      }),
      ...mapActions('modal', {
        closeModal: MODAL.HIDE_MODAL,
      }),
      ...mapActions('preloader', {
        showPreloader: PRELOADER.SHOW_PRELOADER,
        hidePreloader: PRELOADER.HIDE_PRELOADER,
      }),
      ...mapActions('admin', {
        setDeviceName: ADMIN.SET_DEVICE_NAME,
      }),
      async submitClickHandler() {
        const { deviceName, submitIsDisabled } = this;
        if (submitIsDisabled) {
          return;
        }
        this.showPreloader(PRELOADER_KEY);
        const { successes } = await this.setDeviceName(deviceName);
        this.hidePreloader(PRELOADER_KEY);
        if (!successes) {
          this.logoutAction();
        }
        this.closeModal();
      },
      cancelClickHandler() {
        this.closeModal();
      },
      async logoutAction() {
        await this.logoutHandler();
        this.$router.push({ name: AUTH_ROUTE_NAMES.auth });
      },
    },
  };
</script>

<style lang="scss" scoped>
  .admin-device-name-edit__title {
    display: block;
    font-size: 25px;
    font-weight: 500;
    color: $color-gray-01;
    text-transform: uppercase;
  }
</style>
