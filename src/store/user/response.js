export default {
  success: true,
  token: '',
  data: {
    deviceName: 'АМК 600 №26',
    sensors: {
      modulesStatus: {
        MDMP: true,
        HTPR: true,
        GNSS: true,
        rain: true,
        battery: [true, true]
      },
      time: '00:00',
      date: '12-05-2010',
      signal: 0,
      dewPoint: 0,
      power: {
        isExternal: false,
        level: 0,
        battery: [
          {
            batteryVoltage: 0,
            batteryPower: 0,
            arrayInputPower: 0,
            loadPower: 0,
            batteryRemainingCapacity: 0,
            consumedEnergyToday: 0,
            totalConsumedEnergy: 0,
            generatedEnergyToday: 0,
            totalGeneratedEnergy: 0,
            batteryTemperature: 0,
            temperatureInsideEquipment: 0,
          },
          {
            batteryVoltage: 0,
            batteryPower: 0,
            arrayInputPower: 0,
            loadPower: 0,
            batteryRemainingCapacity: 0,
            consumedEnergyToday: 0,
            totalConsumedEnergy: 0,
            generatedEnergyToday: 0,
            totalGeneratedEnergy: 0,
            batteryTemperature: 0,
            temperatureInsideEquipment: 0,
          }
        ]
      },
      temperature: {
        main: 'TMP117',
        allSensors: {
          TMP117: 0,
          PTD: 0,
          SHT35: 0,
          HDC2021: 0,
          HDC2080: 0,
          HPP801: 0,
          BMP388: 0,
          LPS27: 0,
        }
      },
      pressure: {
        main: 'BMP388',
        allSensors: {
          BMP388: 0,
          LPS27: 0
        }
      },
      humidity: {
        main: 'SHT35',
        allSensors: {
          SHT35: 0,
          HDC2021: 0,
          HDC2080: 0,
          HPP801: 0
        }
      },
      GPS: {
        N: 0,
        W: 0
      },
      rain: {
        rainVolume: 0,
        rainPower: 0,
        raiTime: 0,
        MaxPower: 0,
        hailVolume: 0,
        hailPower: 0,
        hailTime: 0,
        hailMaxPower: 0
      },
      wind: {
        minute2: {
          horizontal: 0,
          vertical: 0,
          direction: 0,
          max: 0
        },
        minute10: {
          horizontal: 0,
          vertical: 0,
          direction: 0,
          max: 0
        }
      }
    },
  }
}
