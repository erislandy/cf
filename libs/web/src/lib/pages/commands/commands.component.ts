import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SwitchComponent } from "@eg/angular-to-nodered-ui";
import { RouterModule } from '@angular/router';
import { CommandExecutor, LocalCommandTypes, TranslatePipe } from '@cf/shared';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'cf-routine-list',
  standalone: true,
  imports: [CommonModule, SwitchComponent, RouterModule, TranslatePipe],
  templateUrl: './commands.component.html',
  styleUrl: './commands.component.scss',
})
export class CommandListComponent {
  commandExecutor = inject(CommandExecutor);
  languageChanged = toSignal(this.commandExecutor.getCurrentLanguage());
  commands: Array<{code:LocalCommandTypes, name: string, description: string}> = [
    {code: LocalCommandTypes.SAVE, name: 'Save', description: 'Save the current routine'},
    {code: LocalCommandTypes.NEXT, name: 'Next', description: 'Go to the next step in rountine'},
    {code: LocalCommandTypes.BACK, name: 'Back', description: 'Go to the previous step in routine'},
    {code: LocalCommandTypes.SET_LANGUAGE, name: 'Change Language', description: 'Change language of the application'}, 
  ];

}
