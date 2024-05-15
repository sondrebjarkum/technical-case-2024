// Dummy database

import eventEmitter from './emitter';
import { Activity } from './models/activity';
import { User } from './models/user';
import { UserActivityDB } from './models/user-activity';

const users: User[] = [
  {
    id: 1,
    name: 'John Doe',
    email: 'john@doe.com',
  },
  {
    id: 2,
    name: 'Jane Doe',
    email: 'jane@doe.com',
  },
  {
    id: 3,
    name: 'Alice Brown',
    email: 'alice@brown.com',
  },
  {
    id: 4,
    name: 'Bob Brown',
    email: 'bob@brown.com',
  },
];

const activities: Activity[] = [
  {
    id: 1,
    name: 'Sale',
    points: 10,
  },
  {
    id: 2,
    name: 'Meeting',
    points: 5,
  },
  {
    id: 3,
    name: 'Valuation',
    points: 3,
  },
];

const userActivities: UserActivityDB[] = [
  {
    id: 1,
    userId: 1,
    activityId: 1,
    timestamp: '2021-01-01T00:00:00',
  },
  {
    id: 2,
    userId: 1,
    activityId: 2,
    timestamp: '2021-01-03T00:00:00',
  },
  {
    id: 3,
    userId: 2,
    activityId: 1,
    timestamp: '2021-01-03T00:00:00',
  },
  {
    id: 4,
    userId: 2,
    activityId: 2,
    timestamp: '2021-01-04T00:00:00',
  },
  {
    id: 5,
    userId: 3,
    activityId: 1,
    timestamp: '2021-01-05T00:00:00',
  },
  {
    id: 6,
    userId: 3,
    activityId: 2,
    timestamp: '2021-01-06T00:00:00',
  },
  {
    id: 7,
    userId: 4,
    activityId: 1,
    timestamp: '2021-01-07T00:00:00',
  },
  {
    id: 8,
    userId: 4,
    activityId: 2,
    timestamp: '2021-01-08T00:00:00',
  },
  {
    id: 9,
    userId: 4,
    activityId: 2,
    timestamp: '2021-01-08T00:00:00',
  },
];

export const db = {
  users,
  activities,
  userActivities,
};

/*
 * Mocks generating user activities to visualize data changes in frontend
 */

const generateActivity = setInterval(() => {
  setTimeout(
    () => {
      generateUserActivity();
    },
    Math.floor(Math.random() * 2900) + 100
  );
}, 1000);

setTimeout(() => {
  clearInterval(generateActivity);
}, 600000);

const generateUserActivity = () => {
  const id = userActivities.at(-1)!!.id + 1;
  const activityId = Math.floor(Math.random() * activities.length) + 1;
  const userId = Math.floor(Math.random() * users.length) + 1;
  const timestamp = new Date().toISOString();

  const userActivity = {
    id,
    activityId,
    userId,
    timestamp,
  };
  userActivities.push(userActivity);

  eventEmitter.emit('user-activity-created', userActivity);
};
