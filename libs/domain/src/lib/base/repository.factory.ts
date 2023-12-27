import { Observable } from 'rxjs';

export interface RepositoryFactoryOptions {
  callback: (params: any) => any | Observable<any> | Promise<any>;
  params?: any;
}

export class RepositoryFactory<T> {
  private _options: RepositoryFactoryOptions;

  constructor (options: RepositoryFactoryOptions) {
    this._options = options;
  }

  get getRepository(): T | Observable<T> | Promise<T> | undefined {
    if (this._options?.callback) return this._options.callback(this._options?.params);
    return undefined;
  }
}
