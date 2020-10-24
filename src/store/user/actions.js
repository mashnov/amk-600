import Api from './api';
import MODULE from './types';
import { AUTH } from '~/store/types';
import { userDataTransformer } from '~/helpers/transformers';

const USER_TOKEN_GETTER_KEY = `auth/${AUTH.GET_USER_TOKEN}`;
const UPDATE_USER_TOKEN_KEY = `auth/${AUTH.SET_USER_TOKEN}`;

export default {
  async [MODULE.FETCH_DATA]({ rootGetters, dispatch, commit }) {
    const userToken = rootGetters[USER_TOKEN_GETTER_KEY];
    const { successes, token, data } = await Api.FETCH_DATA({ userToken });
    if (successes) {
      const { momentData, statData, deviceData, sensorData } = userDataTransformer(data);
      commit(MODULE.MUTATE_MOMENT_DATA, momentData);
      commit(MODULE.MUTATE_STAT_DATA, statData);
      commit(MODULE.MUTATE_DEVICE_DATA, deviceData);
      commit(MODULE.MUTATE_SENSOR_DATA, sensorData);
    }
    dispatch(UPDATE_USER_TOKEN_KEY, token, { root: true });
  },
};
