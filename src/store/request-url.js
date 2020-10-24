const apiUrl = process.env.VUE_APP_API_URL;

export const auth = {
  reLogin: `${apiUrl}api/update_token`,
  login: `${apiUrl}api/auth`,
  logout: `${apiUrl}api/logout`,
};
export const user = {
  fetchData: `${apiUrl}api/info`,
};
export const reports = {
  chartData: `${apiUrl}api/logs`,
};
