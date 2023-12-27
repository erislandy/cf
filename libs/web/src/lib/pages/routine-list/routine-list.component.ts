import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SwitchComponent } from "@eg/angular-to-nodered-ui";
import { routines } from '../routine-details/mock-data';
import { RouterModule } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { CommandExecutor } from 'libs/shared/src/lib/services/command-executor.service';
import { LocalCommandTypes } from 'libs/shared/src/lib/services/get-local-commands';
import { filter, switchMap } from 'rxjs';

@Component({
  selector: 'cf-routine-list',
  standalone: true,
  imports: [CommonModule, SwitchComponent, RouterModule],
  templateUrl: './routine-list.component.html',
  styleUrl: './routine-list.component.scss',
})
export class RoutineListComponent implements OnInit{
  routines: Array<{name: string, id: string}> = [];
  http = inject(HttpClient);
  commandExecutor = inject(CommandExecutor);
  constructor(){    
    this.routines = routines;
  }
  ngOnInit(): void {
    this.http.get('https://ctrlplus-cruds-azure-functions-counters-dev.azurewebsites.net/api/MainEntityCRUD?operation=getAll&entityType=routines&area_id=e563c6a6-b3d4-4eec-acd4-426d2b7615be')
    .subscribe((data: any) => { 
      console.log(data);
    });
    this.commandExecutor.requestCommand$.pipe(
      filter(event => event != null && event.trim() !== ''),
      switchMap((event) => this.http.post(
        'https://ctrlplus-cruds-azure-functions-counters-dev.azurewebsites.net/api/VoiceCommands?operation=command',
        {
          command_text: event
        })
      )
    ).subscribe((data: any) => {
      console.log("response data", data);
    })
  }
}
