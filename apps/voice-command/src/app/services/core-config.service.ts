import { Inject, Injectable } from "@angular/core";
import { CORE_CUSTOM_CONFIG, Configuration } from "../configuration/config";

@Injectable({
    providedIn: 'root',
  })
export class CoreConfigService {
    constructor (
        @Inject(CORE_CUSTOM_CONFIG) private _config: Configuration
      ) {}
    
        get config(): Configuration {
            return this._config;
        }
        set config(config: Configuration) {
            this._config = config;
        }
}