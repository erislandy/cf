import { IRoutineCommands } from "../../interfaces";
import { RoutineEntity } from "../../models";

export class SetNotificationStateCommand implements IRoutineCommands {
    isActivated: boolean;
    entityType: string;
    description: string;
    name: string;
    
    constructor() {
        this.isActivated = false;
        this.name = "set-notification-state";
        this.description = 'notification property in routine changed';
        this.entityType = 'commands';
    }    
    action(params : {isActivated: boolean, routine: RoutineEntity}) {
        params.routine.notification.isActivated = params.isActivated;
        return params.routine;
    }
}