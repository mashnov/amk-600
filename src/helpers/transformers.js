import get from 'lodash/get';

export const dictionariesTransformer = (dictionaries) => {
  return {
    countries: get(dictionaries, 'dictionaryCountries.dictionary.country', []),
    currencies: get(dictionaries, 'dictionaryCurrenciesList.dictionary.currency', []),
    occupation: get(dictionaries, 'dictionaryOccupationList.dictionary.occupation', []),
    questions: get(dictionaries, 'dictionarySecurityQuestion.dictionary.securityQuestion', []),
    transactions: get(dictionaries, 'dictionaryTransactionTypeList.dictionary.transactionType', []),
    identity: get(dictionaries, 'dictionaryIdentityDocumentTypes.dictionary.documentType', []),
    address: get(dictionaries, 'dictionaryAddressDocumentTypes.dictionary.documentType', []),
    wire: get(dictionaries, 'dictionaryWireSupport.supportedCountries', []),
    eft: get(dictionaries, 'dictionaryEftSupport.supportedCountries', []),
    pep: get(dictionaries, 'dictionaryPepList.dictionary.pep', []),
  };
};

export const loggerDetailsTransformer = (details) => {
  return {
    ip: get(details, 'ip', null),
    location: {
      latitude: get(details, 'latitude', null),
      longitude: get(details, 'longitude', null),
      continentCode: get(details, 'continent_code', null),
      continentName: get(details, 'continent_name', null),
      countryCode: get(details, 'country_code', null),
      countryName: get(details, 'country_name', null),
      regionCode: get(details, 'region_code', null),
      regionName: get(details, 'region_name', null),
      zip: get(details, 'zip', null),
      timeZoneId: get(details, 'time_zone.id', null),
      timeZoneCode: get(details, 'time_zone.code', null),
      timeZoneOffset: get(details, 'time_zone.gmt_offset', null),
      phoneCode: get(details, 'location.calling_code', null),
      languages: get(details, 'location.languages', null),
      isEn: get(details, 'location.is_eu', null),
    },
    currency: {
      code: get(details, 'currency.code', null),
      symbol: get(details, 'currency.symbol', null),
    },
  };
};
