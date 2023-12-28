import { RepositoryFactory } from '../base';
import { GenericRepository } from './generic.repository';

export class GenericRepositoryFactory<T> extends RepositoryFactory<GenericRepository<T>> { }
