import { showMessage } from './util.js';
import { Message } from './upload-form.js';

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
        throw new Error();
      }
      return response.json();
    })
    .catch(() => {
      showMessage(message);
    });

const getData = () => load(Route.GET_DATA, Message.DATA_ERROR);

const sendData = (body) => load(Route.POST_DATA, null, Method.POST, body);

export { getData, sendData };
