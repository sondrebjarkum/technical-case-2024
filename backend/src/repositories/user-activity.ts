import { Repository } from './base';
import { Activity } from '../models/activity';
import { UserActivityDB, UserActivityClient } from '../models/user-activity';
import { UserRepository } from './user';
import { ActivityRepository } from './activity';
import { User } from '../models/user';

export class UserActivityRepository extends Repository<UserActivityClient> {
  activityRepo = new ActivityRepository();
  userRepo = new UserRepository();

  findAllByUser(userId: number): UserActivityClient[] | undefined {
    return this.serialize(
      this.db().userActivities.filter((activity) => activity.userId === userId)
    );
  }

  findAll() {
    return this.serialize(this.db().userActivities);
  }

  findAllAsStatistics() {
    const userActivities = this.findAll();

    const userPointsMap: { [userId: number]: { [key: string]: number } } = {};

    userActivities.forEach((userActivity) => {
      const { user, activity } = userActivity;

      if (!userPointsMap[user.id]) {
        userPointsMap[user.id] = { total: 0 };
      }

      userPointsMap[user.id][activity.name.toLocaleLowerCase()] =
        (userPointsMap[user.id][activity.name.toLowerCase()] || 0) +
        activity.points;

      userPointsMap[user.id].total += activity.points;
    });

    const userStatistics = Object.entries(userPointsMap).map(
      ([userId, points]) => ({
        user: {
          id: parseInt(userId),
          ...userActivities.find((ua) => ua.user.id === parseInt(userId))?.user,
        },
        points,
      })
    );

    return userStatistics;
  }

  findOneByUserAsStatistics(userId: number) {
    const userActivities = this.findAllByUser(userId);

    if (!userActivities) {
      return [{ status: 404, message: 'No user activities found' }, null];
    }

    const userPointsMap: { [userId: number]: { [key: string]: number } } = {};

    userActivities.forEach((userActivity) => {
      const { user, activity } = userActivity;

      if (!userPointsMap[user.id]) {
        userPointsMap[user.id] = { total: 0 };
      }

      userPointsMap[user.id][activity.name.toLocaleLowerCase()] =
        (userPointsMap[user.id][activity.name.toLowerCase()] || 0) +
        activity.points;

      userPointsMap[user.id].total += activity.points;
    });

    const userStatistics = Object.entries(userPointsMap).map(
      ([userId, points]) => ({
        user: {
          id: parseInt(userId),
          ...userActivities.find((ua) => ua.user.id === parseInt(userId))?.user,
        },
        points,
      })
    );

    return userStatistics[0];
  }

  findByUser({ userId, activityId }: { userId: number; activityId?: number }) {
    let userActivities = this.db().userActivities.filter(
      (userActivity) => userActivity.userId === userId
    );

    if (activityId) {
      userActivities = userActivities.filter(
        (userActivity) => userActivity.activityId === activityId
      );
    }

    return this.serialize(userActivities);
  }

  serialize(
    userActivities: UserActivityDB[] | UserActivityDB
  ): UserActivityClient[] {
    const seralizer = (
      userActivity: UserActivityDB,
      activity: Activity,
      user: User
    ) => {
      return {
        id: userActivity.id,
        user,
        activity,
        timestamp: userActivity.timestamp,
      };
    };

    if (!Array.isArray(userActivities)) {
      userActivities = [userActivities];
    }

    const userIds = Array.from(
      new Set(userActivities.map((activity) => activity.userId))
    );
    const activityIds = Array.from(
      new Set(userActivities.map((activity) => activity.activityId))
    );

    const users = this.userRepo.findMultiple(userIds);
    const activities = this.activityRepo.findMultiple(activityIds);

    return userActivities.map((userActivity) =>
      seralizer(
        userActivity,
        activities.find(
          (activity) => activity.id === userActivity.activityId
        ) as Activity,
        users.find((user) => user.id === userActivity.userId) as User
      )
    );
  }
}
