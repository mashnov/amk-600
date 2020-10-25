<template>
  <div class="col-10 col-sm-6 col-lg-6 col-xl-5 layout-report-select">
    <div class="layout-report-select__wrapper">
      <div class="row mb-5">
        <div class="col-12">
          <h2 class="layout-report-select__title">
            {{ i18n.reportSelect_ModalTitle }}
          </h2>
        </div>
      </div>
      <div class="row">
        <div class="col-12 col-md-4 mb-4 mb-md-0">
          <a
            :href="getReportLink('week')"
            target="_blank"
            class="layout-report-select__option"
            @click="optionClickHandler"
          >
            <ReportIcon />
            <span class="layout-report-select__option-title">
              {{ i18n.reportSelect_OptionWeek }}
            </span>
          </a>
        </div>
        <div class="col-12 col-md-4 mb-4 mb-md-0">
          <a
            :href="getReportLink('month')"
            target="_blank"
            class="layout-report-select__option"
            @click="optionClickHandler"
          >
            <ReportIcon />
            <span class="layout-report-select__option-title">
              {{ i18n.reportSelect_OptionMonth }}
            </span>
          </a>
        </div>
        <div class="col-12 col-md-4">
          <a
            :href="getReportLink('year')"
            target="_blank"
            class="layout-report-select__option"
            @click="optionClickHandler"
          >
            <ReportIcon />
            <span class="layout-report-select__option-title">
              {{ i18n.reportSelect_OptionYear }}
            </span>
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import { mapGetters, mapActions } from 'vuex';
  import { REFERENCES, MODAL, AUTH } from '~/store/types';
  import { reports } from '~/store/request-url';
  import { replaceCurly } from '~/helpers/system';

  import ReportIcon from '~/assets/svg/report-icon.svg';

  export default {
    name: 'LayoutReportSelect',
    components: {
      ReportIcon,
    },
    computed: {
      ...mapGetters('auth', {
        userToken: AUTH.GET_USER_TOKEN,
      }),
      ...mapGetters('references', {
        i18n: REFERENCES.GET_I18N,
      }),
    },
    methods: {
      ...mapActions('modal', {
        closeModal: MODAL.HIDE_MODAL,
      }),
      optionClickHandler() {
        this.closeModal();
      },
      getReportLink(range) {
        const { userToken } = this;
        const apiUrl = reports.downloadLink;
        return replaceCurly(apiUrl, ['userToken', 'range'], [userToken, range]);
      },
    },
  };
</script>

<style lang="scss" scoped>
  .layout-report-select__wrapper {
    padding: 0 30px;
  }
  .layout-report-select__title {
    display: block;
    font-size: 18px;
    font-weight: 500;
    color: $color-gray-01;
    text-align: center;
  }
  .layout-report-select__option {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    cursor: pointer;
    margin: 0 auto;
  }
  .layout-report-select__option svg {
    display: block;
    width: 40px;
    color: $color-gray-01;
    opacity: 0.5;
    transform: scale(1);
    transition: opacity $animation-time-01 $animation-easing, transform $animation-time-01 $animation-easing;
  }
  .layout-report-select__option:hover svg {
    opacity: 1;
    transform: scale(1.1);
  }
  .layout-report-select__option-title {
    display: block;
    font-size: 12px;
    font-weight: 500;
    color: $color-gray-01;
    margin-left: 10px;
  }
  @media (min-width: $screen-md) {
    .layout-report-select__option {
      display: block;
    }
    .layout-report-select__option svg {
      width: 100%;
      max-width: 100px;
      margin: 0 auto;
    }
    .layout-report-select__option-title {
      text-align: center;
      margin-top: 15px;
      margin-left: 0;
      font-size: 15px;
    }
  }
</style>
