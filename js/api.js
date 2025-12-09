const BASE_URL = 'https://29.javascript.htmlacademy.pro/kekstagram';

const Route = {
  GET_API_DATA: '/data',
  SEND_API_DATA: '/'
};
const Methods = {
  GET: 'GET',
  POST: 'POST'
};

const load = (route, method = Methods.GET, body = null) => fetch(
  `${BASE_URL}${route}`,
  {method, body}
)
  .then((response) => {
    if (response.ok) {
      return response.json();
    }

    throw new Error(`Ошибка: ${response.status} - ${response.statusText}`);
  })
  .catch((error) => {
    throw new Error(error.message);
  });

const getData = () => load(Route.GET_API_DATA);

const sendData = (body) => load(Route.SEND_API_DATA, Methods.POST, body);

export {getData, sendData};
