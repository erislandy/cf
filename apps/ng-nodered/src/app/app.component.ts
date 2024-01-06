import { Component,  OnInit } from '@angular/core';
import { SwitchComponent, WebElementsService } from '@engadi-solution/test3';
@Component({
  standalone: true,
  imports: [SwitchComponent],
  selector: 'cf-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  title = 'ng-nodered';

  constructor(private webElementsService: WebElementsService){   
    
  }
  ngOnInit(): void {
    this.webElementsService.showAsElement("#switchDemo", {
      state: true, 
      actionable: true, 
      size: "md",
      stateChange: (state: boolean) => console.log("State changed: ",{state})
    });
  }
}
