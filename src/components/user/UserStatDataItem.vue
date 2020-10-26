<template>
  <div class="user-stat-data-item">
    <div class="user-stat-data-item__title">
      {{ title }}
    </div>
    <div class="user-stat-data-item__value">
      {{ value || 0 }}
      <span>
        {{ unit }}
      </span>
    </div>
  </div>
</template>

<script>
  const VALUE_TYPES = ['string', 'number'];
  const UNIT_TYPES = ['string'];
  const TITLE_TYPES = ['string'];

  export default {
    name: 'UserStatDataItem',
    props: {
      title: {
        default: null,
        required: true,
        validator: (prop) => TITLE_TYPES.includes(typeof prop) || prop === null,
      },
      unit: {
        default: null,
        required: true,
        validator: (prop) => UNIT_TYPES.includes(typeof prop) || prop === null,
      },
      value: {
        default: null,
        required: true,
        validator: (prop) => VALUE_TYPES.includes(typeof prop) || prop === null,
      },
    },
  };
</script>

<style lang="scss" scoped>
  .user-stat-data-item__title {
    display: block;
    font-weight: 300;
    font-size: 12px;
    line-height: 15px;
    color: $color-gray-01;
    text-transform: capitalize;
    margin-bottom: 5px;
    text-align: right;
  }
  .user-stat-data-item__value {
    display: block;
    width: 100%;
    font-weight: 600;
    font-size: 48px;
    line-height: 48px;
    color: $color-gray-01;
    text-align: right;
    white-space: nowrap;
  }
  .user-stat-data-item__value span {
    display: inline-block;
    vertical-align: top;
    font-weight: 300;
    font-size: 16px;
    line-height: 20px;
    color: $color-gray-01;
  }
</style>
