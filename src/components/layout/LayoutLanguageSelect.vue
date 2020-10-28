<template>
  <div class="col-11 col-sm-8 col-lg-6 col-xl-5 layout-language-select">
    <div class="layout-language-select__wrapper">
      <div class="row mb-4">
        <div class="col-12">
          <h2 class="layout-language-select__title">
            {{ i18n.selectLanguage }}
          </h2>
        </div>
      </div>
      <div class="row">
        <div class="col-12 col-md-4 mb-4 mb-md-0">
          <div
            class="layout-language-select__option"
            :class="currentLanguageId === 'en' && 'layout-language-select__option_selected'"
            @click="selectLanguage('en')"
          >
            <EnLanguageIcon />
          </div>
        </div>
        <div class="col-12 col-md-4 mb-4 mb-md-0">
          <div
            class="layout-language-select__option"
            :class="currentLanguageId === 'es' && 'layout-language-select__option_selected'"
            @click="selectLanguage('es')"
          >
            <EsLanguageIcon />
          </div>
        </div>
        <div class="col-12 col-md-4">
          <div
            class="layout-language-select__option"
            :class="currentLanguageId === 'ru' && 'layout-language-select__option_selected'"
            @click="selectLanguage('ru')"
          >
            <RuLanguageIcon />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import { mapGetters, mapActions } from 'vuex';
  import { REFERENCES, MODAL } from '~/store/types';

  import EnLanguageIcon from '~/assets/svg/languages-en-icon.svg';
  import EsLanguageIcon from '~/assets/svg/languages-es-icon.svg';
  import RuLanguageIcon from '~/assets/svg/languages-ru-icon.svg';

  export default {
    name: 'LayoutLanguageSelect',
    components: {
      EnLanguageIcon,
      EsLanguageIcon,
      RuLanguageIcon,
    },
    computed: {
      ...mapGetters('references', {
        i18n: REFERENCES.GET_I18N,
        currentLanguageId: REFERENCES.GET_LANGUAGE_ID,
      }),
    },
    methods: {
      ...mapActions('references', {
        selectLanguageId: REFERENCES.SET_LANGUAGE_ID,
      }),
      ...mapActions('modal', {
        closeModal: MODAL.HIDE_MODAL,
      }),
      selectLanguage(languageId) {
        this.selectLanguageId(languageId);
        this.closeModal();
      },
    },
  };
</script>

<style lang="scss" scoped>
  .layout-language-select__wrapper {
    padding: 0 30px;
  }
  .layout-language-select__title {
    display: block;
    font-size: 25px;
    font-weight: 500;
    color: $color-gray-01;
    text-align: center;
  }
  .layout-language-select__option {
    display: block;
    border-radius: 10px;
    overflow: hidden;
    opacity: 0.5;
    transition: opacity $animation-time-01 $animation-easing, transform $animation-time-01 $animation-easing;
    transform: scale(1);
    cursor: pointer;
    margin: 0 auto;
    max-width: 120px;
  }
  .layout-language-select__option_selected {
    opacity: 1;
    transform: scale(1.1);
  }
  .layout-language-select__option:hover {
    opacity: 1;
    transform: scale(1.1);
  }
  .layout-language-select__option svg {
    display: block;
    width: 100%;
  }
  @media (min-width: $screen-md) {
    .layout-language-select__option {
      max-width: unset;
    }
  }
</style>
