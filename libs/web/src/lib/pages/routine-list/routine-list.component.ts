import { Component, OnDestroy, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SwitchComponent } from "@eg/angular-to-nodered-ui";
import { Router, RouterModule } from '@angular/router';
import { CommandExecutor, VoiceLoaderComponent } from '@cf/shared';
import { Subscription, filter, switchMap, tap } from 'rxjs';
import { EmptyRoutine, EntityType, GenericUseCase, RoutineEntity, RoutineFactory, commandType } from '@cf/domain';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'cf-routine-list',
  standalone: true,
  imports: [CommonModule, SwitchComponent, RouterModule, VoiceLoaderComponent],
  templateUrl: './routine-list.component.html',
  styleUrl: './routine-list.component.scss',
})
export class RoutineListComponent implements OnInit, OnDestroy{
  
  //properties
  _subs = new Subscription();
  
  //services
  commandExecutor = inject(CommandExecutor);
  genericService = inject(GenericUseCase<RoutineEntity>);
  router = inject(Router);
  factory = inject(RoutineFactory);
  
  //signals
  loading = signal(true);
  routines = toSignal(this.genericService.getGenerics(EntityType.ROUTINE, 'e563c6a6-b3d4-4eec-acd4-426d2b7615be').pipe(
    tap((data) => {
      if(data && data.length > 0)
        this.loading.set(false);
    })
  ));
  
  ngOnInit(): void {
   
    this._subs.add(this.commandExecutor.requestCommand$.pipe(
      filter(event => event != null && event.trim() !== ''),
      switchMap((event) => this.genericService.processCommand(event))
    ).subscribe(response => {
      try {
        const functionName = response.functionName.replace("functions.", "");
        if(functionName ===  commandType.GET_ROUTINE_BY_NAME){
          const routineExpected = this.factory.execute(
            commandType.GET_ROUTINE_BY_NAME, {
              name: (response.parameters as {name: string}).name,
              routines: this.routines()
            }, new EmptyRoutine());
          this.router.navigate(['dashboard','routine', routineExpected.id]);      
          return this.commandExecutor.status$.next('success');
        }
  
        if(functionName ===  commandType.CREATE_ROUTINE){
          this.factory.execute(
            commandType.CREATE_ROUTINE, {}, new EmptyRoutine());
          this.router.navigate(['dashboard','routine', 'new']);      
          return this.commandExecutor.status$.next('success');
        }
      } catch (error: any) {
        this.commandExecutor.status$.next('error');
      } 
      
    }));
  }
  ngOnDestroy(): void {
    this._subs.unsubscribe()
  }
}
