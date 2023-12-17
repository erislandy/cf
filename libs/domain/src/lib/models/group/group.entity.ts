import { DeviceCommonEntity } from '../area';
import { GenericEntity } from '../generic';

export interface GroupEntity extends GenericEntity {
  name: string;
  type: GroupType;
  condition: GroupConditionType;
  devices: DeviceCommonEntity[];
  wtValue: number,
  wtUnit: "sec" | "min" | "hour";
  repeatTimeValue?: number;
  repeatTimeUnit?: "sec" | "min" | "hour";
}

export type GroupType = {
  key: string;
  value: string;
  deviceType: '' | 'sensor' | 'actuator'; //Sensor || Actuator
};

export type GroupConditionType = {
  key: string;
  value: string;
  deviceType: '' | 'sensor' | 'actuator'; //Sensor || Actuator
};


export function getConditionTypes(): GroupConditionType[] {
  return [
    { deviceType: 'actuator', key: 'sameTime', value: 'Same Time' },
    { deviceType: 'actuator', key: 's-on', value: 'Sequential' },
    { deviceType: 'actuator', key: 's-off', value: 'Sequential On/Off' },
    { deviceType: 'sensor', key: 'max', value: `Maximum Value` },
    { deviceType: 'sensor', key: 'min', value: 'Minimum Value' },
    { deviceType: 'sensor', key: 'ave', value: 'Average Value' },
  ];
}
/*
export function getGroupTypes(): GroupType[] {
  return [
    { key: 'fan', value: 'Fan', deviceType: 'actuator' },
    { key: 'curtain', value: 'Curtain', deviceType: 'actuator' },
    { key: 'vent', value: 'Vent', deviceType: 'actuator' },
    { key: 'boom', value: 'Boom', deviceType: 'actuator' },
    { key: 'heater', value: 'Heater', deviceType: 'actuator' },
    { key: 'solenoid', value: 'Solenoid', deviceType: 'actuator' },
    { key: 'temperature', value: 'Temperature', deviceType: 'sensor' },
    { key: 'r-hummer', value: 'Relative Humidity', deviceType: 'sensor' },
    // { key: 'wind', value: 'Wind', deviceType: 'sensor' },
    // { key: 'rain', value: 'Rain', deviceType: 'sensor' },
  ];
}*/
