import { Observable } from 'rxjs';
import { EntityRepository } from '../base/repository';
import { RepositoryFactory } from './repository.factory';

export const repositories: { [ key: string ]: unknown; } = {};

export abstract class UseCase<T> {
  private repositoryName = '';

  constructor (repositoryFactory: RepositoryFactory<EntityRepository>) {
    if (repositoryFactory.getRepository instanceof Observable) {
      (repositoryFactory.getRepository as Observable<EntityRepository>).subscribe(repositoryAssign => {
        this.repositoryName = repositoryAssign.getRepositoryName();
        repositories[ this.repositoryName ] = repositoryAssign;
      });
    } else if (repositoryFactory.getRepository instanceof Promise) {
      (repositoryFactory.getRepository as Promise<EntityRepository>).then(repositoryAssign => {
        this.repositoryName = repositoryAssign.getRepositoryName();
        repositories[ this.repositoryName ] = repositoryAssign;
      });
    } else {
      const repositoryAssign = repositoryFactory.getRepository;
      this.repositoryName = repositoryAssign?.getRepositoryName() as string;
      repositories[ this.repositoryName ] = repositoryAssign;
    }
  }

  protected get getRepository(): T {
    return repositories[ this.repositoryName ] as T;
  }
}
