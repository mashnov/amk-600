<template>
  <div class="col-10 col-sm-7 col-lg-5 col-xl-4 admin-compas-params-edit">
    <div class="row">
      <div class="col-12 mb-5">
        <div class="admin-compas-params-edit__title">
          {{ i18n.setCompassParams }}
        </div>
      </div>
    </div>
    <div class="row mb-4">
      <div class="col-12">
        <span class="admin-compas-params-edit__subtitle">
          {{ i18n.compassCorrection }} {{ i18n.degreeUnit }}
        </span>
        <AmkInput
          type="number"
          :step="0.01"
          :value="compassCorrection"
          :placeholder="(currentCompassCorrection || '').toString()"
          @input="compassCorrection = $event.target.value"
          @enter-press="submitClickHandler"
        />
      </div>
    </div>
    <div class="row mb-5">
      <div class="col-12">
        <AmkCheckbox
          :value="compassForWindCorrection"
          @input="setWindCorrectionHandler"
        >
          {{ i18n.compassForWindCorrection }}
        </AmkCheckbox>
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
  import AmkCheckbox from '~/components/form-items/amk-checkbox/AmkCheckbox';
  import AmkInput from '~/components/form-items/amk-input/AmkInput';

  const PRELOADER_KEY = 'AdminCompassParamsEdit';

  export default {
    name: 'AdminCameraPortEdit',
    components: {
      AmkInput,
      AmkCheckbox,
      AmkButton,
    },
    data: () => ({
      compassForWindCorrection: false,
      compassCorrection: null,
    }),
    computed: {
      ...mapGetters('references', {
        i18n: REFERENCES.GET_I18N,
      }),
      ...mapGetters('admin', {
        deviceData: ADMIN.GET_DEVICE_DATA,
      }),
      currentCompassCorrection() {
        const { deviceData } = this;
        return get(deviceData, 'calibration.compass', 0);
      },
      submitIsDisabled() {
        const { compassCorrection, currentCompassCorrection } = this;
        const isCompassCorrection = (compassCorrection || '').length;
        return !isCompassCorrection || currentCompassCorrection === compassCorrection;
      },
    },
    watch: {
      deviceData: {
        deep: true,
        immediate: true,
        handler() {
          this.setCorrectionValue();
        },
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
        setCompassCorrection: ADMIN.SET_COMPASS_PARAMS,
        setWindCorrection: ADMIN.SET_WIND_PARAMS,
      }),
      setCorrectionValue() {
        const { deviceData } = this;
        this.compassCorrection = get(deviceData, 'calibration.compass', 0);
        this.compassForWindCorrection = get(deviceData, 'calibration["wind.compassbias"]', false);
      },
      async setWindCorrectionHandler(windCorrection) {
        this.showPreloader(PRELOADER_KEY);
        await this.setWindCorrection({ windCorrection });
        this.compassForWindCorrection = windCorrection;
        this.hidePreloader(PRELOADER_KEY);
      },
      async submitClickHandler() {
        const { compassCorrection, submitIsDisabled } = this;
        if (submitIsDisabled) {
          return;
        }
        this.showPreloader(PRELOADER_KEY);
        const { successes } = await this.setCompassCorrection({ compassCorrection });
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
  .admin-compas-params-edit__title {
    display: block;
    font-size: 25px;
    font-weight: 500;
    color: $color-gray-01;
    text-transform: uppercase;
  }
  .admin-compas-params-edit__subtitle {
    display: block;
    font-size: 13px;
    color: $color-gray-01;
    text-transform: uppercase;
    margin-bottom: 10px;
  }
</style>
