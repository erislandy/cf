import { CommonModule } from "@angular/common";
import { Component } from "@angular/core";
import { RouterOutlet } from "@angular/router";

@Component({
    selector: 'cf-inbound',
    standalone: true,
    imports: [
      CommonModule, 
      RouterOutlet,
    ],
    templateUrl: './inbound.component.html',
    styleUrl: './inbound.component.scss',
  })
export class InboundComponent{

}