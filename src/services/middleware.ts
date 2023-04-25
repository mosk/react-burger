import type { Middleware, MiddlewareAPI } from "redux";
import type { TWSStoreActions, AppDispatch, RootState } from "../types/types";
import { getCookie } from "../utils/cookie";

export const socketMiddleware = (wsUrl: string, wsActions: TWSStoreActions): Middleware => {
  return ((store: MiddlewareAPI<AppDispatch, RootState>) => {
    let socket: WebSocket | null = null;

    return (next) => (action: any) => {
      const { dispatch } = store;
      const { type } = action;
      const { wsInit, onOpen, onClose, onError, onMessage } = wsActions;

      const token: string | undefined = getCookie("token");

      if (type === wsInit) {
        if (action.payload) {
          socket = new WebSocket(`${wsUrl}${action.payload}`);
        } else if (token) {
          socket = new WebSocket(`${wsUrl}?token=${token}`);
        }
      }

      if (socket) {
        socket.onopen = (event: Event) => {
          console.log(`open`);
          dispatch({ type: onOpen, payload: event });
        };

        socket.onerror = (event: any) => {
          console.log(`error`);
          dispatch({ type: onError, payload: event });
        };

        socket.onmessage = (event: MessageEvent) => {
          console.log(`message`);
          const { data } = event;
          const parsedData: any = JSON.parse(data);

          dispatch({ type: onMessage, payload: { ...parsedData } });
        };

        socket.onclose = (event: CloseEvent) => {
          console.log(`close`);
          dispatch({ type: onClose, payload: event });
        };
      }

      next(action);
    };
  }) as Middleware;
};
