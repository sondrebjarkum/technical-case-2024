import { ActivityTypes } from './activity';

export interface Statistic {
  id: number;
  userId: number;
  points: { [key in keyof typeof ActivityTypes]?: number } & { total: number };
}
