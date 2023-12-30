import { EntityType, GenericEntity, RoutineCondition, RoutineEntity, RoutineNotificationType } from "@cf/domain";

export function mapFromRoutinesToDB(routine: RoutineEntity): RoutineDto {
    const newTriggers: Array<{
      isGroup: boolean,
      group?: { id?: string; },
      device?: { id?: string; };
      triggerState: any;
    }> = routine.triggers?.map(t => ({
      ...t,
      device: { id: t.device?.id },
      group: { id: t.group?.id },
  
    }));
    const newActions: Array<{
      isGroup: boolean,
      group?: { id?: string; },
      device?: { id?: string; };
      triggerState: any;
    }> = routine.actions?.map(t => ({
      ...t,
      device: { id: t.device?.id },
      group: { id: t.group?.id },
  
    }));
  
    return ({
      ...routine,
      triggers: newTriggers ? JSON.parse(JSON.stringify(newTriggers)) : undefined,
      actions: newActions ? JSON.parse(JSON.stringify(newActions)) : undefined
    });
  }
  
  export interface RoutineDto extends GenericEntity {
    name: string;
    triggers: Array<{
      isGroup: boolean,
      group?: { id?: string; },
      device?: { id?: string; };
      triggerState: any;
    }>;
    priority: number;
    actions: Array<{
      isGroup: boolean,
      group?: { id?: string; },
      device?: { id?: string; };
      triggerState: any;
    }>;
    isEnabled: boolean;
    entityType: EntityType;
    id?: string;
    condition?: RoutineCondition;
    notification: RoutineNotificationType;
  }