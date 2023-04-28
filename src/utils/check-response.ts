import { TCustomResponse } from "../types/types";

export const checkResponse = (res: TCustomResponse): Promise<any> => {
  return res.ok || res.success === true ? res.json() : res.json().then((err: Error) => Promise.reject(err.message));
};
