import { IRoutineCommands } from '../../interfaces';
import { RoutineEntity, generateDefaultCondition } from '../../models';

export class SetSupressForCommand implements IRoutineCommands {
  name: string;
  entityType: string;
  description: string;
  constructor() {
    this.name = 'set-interval';
    this.entityType = 'commands';
    this.description = 'Set valid interval';
  }
  /**
   *
   * suppressFor: number; Set time in minutes will wait before running the routine again  
   * 
   */
  action(params: { suppressFor: number, routine: RoutineEntity }) {
    if (!params.routine.condition) {      
      params.routine.condition = generateDefaultCondition();
    }
    
    params.routine.condition.suppressFor = params.suppressFor;
    return params.routine;
  }
  
}
