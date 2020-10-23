<template>
  <div class="user-moment-wind">
    <div class="user-moment-wind__title">
      {{ i18n.momentData_windSensorTitle }}
    </div>
    <div class="user-moment-wind__wrapper">
      <div class="row d-sm-flex align-items-center">
        <div class="col-12 col-sm-5 mb-3 mb-sm-0">
          <div class="row mb-4">
            <div class="col-12">
              <div class="user-moment-wind__sensor-title">
                {{ i18n.momentData_windVerticalTitle }}
              </div>
              <div class="user-moment-wind__sensor-value">
                {{ momentData.windVerticalSpeed || 0 }}
                <span>
                  {{ i18n.momentData_windVerticalUnit }}
                </span>
              </div>
            </div>
          </div>
          <div class="row mb-4">
            <div class="col-12">
              <div class="user-moment-wind__sensor-title">
                {{ i18n.momentData_windSpeedTitle }}
              </div>
              <div class="user-moment-wind__sensor-value">
                {{ momentData.windSpeed || 0 }}
                <span>
                  {{ i18n.momentData_windSpeedUnit }}
                </span>
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col-12">
              <div class="user-moment-wind__sensor-title">
                {{ i18n.momentData_windDirectionTitle }}
              </div>
              <div class="user-moment-wind__sensor-value">
                {{ momentData.windDirection || 0 }}
                <span>
                  {{ i18n.momentData_windDirectionUnit }}
                </span>
              </div>
            </div>
          </div>
        </div>
        <div class="col-sm-7 d-none d-sm-flex align-items-center">
          <UserMomentCompass
            :value="momentData.windDirection"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex';
  import { REFERENCES, USER } from '~/store/types';

  import UserMomentCompass from './UserMomentCompass';

  export default {
    name: 'UserMomentWind',
    components: {
      UserMomentCompass,
    },
    computed: {
      ...mapGetters('references', {
        i18n: REFERENCES.GET_I18N,
      }),
      ...mapGetters('user', {
        momentData: USER.GET_MOMENT_DATA,
      }),
    },
  };
</script>

<style lang="scss" scoped>
  .user-moment-wind {
    display: flex;
    flex-direction: column;
    width: 100%;
  }
  .user-moment-wind__title {
    display: block;
    font-weight: 300;
    font-size: 16px;
    line-height: 20px;
    color: $color-gray-01;
    text-transform: uppercase;
    margin-bottom: 10px;
  }
  .user-moment-wind__wrapper {
    display: block;
    padding: 25px;
    flex: 1 0 auto;
    background: $color-gray-06;
    box-shadow: 0 8px 24px rgba(1, 1, 1, 0.1);
    border-radius: 6px;
    transition: background-color $animation-time-01 $animation-easing, box-shadow $animation-time-01 $animation-easing;
  }
  .user-moment-wind__sensor-title {
    display: block;
    font-weight: 300;
    font-size: 12px;
    line-height: 15px;
    color: $color-gray-01;
    text-transform: capitalize;
    margin-bottom: 5px;
    text-align: right;
  }
  .user-moment-wind__sensor-value {
    display: block;
    width: 100%;
    font-weight: 600;
    font-size: 48px;
    line-height: 48px;
    color: $color-gray-01;
    text-align: right;
  }
  .user-moment-wind__sensor-value span {
    display: inline-block;
    vertical-align: top;
    font-weight: 300;
    font-size: 16px;
    line-height: 20px;
    color: $color-gray-01;
  }
  @media (min-width: $screen-sm) {
    .user-moment-wind__sensor-title {
      text-align: left;
    }
    .user-moment-wind__sensor-value {
      text-align: left;
    }
  }
</style>
