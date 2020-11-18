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
  downloadLink: `${apiUrl}logs-download?token={userToken}&range={range}`,
};
export const admin = {
  fetchData: `${apiUrl}api/info`,
  setMainSensor: `${apiUrl}api/set_sensor`,
  setSetting: `${apiUrl}api/set_setting`,
  clearLogs: `${apiUrl}api/clear_logs`,
  fetchUsers: `${apiUrl}api/user_list`,
  addUser: `${apiUrl}api/user_add`,
  editUser: `${apiUrl}api/user_edit`,
  deleteUser: `${apiUrl}api/user_delete`,
  restartCpu: `${apiUrl}api/mcu_reset`,
};
