/* eslint-disable @typescript-eslint/no-explicit-any */
import { ActuatorEntity, SensorEntity } from '../area';
import { EntityType, GenericEntity } from '../../generic';
import { GroupEntity } from '../group';

export interface RoutineEntity extends GenericEntity {
  name: string;
  triggers: Array<RoutineParamType>;
  priority: number;
  actions: Array<RoutineParamType>;
  isEnabled: boolean;
  condition?: RoutineCondition;
  notification: RoutineNotificationType;
}
export interface RoutineCondition {
  activated: boolean;
  activeDays: Array<number>;
  activatedBetween: {
    dateIni: number;
    dateEnd: number;
  };
  suppressFor: number;
}
export type RoutineNotificationType = {
  isActivated: boolean;
  notificationMessage: string;
  type: "Push" | "Email" | "SMS";
};

export type RoutineParamType = {
  // isGroup: boolean;
  isGroup: boolean;
  entityType: string;
  group?: GroupEntity;
  device?: ActuatorEntity | SensorEntity;
  triggerState: any;
};

export type WhenSelectorType = 'Above' | 'Below' | 'Between';

export class EmptyRoutine implements RoutineEntity {
  name: string;
  priority: number;
  id?: string;
  entityType: EntityType;
  triggers: Array<RoutineParamType>;
  notification: RoutineNotificationType;
  actions: Array<RoutineParamType>;
  isEnabled: boolean;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  condition?: any;
  constructor () {
    this.id = undefined;
    this.priority = 0;
    this.name = '';
    this.entityType = EntityType.ROUTINE;
    this.notification = {
      isActivated: false,
      notificationMessage: '',
      type: 'Push'
    };
    this.triggers = [];
    this.isEnabled = false;
    this.actions = [];

    this.condition = null;
  }
}
