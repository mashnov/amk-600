<template>
  <div class="col-10 col-sm-7 col-lg-5 col-xl-4 admin-anemometer-params-edit">
    <div class="row">
      <div class="col-12 mb-5">
        <div class="admin-anemometer-params-edit__title">
          {{ i18n.setWindParams }}
        </div>
      </div>
    </div>
    <div class="row mb-4">
      <div class="col-12">
        <span class="admin-anemometer-params-edit__subtitle">
          {{ i18n.windCorrection }} {{ i18n.degreeUnit }}
        </span>
        <AmkInput
          type="number"
          :step="0.01"
          min="-360"
          max="360"
          :value="windCorrection"
          :placeholder="(currentWindCorrection || '').toString()"
          @input="windCorrection = $event.target.value"
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

  const PRELOADER_KEY = 'AdminAnemometerParamsEdit';

  export default {
    name: 'AdminAnemometerParamsEdit',
    components: {
      AmkInput,
      AmkButton,
    },
    data: () => ({
      windCorrection: null,
    }),
    computed: {
      ...mapGetters('references', {
        i18n: REFERENCES.GET_I18N,
      }),
      ...mapGetters('admin', {
        deviceData: ADMIN.GET_DEVICE_DATA,
      }),
      currentWindCorrection() {
        const { deviceData } = this;
        return get(deviceData, 'calibration.wind', 0);
      },
      submitIsDisabled() {
        const { windCorrection, currentWindCorrection } = this;
        const isWindCorrection = (windCorrection || '').length;
        return !isWindCorrection || currentWindCorrection === windCorrection;
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
        setWindCorrection: ADMIN.SET_WIND_CORRECTION,
      }),
      async submitClickHandler() {
        const { windCorrection, submitIsDisabled } = this;
        if (submitIsDisabled) {
          return;
        }
        this.showPreloader(PRELOADER_KEY);
        const { successes } = await this.setWindCorrection({ windCorrection });
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
  .admin-anemometer-params-edit__title {
    display: block;
    font-size: 25px;
    font-weight: 500;
    color: $color-gray-01;
    text-transform: uppercase;
  }
  .admin-anemometer-params-edit__subtitle {
    display: block;
    font-size: 13px;
    color: $color-gray-01;
    text-transform: uppercase;
    margin-bottom: 10px;
  }
</style>
