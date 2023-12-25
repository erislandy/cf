import { IRoutineCommands } from "../../interfaces";
import { RoutineEntity } from "../../models";

export class SetNameCommand implements IRoutineCommands {
    name: string;
    entityType: string;
    description: string;
    constructor() {
        this.name = "set-notification-message";
        this.entityType = 'commands';
        this.description = 'Set notification message';
    }
    action(params : {message: string, routine: RoutineEntity}) {
        params.routine.notification.notificationMessage = params.message;
        return params.routine;
    }
}

