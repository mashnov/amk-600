<template>
  <div class="layout-content">
    <slot />
  </div>
</template>

<script>
  export default {
    name: 'LayoutContent',
  };
</script>

<style lang="scss" scoped>
  .layout-content {
    display: flex;
    flex-wrap: wrap;
    flex-grow: 3;
    width: 100%;
  }
</style>
