export interface Activity {
  id: number;
  name: ActivityTypes;
  points: number;
}

export type ActivityTypes = (typeof ActivityTypes)[keyof typeof ActivityTypes];

export const ActivityTypes = {
  sale: 'Sale',
  meeting: 'Meeting',
  valuation: 'Valuation',
} as const;
