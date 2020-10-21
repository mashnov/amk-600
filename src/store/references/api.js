import axios from 'axios';
import MODULE from './types';
import { apiUrl, references } from '~/store/request-url';
import { dictionariesTransformer } from '~/helpers/transformers';

export default {
  [MODULE.FETCH_DICTIONARIES]() {
    return axios({
      method: 'POST',
      url: apiUrl,
      data: {
        method: references.fetchDictionaries,
      },
    }).then(({ data }) => (dictionariesTransformer(data.dictionaries)));
  },
};
