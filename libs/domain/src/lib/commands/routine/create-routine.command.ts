import { IRoutineCommands } from "../../interfaces";
import { EmptyRoutine } from "../../models";

export class CreateRoutineCommand implements IRoutineCommands {
    name: string;
    entityType: string;
    description: string;
    constructor() {
        this.name = "create-routine";
        this.entityType = 'commands';
        this.description = 'Create routine with default values';       
    }
    action() {
        return new EmptyRoutine();
    }
}