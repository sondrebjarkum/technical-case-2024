'use client';

import Card from '@/components/Card';
import useWebSocket from '@/hooks/useWebSocket';
import { Statistic } from '@/types/models/statistic';
import { UserActivity } from '@/types/models/user-activity';
import { useEffect, useState } from 'react';

export default function DashboardPage({
  statistics,
}: {
  statistics: Statistic[] | null;
}) {
  const [, message] = useWebSocket<any>('ws://localhost:8000/');

  const [userActivities, setUserActivities] = useState<UserActivity[]>([]);
  const [usersStatistics, setUsersStatistics] = useState<Statistic[]>(
    statistics || []
  );

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          'http://localhost:3000/api/user-activities'
        );
        if (response.ok) {
          const responseData = await response.json();
          setUserActivities(responseData);
        } else {
          console.error('Failed to fetch activities:', response.status);
        }
      } catch (error) {
        console.error('Error fetching activities:', error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const data = message?.data;
    const type = message?.type;

    if (data && type) {
      if (type === 'user-activity-created') {
        setUserActivities((prev) => {
          let updatedActivities = prev ? [...prev, data] : [data];
          if (updatedActivities.length > 10) {
            // Max out at 10 entries
            updatedActivities = updatedActivities.slice(-10);
          }
          return updatedActivities;
        });
      }

      if (type === 'statistics') {
        if (usersStatistics === null) {
          setUsersStatistics([data]);
        } else {
          const updatedUsersStatistics = [...usersStatistics];
          const index = updatedUsersStatistics.findIndex(
            (userStat) => userStat.user.id === data.user.id
          );
          if (index !== -1) {
            updatedUsersStatistics[index] = data;
            setUsersStatistics(updatedUsersStatistics);
          } else {
            setUsersStatistics((prev) => (prev ? [...prev, data] : [data]));
          }
        }
      }
    }
  }, [message]);

  return (
    <main className='flex min-h-screen flex-col items-center justify-between p-8'>
      <div className='container bg-base-300'>
        <div className='gap8 flex flex-col p-8'>
          <div>
            <h1>Leaderboard</h1>
            <div className='flex flex-wrap gap-4 p-8'>
              {usersStatistics ? (
                usersStatistics.map((stat) => (
                  <Card key={stat.user.email}>
                    <p>{stat?.user.name}</p>
                    <p>Total {stat.points.total}</p>
                  </Card>
                ))
              ) : (
                <span className='loading loading-spinner loading-md'></span>
              )}
            </div>
          </div>
          <div>
            <h1>New Activities</h1>
            <div className='flex h-80 flex-col items-stretch gap-4 overflow-y-scroll p-8'>
              {userActivities && userActivities.length ? (
                userActivities.reverse().map((userActivity) => {
                  return (
                    <Card key={userActivity.user.email + userActivity.id}>
                      <p>{userActivity.user.name}</p>
                      <p>
                        {userActivity.activity.name} -{' '}
                        {new Date(userActivity.timestamp).toLocaleString()}
                      </p>
                      <p>+{userActivity.activity.points} points!</p>
                    </Card>
                  );
                })
              ) : (
                <p>No activities yet!</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export async function getServerSideProps() {
  try {
    const statistics = await fetch(
      'http://localhost:8000/user-activities/statistics'
    );

    return {
      props: {
        statistics: await statistics.json(),
      },
    };
  } catch (error) {
    return {
      props: {
        statistics: null,
      },
    };
  }
}
