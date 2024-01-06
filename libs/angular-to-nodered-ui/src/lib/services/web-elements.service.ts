import { Injectable } from "@angular/core";
import {NgElement, WithProperties} from '@angular/elements';
import { SwitchComponent } from "../components";

@Injectable()
export class WebElementsService {
  constructor() {
  }
  showAsElement(
    cssSelector: string,
    params: {
      state: boolean, 
      actionable: boolean, 
      size: "xs" | "sm" | "md" | "lg",
      stateChange: (state: boolean) => void
    }) {
    // Create element
    const switchEl: NgElement & WithProperties<SwitchComponent> = document.createElement(
      'switch-element',
    ) as any;
    
    // Set the properties
    switchEl.state = params.state;
    switchEl.actionable = params.actionable;
    switchEl.size = params.size;
    switchEl.addEventListener('stateChange', (event) => params.stateChange((event.target as any).state));

    // Add to the DOM
    document.querySelector(cssSelector)?.appendChild(switchEl);
  }
}