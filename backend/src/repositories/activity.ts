import { Repository } from './base';
import { Activity } from '../models/activity';

export class ActivityRepository extends Repository<Activity> {
  findOne(id: number) {
    return this.db().activities.find((activity) => activity.id === id);
  }

  findMultiple(ids: number[]) {
    return this.db().activities.filter((activity) => ids.includes(activity.id));
  }

  findAll() {
    return this.db().activities;
  }
}
