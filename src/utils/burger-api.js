const NORMA_API = `https://norma.nomoreparties.space/api`;

const getData = (dataName) => {
	return (
		fetch(`${NORMA_API}/${dataName}`)
			.then((res) => res.json())
			.then((data) => {
			  if (data?.success) return data.data;
			  return Promise.reject(data);
			})
			.catch(() => alert("Во время загрузки ингредиентов произошла ошибка."))
	)
};

export default getData;