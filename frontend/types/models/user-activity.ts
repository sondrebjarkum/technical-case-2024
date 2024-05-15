import { Activity } from './activity';
import { User } from './user';

export interface UserActivity {
  id: number;
  user: User;
  activity: Activity;
  timestamp: string;
}
