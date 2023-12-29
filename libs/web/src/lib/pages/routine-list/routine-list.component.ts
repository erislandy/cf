import { Component, OnDestroy, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SwitchComponent } from "@eg/angular-to-nodered-ui";
import { Router, RouterModule } from '@angular/router';
import Fuse from 'fuse.js';
import { CommandExecutor, VoiceLoaderComponent } from '@cf/shared';
import { Subscription, filter, switchMap, tap } from 'rxjs';
import { EntityType, GenericUseCase, RoutineEntity, commandType } from '@cf/domain';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'cf-routine-list',
  standalone: true,
  imports: [CommonModule, SwitchComponent, RouterModule, VoiceLoaderComponent],
  templateUrl: './routine-list.component.html',
  styleUrl: './routine-list.component.scss',
})
export class RoutineListComponent implements OnInit, OnDestroy{
  
  _subs = new Subscription();
  
  commandExecutor = inject(CommandExecutor);
  loading = signal(true);

  genericService = inject(GenericUseCase<RoutineEntity>);
  routines = toSignal(this.genericService.getGenerics(EntityType.ROUTINE, 'e563c6a6-b3d4-4eec-acd4-426d2b7615be').pipe(
    tap((data) => {
      if(data && data.length > 0)
        this.loading.set(false);
    })
  ));
  router = inject(Router);
  
  ngOnInit(): void {
   
    this._subs.add(this.commandExecutor.requestCommand$.pipe(
      filter(event => event != null && event.trim() !== ''),
      switchMap((event) => this.genericService.processCommand(event))
    ).subscribe(response => {
      console.log("response data", response);
    
      if(response.functionName ===  commandType.GET_ROUTINE_BY_NAME){
        if('name' in response.parameters){
          const name = response.parameters.name as string;
          console.log("my name",name);
          if(!name || name.trim() === ''){
            return this.commandExecutor.status$.next('error');
          }
          const options = {
            includeScore: true,
            keys: ['name']
          }
          const routineExpected = new Fuse<RoutineEntity>(this.routines() ?? [], options).search(name)[0];
          console.log({routineExpected});

          if(!routineExpected){
            return this.commandExecutor.status$.next('error');
          }
          this.router.navigate(['dashboard','routine', routineExpected.item.id]);
          return this.commandExecutor.status$.next('success');
        }     
        return this.commandExecutor.status$.next('error');
        
      }
    }));
  }
  ngOnDestroy(): void {
    this._subs.unsubscribe()
  }
}
