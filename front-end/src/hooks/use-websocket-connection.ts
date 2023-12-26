import { useEffect, useState } from "react";

interface MessagePayload {
  event: string;
  pixChargeId: string;
  chargeId: string;
}

export const useWebsocketConnection = () => {
  const [messagePayload, setMessagePayload] = useState<MessagePayload>();

  useEffect(() => {
    const socket = new WebSocket("ws://127.0.0.1:8000");

    socket.onmessage = (event) => {
      const message = event.data;
      const messageObj = JSON.parse(message) as MessagePayload;
      setMessagePayload(messageObj);
    };

    return () => {
      socket.close();
    };
  }, []);

  return messagePayload;
};
