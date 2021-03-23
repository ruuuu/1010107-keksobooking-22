import { createListOffers, recreateMarker , map} from './map.js';
import { showAlert } from './util.js';
import { setTypeClick } from './filter.js';
import { activateForms,  clearFields } from './forma.js';

const RERENDER_DELAY = 500;
const URL = 'https://22.javascript.pages.academy/keksobooking';
let offersFromServer;

const getData = () => {

  fetch(URL + '/data?limit=100')

    .then((response) => {
      if(response.ok) {
        console.log('response = ', response);
        if(response){
          activateForms();
        }
        return response.json();
      }
      else {
        map.remove();
        showAlert('Ошибка загрузки данных. Попробуйте снова');
      }
    })

    .catch(() => {
      showAlert('С сервера пришли необъявления, попробуйте обратиться к бэкенду');
    })
    .then((offers) => {
      offersFromServer = offers;
      createListOffers(offersFromServer.slice(0, 10));
      setTypeClick(_.debounce(() => createListOffers(offersFromServer)), RERENDER_DELAY); // перерисовывает метки

    });

};





const sendData = (sendSuccessAlert, sendErrorAlert, body) => {

  fetch(URL, //+ '1',
    {
      method: 'POST',
      body,
    },
  )
    .then((response) => {
      if (response.ok) {
        sendSuccessAlert();
        clearFields();
        recreateMarker();
      }
      else {
        sendErrorAlert();
      }
      return response.json();
    })
    .catch(() => {
      showAlert('Не удалось отправить форму. Попробуйте ещё раз');
    });
};

getData();



export { sendData, offersFromServer, getData };
