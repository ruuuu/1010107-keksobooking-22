/* global _:readonly */
import { createListOffers, recreateMarker , map} from './map.js';
import { showAlert } from './util.js';
import { setTypeClick } from './filter.js';
import { toggledForms,  clearFields } from './forma.js';

const RERENDER_DELAY = 500;
const URL = 'https://22.javascript.pages.academy/keksobooking';


const getData = () => {

  fetch(URL + '/data?limit=100')

    .then((response) => {
      if(response.ok) {
        if(response){
          toggledForms();
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
      createListOffers(offers.slice(0, 10));
      setTypeClick(_.debounce(() => createListOffers(offers)), RERENDER_DELAY);
    });

};





const sendData = (successAlert, errorAlert, body) => {

  fetch(URL,
    {
      method: 'POST',
      body,
    },
  )
    .then((response) => {
      if (response.ok) {
        successAlert();
        clearFields();
        recreateMarker();
      }
      else {
        errorAlert();
      }
      return response.json();
    })
    .catch(() => {
      showAlert('Не удалось отправить форму. Попробуйте ещё раз');
    });
};

getData();



export { sendData };
