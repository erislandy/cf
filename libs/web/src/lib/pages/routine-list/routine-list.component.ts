import { Component, OnInit, effect, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SwitchComponent } from "@eg/angular-to-nodered-ui";
import { routines } from '../routine-details/mock-data';
import { RouterModule } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import Fuse from 'fuse.js';
import { CommandExecutor, VoiceLoaderComponent } from '@cf/shared';
import { filter, switchMap, tap } from 'rxjs';
import { EntityType, GenericUseCase, RoutineEntity, commandType } from '@cf/domain';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'cf-routine-list',
  standalone: true,
  imports: [CommonModule, SwitchComponent, RouterModule, VoiceLoaderComponent],
  templateUrl: './routine-list.component.html',
  styleUrl: './routine-list.component.scss',
})
export class RoutineListComponent implements OnInit{
 
  http = inject(HttpClient);
  commandExecutor = inject(CommandExecutor);
  loading = signal(true);

  genericService = inject(GenericUseCase<RoutineEntity>);
  routines = toSignal(this.genericService.getGenerics(EntityType.ROUTINE, 'e563c6a6-b3d4-4eec-acd4-426d2b7615be').pipe(
    tap((data) => {
      if(data && data.length > 0)
        this.loading.set(false);
    })
  ));
  
  ngOnInit(): void {
    /*
    this.http.get<RoutineEntity>('https://ctrlplus-cruds-azure-functions-counters-dev.azurewebsites.net/api/MainEntityCRUD?operation=getAll&entityType=routines&area_id=e563c6a6-b3d4-4eec-acd4-426d2b7615be')
    .subscribe(data => { 
      console.log({data});
    });*/
    this.commandExecutor.requestCommand$.pipe(
      filter(event => event != null && event.trim() !== ''),
      switchMap((event) => this.http.post<{res: {role: string, content: string}}>(
        'https://ctrlplus-cruds-azure-functions-counters-dev.azurewebsites.net/api/VoiceCommands?operation=command',
        {
          command_text: event
        })
      )
    ).subscribe(response => {
      console.log("response data", response);
      const data =  response.res.content.replace(/json\s*/, '')
      .replace(/```/g, '');
      console.log("data", data);
      const obj = JSON.parse(data);
      console.log("obj", obj);
      if(data.includes(commandType.GET_ROUTINE_BY_NAME)){
        const name = obj.parameters.name;
        console.log("name", name);
        
        const list = [
          "HOUSE 1 MIST GROUP 2",
          "HOUSE 1 MIST GROUP 1",
          "HOUSE 1 MIST GROUP 3"
        ];
        const proximityName = new Fuse(list).search(name)[0];
        console.log("proximityName", proximityName);
      }
    })
  }
}
