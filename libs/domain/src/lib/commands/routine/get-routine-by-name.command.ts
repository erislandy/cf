import { IRoutineCommands } from "../../interfaces";
import { RoutineEntity } from "../../models";

export class GetRoutineByNameCommand implements IRoutineCommands {
    name: string;
    entityType: string;
    description: string;
    constructor() {
        this.name = "get-routine-by-name";
        this.entityType = 'commands';
        this.description = 'Get routine by name';
    }
    action(params : {name: string, routines: Array<RoutineEntity>}) {
        return params.routines.find(routine => routine.name.trim().toLocaleLowerCase() === params.name.trim().toLocaleLowerCase());
    }
}