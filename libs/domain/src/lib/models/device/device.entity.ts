import { GenericEntity } from '../../generic';
import { DeviceTypeEnum, GroupDeviceEntity } from "../group-device";

export interface DeviceEntity extends GenericEntity {
  name: string; // Name
  model: string; // Model
  brand: string; // Brand;
  groupType?: string;
  property?: string;
  group?: GroupDeviceEntity;
  deviceType: DeviceTypeEnum;
}

export interface KeyNameEntity {
  key: string;
  name: string;
}

export interface Measurement extends KeyNameEntity {
  units?: Array<KeyNameEntity>;
}

export interface Unit extends KeyNameEntity {
  name: string;
}
