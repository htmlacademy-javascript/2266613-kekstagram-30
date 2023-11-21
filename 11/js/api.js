import { showMessage, Message } from './uploadForm.js';

const BASE_URL = 'https://30.javascript.pages.academy/kekstagram';

const Route = {
  GET_DATA: '/data',
  POST_DATA: '/',
};

const Method = {
  GET: 'GET',
  POST: 'POST',
};

const load = (route, message = null, method = Method.GET, body = null) =>
  fetch(`${BASE_URL}${route}`, {method, body})
    .then((response) => {
      if (!response.ok) {
        throw new Error(`Произошла ошибка ${response.status}: ${response.statusText}`);
      }
      return response.json();
    })
    .catch((err) => {
      throw new Error(showMessage(message) ?? err.message);
    });

const getData = () => load(Route.GET_DATA, Message.dataError);

const sendData = (body) => load(Route.POST_DATA, null, Method.POST, body); // если не передаю сюда null, то параметры передаются неправильно, не могу понять как это исправить...

export { getData, sendData };
