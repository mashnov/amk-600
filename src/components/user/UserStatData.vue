<template>
  <div class="user-stat-data">
    <div class="row">
      <div class="col-12 col-lg-9 mb-4 mb-lg-0">
        <div class="row">
          <div class="col-12">
            <div class="user-stat-data__title">
              {{ i18n.windData10 }}
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-12">
            <div class="user-stat-data__wrapper">
              <div class="row">
                <div class="col-12 col-sm-6 col-md-3 mb-4 mb-md-0">
                  <UserStatDataItem
                    :title="i18n.verticalSpeedTitle"
                    :value="statData.windSpeed"
                    :unit="i18n.windUnit"
                  />
                </div>
                <div class="col-12 col-sm-6 col-md-3 mb-4 mb-md-0">
                  <UserStatDataItem
                    :title="i18n.horizontalSpeedTitle"
                    :value="statData.windHorizontalSpeed"
                    :unit="i18n.windUnit"
                  />
                </div>
                <div class="col-12 col-sm-6 col-md-3 mb-4 mb-sm-0">
                  <UserStatDataItem
                    :title="i18n.maxWindTitle"
                    :value="statData.windMaxSpeed"
                    :unit="i18n.windUnit"
                  />
                </div>
                <div class="col-12 col-sm-6 col-md-3 mb-4 mb-sm-0">
                  <UserStatDataItem
                    :title="i18n.directionTitle"
                    :value="statData.windDirection"
                    :unit="i18n.degreeUnit"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="col-12 col-lg-3">
        <div class="row">
          <div class="col-12">
            <div class="user-stat-data__title">
              {{ i18n.dewPointTitle }}
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-12">
            <div class="user-stat-data__wrapper">
              <div class="row">
                <div class="col-12">
                  <UserStatDataItem
                    :title="i18n.dewPointTitle"
                    :value="statData.dewPoint"
                    :unit="i18n.degreeUnit"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex';
  import { REFERENCES, USER } from '~/store/types';

  import UserStatDataItem from './UserStatDataItem';

  export default {
    name: 'UserStatData',
    components: {
      UserStatDataItem,
    },
    computed: {
      ...mapGetters('references', {
        i18n: REFERENCES.GET_I18N,
      }),
      ...mapGetters('user', {
        statData: USER.GET_STAT_DATA,
      }),
    },
  };
</script>

<style lang="scss" scoped>
  .user-stat-data__title {
    display: block;
    font-weight: 300;
    font-size: 16px;
    line-height: 20px;
    color: $color-gray-01;
    text-transform: uppercase;
    margin-bottom: 10px;
  }
  .user-stat-data__wrapper {
    display: block;
    padding: 25px;
    background: $color-gray-06;
    box-shadow: 0 8px 24px $sensor-shadow-color;
    border-radius: 5px;
  }
</style>
