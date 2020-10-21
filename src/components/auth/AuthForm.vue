<template>
  <div class="auth-form">
    <div class="row mb-5">
      <div class="col-12">
        <h2 class="auth-form__title">
          {{ i18n.loginForm_title }}
        </h2>
      </div>
    </div>
    <div class="row mb-3">
      <div class="col-12">
        <span class="auth-form__label">
          {{ i18n.loginForm_username }}
        </span>
        <AmkInput
          :value="username"
          :placeholder="i18n.loginForm_username"
          @input="username = $event.target.value"
          @enter-press="submitClickHandler"
          @focus="loginError = false"
        />
      </div>
    </div>
    <div class="row">
      <div class="col-12">
        <span class="auth-form__label">
          {{ i18n.loginForm_password }}
        </span>
        <AmkInput
          :value="password"
          :placeholder="i18n.loginForm_password"
          type="password"
          @input="password = $event.target.value"
          @enter-press="submitClickHandler"
          @focus="loginError = false"
        />
      </div>
    </div>
    <transition
      appear
      name="fade-in"
    >
      <div
        class="row mt-4"
        v-if="loginError"
      >
        <div class="col-12">
          <p class="auth-form__error-message">
            {{ i18n.loginForm_errorMessage }}
          </p>
        </div>
      </div>
    </transition>
    <div class="row mt-4">
      <div class="col-12 d-flex justify-content-center">
        <AmkButton
          :disabled="formIsDisabled"
          @click="submitClickHandler"
        >
          {{ i18n.loginForm_submit }}
        </AmkButton>
      </div>
    </div>
  </div>
</template>

<script>
  import { mapGetters, mapActions } from 'vuex';
  import { REFERENCES, AUTH, PRELOADER } from '~/store/types';
  import { USER as USER_ROUTE_NAMES, ADMIN as ADMIN_ROUTE_NAMES } from '~/router/names';

  import AmkInput from '~/components/form-items/amk-input/AmkInput';
  import AmkButton from '~/components/form-items/amk-button/AmkButton';

  const PRELOADER_KEY = 'login';
  const REDIRECT_NAME_MAPPER = {
    user: USER_ROUTE_NAMES.user,
    admin: ADMIN_ROUTE_NAMES.admin,
  };

  export default {
    name: 'AuthForm',
    components: {
      AmkInput,
      AmkButton,
    },
    data: () => ({
      loginError: false,
      username: '',
      password: '',
    }),
    computed: {
      ...mapGetters('references', {
        i18n: REFERENCES.GET_I18N,
      }),
      formIsDisabled() {
        const { username, password } = this;
        const usernameIsCorrect = username.length > 3;
        const passwordIsCorrect = password.length > 3;
        return !usernameIsCorrect || !passwordIsCorrect;
      },
    },
    methods: {
      ...mapActions('auth', {
        authHandler: AUTH.LOGIN_HANDLER,
      }),
      ...mapActions('preloader', {
        showPreloader: PRELOADER.SHOW_PRELOADER,
        hidePreloader: PRELOADER.HIDE_PRELOADER,
      }),
      async submitClickHandler() {
        const { formIsDisabled, username, password } = this;
        if (formIsDisabled) {
          return;
        }
        this.showPreloader(PRELOADER_KEY);
        const { successes, group } = await this.authHandler({ username, password });
        this.hidePreloader(PRELOADER_KEY);
        if (successes) {
          this.$router.push({ name: REDIRECT_NAME_MAPPER[group] });
        }
        if (!successes) {
          this.loginError = true;
        }
      },
    },
  };
</script>

<style lang="scss" scoped>
  .auth-form {
    display: block;
    width: 100%;
    padding: 50px 25px;
    margin: 50px 0;
    border-radius: 5px;
    background-color: $color-gray-02;
    box-shadow: 0 8px 24px $color-overlay;
  }
  .auth-form__title {
    display: block;
    font-size: 25px;
    font-weight: 500;
    color: $color-gray-01;
  }
  .auth-form__label {
    display: block;
    font-size: 11px;
    font-weight: 500;
    color: $color-gray-01;
    margin-bottom: 10px;
  }
  .auth-form__error-message {
    display: block;
    width: 100%;
    font-size: 11px;
    font-weight: 500;
    color: $color-red-02;
    padding: 10px;
    text-align: center;
    border-radius: 5px;
    background-color: $color-red-01;
  }
</style>
