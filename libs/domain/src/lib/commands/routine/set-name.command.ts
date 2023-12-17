import { ICommands } from "../../interfaces";
import { RoutineEntity } from "../../models";

export class SetNameCommand implements ICommands {
    name: string;
    entityType: 'commands';
    description: string;
    constructor() {
        this.name = "set-name";
        this.entityType = 'commands';
        this.description = 'Set name';
    }
    action(params : {name: string, routine: RoutineEntity}) {
        params.routine.name = params.name;
        console.log(" set-name command executed: ", params.routine);
    }
}

