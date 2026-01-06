import { useEffect, useRef, useState, useCallback } from "react";

type WebSocketStatus = "CONNECTING" | "OPEN" | "CLOSED" | "ERROR";

interface UseWebSocketOptions<TSend = any> {
  url: string;
  onMessage?: (data: any) => void;
  onOpen?: () => void;
  onClose?: () => void;
  onError?: (e: Event) => void;
  autoConnect?: boolean;
}

export function useWebSocket<TSend = any>({
  url,
  onMessage,
  onOpen,
  onClose,
  onError,
  autoConnect = true,
}: UseWebSocketOptions<TSend>) {
  const wsRef = useRef<WebSocket | null>(null);
  const [status, setStatus] = useState<WebSocketStatus>("CLOSED");

  const connect = useCallback(() => {
    if (wsRef.current) return;

    setStatus("CONNECTING");
    const ws = new WebSocket(url);
    wsRef.current = ws;

    ws.onopen = () => {
      setStatus("OPEN");
      onOpen?.();
    };

    ws.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        onMessage?.(data);
      } catch {
        onMessage?.(event.data);
      }
    };

    ws.onerror = (e) => {
      setStatus("ERROR");
      onError?.(e);
    };

    ws.onclose = () => {
      setStatus("CLOSED");
      wsRef.current = null;
      onClose?.();
    };
  }, [url, onMessage, onOpen, onClose, onError]);

  const disconnect = useCallback(() => {
    wsRef.current?.close();
    wsRef.current = null;
  }, []);

  const send = useCallback((payload: TSend) => {
    if (wsRef.current?.readyState !== WebSocket.OPEN) return;

    wsRef.current.send(JSON.stringify(payload));
  }, []);

  useEffect(() => {
    if (autoConnect) connect();
    return () => disconnect();
  }, [connect, disconnect, autoConnect]);

  return {
    status,
    connect,
    disconnect,
    send,
    isConnected: status === "OPEN",
  };
}
