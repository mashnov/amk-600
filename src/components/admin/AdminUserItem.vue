<template>
  <div
    class="admin-user-item"
    @click="itemClickHandler"
  >
    <div class="admin-user-item__title">
      <StarIcon v-if="user.isAdmin" />
      <span>
        {{ user.username }}
      </span>
    </div>
  </div>
</template>

<script>
  import StarIcon from '~/assets/svg/star-icon.svg';

  export default {
    name: 'AdminUserItem',
    components: {
      StarIcon,
    },
    props: {
      user: {
        type: Object,
        default: () => ({}),
      },
    },
    methods: {
      itemClickHandler() {
        this.$emit('select-user');
      },
    },
  };
</script>

<style lang="scss" scoped>
  .admin-user-item {
    display: block;
    width: 100%;
    padding: 15px;
    background: rgba($color-gray-06, 0.6);
    border-radius: 5px;
    cursor: pointer;
    transition: background-color $animation-time-01 $animation-easing, box-shadow $animation-time-01 $animation-easing;
  }
  .admin-user-item:hover {
    background: $color-gray-05;
    box-shadow: inset 0 0 10px $sensor-shadow-color;
  }
  .admin-user-item__title {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    text-transform: uppercase;
  }
  .admin-user-item__title svg {
    width: 30px;
    margin-right: 20px;
    color: rgba($color-green-01, 0.7);
  }
  .admin-user-item__title span {
    font-weight: 500;
    font-size: 16px;
    line-height: 30px;
    color: $color-gray-01;
  }
</style>
