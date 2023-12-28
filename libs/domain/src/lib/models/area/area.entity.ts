import { DeviceEntity } from '../device';
import { GenericEntity } from '../../generic';

export interface DeviceCommonEntity extends GenericEntity {
  name: string;
  description?: string;
  id?: string;
  nodeRedId?: string;
  deviceData?: DeviceEntity;
  zone?: string;
  bistableTime?: number;
  bistableUnit?: string;
}

export interface ActuatorEntity extends DeviceCommonEntity {
  optional?: string;
}

export interface SensorEntity extends DeviceCommonEntity {
  optional?: string;
}
