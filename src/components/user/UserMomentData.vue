<template>
  <div class="user-moment-data">
    <div class="row">
      <div class="col-12 col-lg-6">
        <div class="row mb-lg-4">
          <div class="col-12 col-sm-6 mb-4 mb-lg-0">
            <UserMomentSensor
              :title="i18n.momentData_temperatureSensorTitle"
              :unit="i18n.momentData_temperatureSensorUnit"
              :value="momentData.temperature"
              :is-active="true"
              @select-item="selectItemHandler('temperature')"
            />
          </div>
          <div class="col-12 col-sm-6 mb-4 mb-lg-0">
            <UserMomentSensor
              :title="i18n.momentData_humiditySensorTitle"
              :unit="i18n.momentData_humiditySensorUnit"
              :value="momentData.humidity"
              :is-active="false"
              @select-item="selectItemHandler('humidity')"
            />
          </div>
        </div>
        <div class="row">
          <div class="col-12 col-sm-6 mb-4 mb-lg-0">
            <UserMomentSensor
              :title="i18n.momentData_pressureSensorTitle"
              :unit="i18n.momentData_pressureSensorUnit"
              :value="momentData.pressure"
              :is-active="false"
              @select-item="selectItemHandler('pressure')"
            />
          </div>
          <div class="col-12 col-sm-6 mb-4 mb-lg-0">
            <UserMomentSensor
              :title="i18n.momentData_rainfallSensorTitle"
              :unit="i18n.momentData_rainfallSensorUnit"
              :value="momentData.rainfall"
              :is-active="false"
              @select-item="selectItemHandler('rainfall')"
            />
          </div>
        </div>
      </div>
      <div class="col-12 col-lg-6 d-lg-flex">
        <UserMomentWind />
      </div>
    </div>
  </div>
</template>

<script>
  import { mapGetters, mapActions } from 'vuex';
  import { REFERENCES, USER } from '~/store/types';

  import UserMomentSensor from './UserMomentSensor';
  import UserMomentWind from './UserMomentWind';

  export default {
    name: 'UserMomentData',
    components: {
      UserMomentSensor,
      UserMomentWind,
    },
    computed: {
      ...mapGetters('references', {
        i18n: REFERENCES.GET_I18N,
      }),
      ...mapGetters('user', {
        momentData: USER.GET_MOMENT_DATA,
      }),
    },
    methods: {
      selectItemHandler(id) {
        console.log(id);
      },
    },
  };
</script>
