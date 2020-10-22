import MODULE from './types';
import { AUTH } from '~/store/types';
import Api from './api';

const USER_TOKEN_GETTER_KEY = `auth/${AUTH.GET_USER_TOKEN}`;
const UPDATE_USER_TOKEN_KEY = `auth/${AUTH.SET_USER_TOKEN}`;

export default {
  async [MODULE.FETCH_REPORT_FILE]({ rootGetters, dispatch }, { range }) {
    const token = rootGetters[USER_TOKEN_GETTER_KEY];
    dispatch(UPDATE_USER_TOKEN_KEY, token, { root: true });
    return await Api.FETCH_REPORT_FILE({ range, token });
  },
};
