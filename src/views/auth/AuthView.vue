<template>
  <div class="auth-view">
    <div class="container">
      <AuthPage />
    </div>
  </div>
</template>

<script>
  import AuthPage from '~/components/auth/AuthPage';

  export default {
    name: 'AuthView',
    components: {
      AuthPage,
    },
  };
</script>

<style lang="scss" scoped>
  .auth-view {
    display: flex;
    align-items: center;
    width: 100%;
    height: 100%;
  }
</style>
