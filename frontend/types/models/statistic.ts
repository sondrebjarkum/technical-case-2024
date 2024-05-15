import { ActivityTypes } from './activity';
import { User } from './user';

export interface Statistic {
  id: number;
  user: User;
  points: { [key in keyof typeof ActivityTypes]?: number } & { total: number };
}
