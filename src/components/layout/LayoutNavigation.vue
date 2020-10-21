<template>
  <div class="layout-wrapper">
    <slot />
  </div>
</template>

<script>
  export default {
    name: 'LayoutWrapper',
  };
</script>

<style lang="scss" scoped>
  .layout-wrapper {
    display: flex;
    flex-wrap: wrap;
    flex-direction: column;
    flex-grow: 3;
    width: 100%;
  }
</style>
