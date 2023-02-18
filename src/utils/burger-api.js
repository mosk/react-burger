import { checkResponse } from './check-response';

const NORMA_API = `https://norma.nomoreparties.space/api`;

export const request = (endpoint, options) => {
  return fetch(`${NORMA_API}/${endpoint}`, options)
    .then(checkResponse)
    .then((data) => {
      return data;
    })
};
