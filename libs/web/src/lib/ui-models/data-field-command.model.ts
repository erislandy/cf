
export interface DataFieldCommand {
    command: string;
    required: boolean;
    label: string;
    type: string;
    value: string | Array<string>;
    state: string//'valid' | 'invalid' | 'pending' | 'disabled';
  }
  