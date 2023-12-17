import { IRoutineCommands } from '../../interfaces';
import { RoutineEntity, generateDefaultCondition } from '../../models';

export class SetRepetitionDaysCommand implements IRoutineCommands {
  name: string;
  entityType: string;
  description: string;
  constructor() {
    this.name = 'set-repetition-days';
    this.entityType = 'commands';
    this.description = 'Set repetition days';
  }
  /**
   *
   * activeDays: [0, 1,2,3,4,5,6]  // 0: Sunday, 1: Monday, 2: Tuesday, 3: Wednesday, 4: Thursday, 5: Friday, 6: Saturday
   */
  action(params: { activeDays: Array<number>; routine: RoutineEntity }) {
    if (!params.routine.condition) {      
      params.routine.condition = generateDefaultCondition();
    }
    params.routine.condition.activeDays = params.activeDays;
    return params.routine;
  }
  
}
