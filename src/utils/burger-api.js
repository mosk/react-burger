const NORMA_API = `https://norma.nomoreparties.space/api`;

export const getData = (dataName = `ingredients`) => {
  return fetch(`${NORMA_API}/${dataName}`)
    .then((res) => res.json())
    .then((data) => {
      if (data?.success) return data.data;
      return Promise.reject(data);
    })
    .catch(() => alert("Во время загрузки ингредиентов произошла ошибка."));
};