export const checkResponse = (res) => {
  return res.ok || res.success === true
    ? res.json()
    : res.json().then((err) => Promise.reject(err.message));
};
