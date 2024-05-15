import { db } from '../database';

export abstract class Repository<Entity> {
  db = () => db;

  findOne(...args: any[]): Entity | undefined {
    throw new Error('Not implemented');
  }

  findAll(...args: any[]): Entity[] | undefined {
    throw new Error('Not implemented');
  }
}
