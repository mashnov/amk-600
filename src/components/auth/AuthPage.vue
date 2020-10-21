<template>
  <div class="row justify-content-md-center auth-page">
    <div class="col-12 col-md-6 col-lg-4">
      <AuthForm />
    </div>
  </div>
</template>

<script>
  import AuthForm from './AuthForm';

  export default {
    name: 'AuthPage',
    components: {
      AuthForm,
    },
  };
</script>
