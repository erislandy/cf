import { IRoutineCommands } from "../../interfaces";
import { RoutineEntity } from "../../models";

export class SetNameCommand implements IRoutineCommands {
    name: string;
    entityType: string;
    description: string;
    constructor() {
        this.name = "set-name";
        this.entityType = 'commands';
        this.description = 'Set name';
    }
    action(params : {name: string, routine: RoutineEntity}) {
        params.routine.name = params.name;
        return params.routine;
    }
}

