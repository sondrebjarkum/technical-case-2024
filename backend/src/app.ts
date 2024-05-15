import express from 'express';
import expressWs from 'express-ws';
import eventEmitter from './emitter';
import { UserActivityRepository } from './repositories/user-activity';
import { Events } from './constants/events';

const server = express();
const port = 8000;
const app = expressWs(server).app;

export const connections: Set<WebSocket> = new Set();

const userActivityRepository = new UserActivityRepository();

const broadcast = (data: object) => {
  connections.forEach((ws) => {
    try {
      ws.send(JSON.stringify(data));
    } catch (error) {
      connections.delete(ws);
    }
  });
};

eventEmitter.on(Events.UserActivityCreated, (data) => {
  const statistics = userActivityRepository.findOneByUserAsStatistics(
    data.userId
  );

  const userActivity = userActivityRepository.serialize(data)[0];

  broadcast({ data: statistics, type: Events.Statistics });
  broadcast({ data: userActivity, type: Events.UserActivityCreated });
});

app.ws('/', (ws) => {
  connections.add(ws as unknown as WebSocket);

  ws.on('close', () => {
    connections.delete(ws as unknown as WebSocket);
  });
});

app.get('/user-activities/statistics', (_, res) => {
  const activities = userActivityRepository.findAllAsStatistics();
  res.status(200).json(activities);
});

app.get('/user-activities', (_, res) => {
  const activities = userActivityRepository.findAll();
  const latestTenEntries = activities.slice(
    activities.length - 11,
    activities.length - 1
  );
  res.status(200).json(latestTenEntries);
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
