'use client';

import { useCallback, useEffect, useState } from 'react';

export default function useWebSocket<Message>(
  url: string
): [WebSocket | null, Message | null] {
  const [socket, setSocket] = useState<WebSocket | null>(null);
  const [message, setMessage] = useState<Message | null>(null);

  useEffect(() => {
    const ws = new WebSocket(url);
    setSocket(ws);
    setSocketValue(ws);
  }, [url]);

  const setSocketValue = useCallback((ws: WebSocket | null) => {
    if (!ws) return;

    ws.addEventListener('open', function (event) {
      console.log('WebSocket connection established.');
    });

    ws.addEventListener('close', function (event) {
      console.log('WebSocket connection closed.');
    });

    ws.addEventListener('message', function (event) {
      setMessage(JSON.parse(event.data));
    });
  }, []);

  return [socket, message];
}
