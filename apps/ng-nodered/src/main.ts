import { createApplication } from '@angular/platform-browser';
import { createCustomElement } from '@angular/elements';
import { H2Component, SwitchComponent, WebElementsService } from '@eg/angular-to-nodered-ui';
/*
bootstrapApplication(AppComponent, appConfig).catch((err) =>
  console.error(err)
);
*/
(
  async () => {
    const app = await createApplication({
      providers: [WebElementsService]
    })
    
    const switchElement = createCustomElement(
      SwitchComponent, 
      {injector: app.injector}
    );
    customElements.define('switch-element', switchElement);

    const h2Element = createCustomElement(
      H2Component, 
      {injector: app.injector}
    );
    
    customElements.define('h2-element', h2Element);

    const webElementsService = app.injector.get(WebElementsService);
    (window as any).webElementsService = webElementsService;
  }
)()