import { Activity } from './activity';
import { User } from './user';

export interface UserActivityDB {
  id: number;
  userId: number;
  activityId: number;
  timestamp: string;
}

export interface UserActivityClient {
  id: number;
  user: User;
  activity: Activity;
  timestamp: string;
}
