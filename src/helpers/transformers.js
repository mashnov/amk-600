export const userDataTransformer = (data) => {
  return { momentData: data, statData: data, deviceData: data, sensorData: data };
};
export const adminDataTransformer = (data) => {
  return data;
};
