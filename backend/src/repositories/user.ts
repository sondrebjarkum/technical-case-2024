import eventEmitter from '../emitter';
import { User } from '../models/user';
import { Repository } from './base';

export class UserRepository extends Repository<User> {
  findOne(id: number) {
    return this.db().users.find((user) => user.id === id);
  }

  findMultiple(ids: number[]) {
    return this.db().users.filter((user) => ids.includes(user.id));
  }

  findAll() {
    return this.db().users;
  }
}
