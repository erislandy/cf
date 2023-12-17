import { GenericEntity } from '../generic';

export interface GroupDeviceEntity extends GenericEntity {
  key: string;
  name: string;
  deviceType: DeviceTypeEnum;
  property?: string;
  propertyName?: string;
  expirationTimeValue?: number; //!Just the sensors can set this value
  expirationTimeUnit?: 'sec' | 'min' | 'hour'; //!Just the sensors can set this value
  icon: string;
  cardType: CardTypeEnum; //Es una lista donde se expone el color mas el nombre
  options: BooleanOptionsDevice | RangeOptionsDevice; //*BooleanOptionsDevice if the controlType is ON/OFF or RangeOptionsDevice if the controlType is STEPPER or SLIDER
}

export enum CardTypeEnum {
  PRIMARY = 'primary',
  SECONDARY = 'secondary',
  INFO = 'info',
  DANGER = 'danger',
  WARNING = 'warning',
  SUCCESS = 'success',
  DISABLED = 'disabled',
  WHITE = 'white'
}

export enum DeviceTypeEnum {
  SENSOR = 'sensor', ACTUATOR = 'actuator'
}

export interface OptionsDevice {
  controlType: ControlDeviceTypeEnum;
}

export type ScaleType = { unit: string; symbol: string; };

export class BooleanOptionsDevice implements OptionsDevice {
  controlType: ControlDeviceTypeEnum;
  lblFirstMode: string;
  lblSecondMode: string;
  // imageOn?: string;
  // imageOff?: string;
  isBistable: boolean;

  constructor (options: { lblFirstMode: string, lblSecondMode: string, isBistable?: boolean; }) {
    this.controlType = ControlDeviceTypeEnum.ON_OFF;
    this.lblFirstMode = options.lblFirstMode;
    this.lblSecondMode = options.lblSecondMode;
    this.isBistable = options.isBistable ?? false;
  }
}
export class RangeOptionsDevice implements OptionsDevice {
  controlType: ControlDeviceTypeEnum;
  scale: ScaleType | string;
  minValue: number;
  maxValue: number;
  labelValue: string;

  constructor (options: {
    scale: ScaleType | string;
    minValue: number;
    maxValue: number;
    labelValue: string;
  }) {
    this.controlType = ControlDeviceTypeEnum.SLIDER;
    this.scale = options.scale;
    this.minValue = options.minValue;
    this.maxValue = options.maxValue;
    this.labelValue = options.labelValue;
  }
}

export enum ControlDeviceTypeEnum { ON_OFF = 'ON/OFF', STEPPER = 'STEPPER', SLIDER = 'SLIDER' }
