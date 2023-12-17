export interface ICommands {
    id?: string;
    name: string;
    entityType: 'commands',
    description: string;
    action(params: object): void;
}