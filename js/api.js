import { clearFields } from './forma.js';
import { createListOffers, recreateMarker } from './map.js';
import { showAlert } from './util.js';

let offerss = [];

const getData = () => {

  fetch('https://22.javascript.pages.academy/keksobooking/data?limit=100') // сервер
    .then((response) => {
      //console.log('response = ', response);
      if(response.ok) {  // если ответ пришел
        //console.log('Данные получены с сервера');
        return response.json(); // получиили список объектов с сервера [{},{},{},{}]
      }
      else {
        //console.log('Данные  НЕ получены с сервера'); // вызов фукнции
        showAlert('Ошибка загрузки данных. Попробуйте снова');
      }
    })
    .catch(() => {
      showAlert('С сервера пришли необъявления, попробуйте обратиться к бэкенду');
    })
    .then((offers) => { // передаем список серверных объявлений [{},{},{}]
      //console.log('offers ', offers);
      offerss = offers; // серверные объявления

      createListOffers(offers); // вызов функции


      // const filteredListOffers = getFiltredOffers(offers); // отфильтрованный список оферов
      // console.log('filteredListOffers ', filteredListOffers);

      //setTypeHouseClick(() => createListOffers(offers)); // передаем  отфильтрованный список оферов

    });

};





const sendData = (successAlert, errorAlert, body) => {

  // для отправки формы метод POST:
  fetch(
    'https://22.javascript.pages.academy/keksobooking', // отправляем json сюда
    {
      method: 'POST',
      body,
      // тип multipart/form-data
    },
  )
    .then((response) => { // объект
      //console.log('response', response);
      //console.log('response.json() ', response.json());
      if (response.ok) {
        successAlert();
        clearFields(); // чисти поля
        recreateMarker(); // возвращаем метку на место
      }
      else {
        errorAlert();
      }
      return response.json();
    })
    .catch(() => { //err при ошибке отрпавки данных
      //console.log(err);
      showAlert('Не удалось отправить форму. Попробуйте ещё раз');
    });

};

getData();



export { sendData, offerss, createListOffers };
