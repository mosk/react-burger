import type { Middleware, MiddlewareAPI } from "redux";
import type { TAppActions, TWSStoreActions, AppDispatch, RootState } from "../types/types";
import { getCookie } from "../utils/cookie";
import { TWSActions } from "./actions/ws-orders";

export const socketMiddleware = (wsUrl: string, wsActions: TWSStoreActions): Middleware => {
  return ((store: MiddlewareAPI<AppDispatch, RootState>) => {
    let socket: WebSocket | null = null;

    return (next) => (action: any) => {
      const { dispatch } = store;
      const { type } = action;
      const { wsInit, onOpen, onClose, onError, onMessage } = wsActions;

      const token: string | undefined = getCookie("token");

      if (type === wsInit && token) {
        socket = new WebSocket(`${wsUrl}?token=${token}`);
      }

      if (socket) {
        socket.onopen = (event) => {
          console.log(`open`);
          // dispatch({ type: onOpen, payload: event });
        };

        socket.onerror = (event) => {
          console.log(`error`);
          //dispatch({ type: onError, payload: event });
        };

        socket.onmessage = (event) => {
          const { data } = event;
          const parsedData: any = JSON.parse(data);
          const { success, ...restParsedData } = parsedData;

          console.log(parsedData);

          //dispatch({ type: onMessage, payload: { ...restParsedData } });
        };

        socket.onclose = (event) => {
          console.log(`close`);
          //dispatch({ type: onClose, payload: event });
        };
      }

      next(action);
    };
  }) as Middleware;
};
