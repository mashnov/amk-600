<template>
  <div class="col-11 col-sm-8 col-lg-6 col-xl-5 layout-documentation">
    <div class="layout-documentation__wrapper">
      <div class="row mb-4">
        <div class="col-12">
          <h2 class="layout-documentation__title">
            {{ i18n.selectDocumentationLanguage }}
          </h2>
        </div>
      </div>
      <div class="row">
        <div class="col-12 col-md-4 mb-4 mb-md-0">
          <a
            target="_blank"
            :href="getDocumentationLink('en')"
            class="layout-documentation__option"
          >
            <EnLanguageIcon />
          </a>
          <span class="layout-documentation__option-title">
            english
          </span>
        </div>
        <div class="col-12 col-md-4 mb-4 mb-md-0">
          <a
            target="_blank"
            :href="getDocumentationLink('es')"
            class="layout-documentation__option"
          >
            <EsLanguageIcon />
          </a>
          <span class="layout-documentation__option-title">
            español
          </span>
        </div>
        <div class="col-12 col-md-4">
          <a
            target="_blank"
            :href="getDocumentationLink('ru')"
            class="layout-documentation__option"
          >
            <RuLanguageIcon />
          </a>
          <span class="layout-documentation__option-title">
            русский
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import { REFERENCES } from '~/store/types';

import EnLanguageIcon from '~/assets/svg/languages-en-icon.svg';
import EsLanguageIcon from '~/assets/svg/languages-es-icon.svg';
import RuLanguageIcon from '~/assets/svg/languages-ru-icon.svg';

export default {
  name: 'LayoutDocumentation',
  components: {
    EnLanguageIcon,
    EsLanguageIcon,
    RuLanguageIcon,
  },
  computed: {
    ...mapGetters('references', {
      i18n: REFERENCES.GET_I18N,
    }),
  },
  methods: {
    getDocumentationLink(languageId) {
      return `/documentation/${languageId}.pdf`;
    },
  },
};
</script>

<style lang="scss" scoped>
.layout-documentation__wrapper {
  padding: 0 30px;
}
.layout-documentation__title {
  display: block;
  font-size: 25px;
  font-weight: 500;
  color: $color-gray-01;
  text-align: center;
}
.layout-documentation__option {
  display: block;
  border-radius: 10px;
  overflow: hidden;
  opacity: 0.9;
  transition: opacity $animation-time-01 $animation-easing, transform $animation-time-01 $animation-easing;
  transform: scale(1);
  cursor: pointer;
  margin: 0 auto;
  max-width: 120px;
}
.layout-documentation__option:hover {
  opacity: 1;
  transform: scale(1.1);
}
.layout-documentation__option svg {
  display: block;
  width: 100%;
}
.layout-documentation__option-title {
  display: block;
  width: 100%;
  text-align: center;
  font-size: 12px;
  font-weight: 500;
  color: $color-gray-01;
  text-transform: uppercase;
  margin-top: 15px;
}
@media (min-width: $screen-md) {
  .layout-documentation__option {
    max-width: unset;
  }
  .layout-report-select__option-title {
    font-size: 15px;
  }
}
</style>
