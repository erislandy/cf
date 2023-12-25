import { IRoutineCommands } from "../../interfaces";
import { RoutineEntity } from "../../models";

export class SetNotificationTypeCommand implements IRoutineCommands {
    type: "Push" | "Email" | "SMS";
    entityType: string;
    description: string;
    name: string;
    
    constructor() {
        this.type = "Push";
        this.name = "set-notification-type";
        this.description = 'type property in notification changed';
        this.entityType = 'commands';
    }    
    action(params : {type: "Push" | "Email" | "SMS", routine: RoutineEntity}) {
        params.routine.notification.type = params.type;
        return params.routine;
    }
}