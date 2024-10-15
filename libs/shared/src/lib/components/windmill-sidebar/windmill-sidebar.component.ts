import { Component,   EventEmitter,   inject,   Input, OnInit, Output,   } from '@angular/core';
import { CommonModule } from '@angular/common';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { ActivatedRoute, NavigationEnd, Router, RouterModule } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { filter, map } from 'rxjs';
import { SvgLoaderComponent } from '../svg-loader/svg-loader.component';

@Component({
  selector: 'cf-windmill-sidebar',
  standalone: true,
  imports: [CommonModule, RouterModule, SvgLoaderComponent],
  templateUrl: './windmill-sidebar.component.html',
  styleUrl: './windmill-sidebar.component.scss',
  animations: 
    [
      trigger('openClose', [
        state('open', style({
          opacity: 1,
          transform: 'translateX(0)'
        })),
        state('closed', style({
          opacity: 0,
          transform: 'translateX(-256px)'
        })),
        transition('open => closed', [
          animate('0.15s ease-in-out')
        ]),
        transition('closed => open', [
          animate('0.15s ease-in-out')
        ]),
      ]),
      trigger('show', [
        // ...
        state('open', style({
          opacity: 1,
          display: 'block'
        })),
        state('closed', style({
          opacity: 0,
          display: 'none'
        })),
        transition('open => closed', [
          animate('0.15s ease-in-out')
        ]),
        transition('closed => open', [
          animate('0.15s ease-in-out')
        ]),
      ])
     
    ]
})
export class WindmillSidebarComponent {
  
  @Input() isSideMenuOpen: boolean = true;
  @Output() isSideMenuOpenChange: EventEmitter<boolean> = new EventEmitter();
  router = inject(Router); 
  menuItems = [
    {link: 'stock', title: 'Almacen', icon: 'layers'},
    {link: 'inbound', title: 'Compras', icon: 'trending-down'},
    {link: 'sell', title: 'Ventas', icon: 'trending-up'},
  ]
  items = toSignal<Array<{link: string; isActive: boolean, title: string, icon: string}>>(this.router.events.pipe(
    filter(event => event instanceof NavigationEnd),
    map(() => {
      const url = this.router.url; // Obtiene la URL actual
      console.log({url})
      return this.menuItems.map(m => ({
        ...m,
        isActive: url.includes(m.link)
      }))
    })
  ))
  backdropClick(){
    this.isSideMenuOpenChange.emit(!this.isSideMenuOpen);
  }
}
