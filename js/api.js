/* global _:readonly */
import { createListOffers, recreateMarker , map} from './map.js';
import { showAlert } from './util.js';
import { setTypeClick } from './filter.js';
import { toggledForms, clearFields } from './forma.js';

const RERENDER_DELAY = 500;




const getData = () => {


  fetch('https://22.javascript.pages.academy/keksobooking/data?limit=100')

    .then((response) => {
      //console.log('response = ', response);
      if(response.ok) {
        //console.log('Данные получены с сервера');

        if(response){
          toggledForms();
        }
        return response.json();
      }
      else {
        //console.log('Данные  НЕ получены с сервера');
        map.remove();
        showAlert('Ошибка загрузки данных. Попробуйте снова');
      }
    })
    .catch(() => {
      showAlert('С сервера пришли необъявления, попробуйте обратиться к бэкенду');
    })
    .then((offers) => {
      //console.log('offers ', offers.slice(0, 10));
      createListOffers(offers.slice(0, 10));
      setTypeClick(_.debounce(() => createListOffers(offers)), RERENDER_DELAY);
    });

};





const sendData = (successAlert, errorAlert, body) => {

  fetch(
    'https://22.javascript.pages.academy/keksobooking',
    {
      method: 'POST',
      body,
    },
  )
    .then((response) => {
      //console.log('response', response);
      //console.log('response.json() ', response.json());
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
      //console.log(err);
      showAlert('Не удалось отправить форму. Попробуйте ещё раз');
    });
};



getData();



export { sendData };
