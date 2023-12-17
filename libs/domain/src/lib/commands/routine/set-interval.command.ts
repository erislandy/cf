import { IRoutineCommands } from '../../interfaces';
import { RoutineEntity, generateDefaultCondition } from '../../models';

export class SetIntervalCommand implements IRoutineCommands {
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
   * activatedBetween: [dateIni: number, dateEnd: number]  (Time value in miliseconds) valid interval HH:MM:SS in frontend
   * 
   */
  action(params: { activatedBetween: {dateIni: number, dateEnd: number}; routine: RoutineEntity }) {
    if (!params.routine.condition) {      
      params.routine.condition = generateDefaultCondition();
    }
    
    params.routine.condition.activatedBetween = params.activatedBetween;
    return params.routine;
  }
  
}
