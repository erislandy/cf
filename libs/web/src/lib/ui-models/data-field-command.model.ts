
export interface DataFieldCommand {
    command: string;
    required: boolean;
    label: string;
    type: "simple" | "group";
    value: string | Array<string>;
    state: 'valid' | 'invalid' | 'pending' | 'disabled';
  }
  