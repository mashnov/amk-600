<template>
  <div class="user-moment-wind-item">
    <div class="user-moment-wind-item__title">
      {{ title }}
    </div>
    <div class="user-moment-wind-item__value">
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
    name: 'UserMomentWindItem',
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
  .user-moment-wind-item__title {
    display: block;
    font-weight: 300;
    font-size: 12px;
    line-height: 15px;
    color: $color-gray-01;
    text-transform: capitalize;
    margin-bottom: 5px;
    text-align: right;
  }
  .user-moment-wind-item__value {
    display: block;
    width: 100%;
    font-weight: 600;
    font-size: 28px;
    line-height: 28px;
    color: $color-gray-01;
    text-align: right;
    white-space: nowrap;
  }
  .user-moment-wind-item__value span {
    display: inline-block;
    vertical-align: top;
    font-weight: 300;
    font-size: 16px;
    line-height: 20px;
    color: $color-gray-01;
  }
  @media (min-width: $screen-sm) {
    .user-moment-wind-item__title {
      text-align: left;
    }
    .user-moment-wind-item__value {
      text-align: left;
    }
  }
  @media (min-width: $screen-sm) {
    .user-moment-wind-item__value {
      font-size: 30px;
      line-height: 30px;
    }
  }
  @media (min-width: $screen-md) {
    .user-moment-wind-item__value {
      font-size: 40px;
      line-height: 40px;
    }
  }
  @media (min-width: $screen-lg) {
    .user-moment-wind-item__value {
      font-size: 35px;
      line-height: 35px;
    }
  }
</style>
