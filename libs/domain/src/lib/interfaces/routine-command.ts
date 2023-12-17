export interface IRoutineCommands {
    id?: string;
    name: string;
    entityType: string,
    description: string;
    action(params: object): object | undefined;
}