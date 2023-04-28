import { TResponseData } from "../types/types";
import { checkResponse } from "./check-response";

const NORMA_API: string = "https://norma.nomoreparties.space/api";

export const request = (endpoint: string, options?: object): Promise<any> => {
  return fetch(`${NORMA_API}/${endpoint}`, options)
    .then(checkResponse)
    .then((data: Error | TResponseData) => {
      return data;
    });
};
