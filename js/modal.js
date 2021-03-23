import { ff } from './forma.js';

import { setTypeClick } from './filter.js';
import { offersFromServer } from './api.js';
import { createListOffers } from './map.js';

const mainElement = document.querySelector('main');


const isEscEvent = (evt) => {
  return evt.key === ('Escape' || 'Esc');
};


const onEscKeyPress = (evt) => {

  if (isEscEvent(evt)) {
    evt.preventDefault();

    const successElement = document.querySelector('.success');
    const errorElement = document.querySelector('.error');

    if(successElement){
      successElement.classList.add('hidden');
    }
    else if(errorElement){
      errorElement.classList.add('hidden');
    }
  }
};


const onMouseDownPress = () => {
  const errorElement = document.querySelector('.error');
  const successElement = document.querySelector('.success');

  if(successElement){
    successElement.classList.add('hidden');
  }
  else if(errorElement){
    errorElement.classList.add('hidden');
  }
};




const sendSuccessAlert = () => {

  const successTemplate = document.querySelector('#success').content;
  const successMessage = successTemplate.querySelector('.success');
  const successElement = successMessage.cloneNode(true);

  mainElement.append(successElement);

  document.addEventListener('keydown', onEscKeyPress);
  document.addEventListener('mousedown',  onMouseDownPress);

  //---------------
  ff();
  //------------------

  setTimeout(() => {
    successElement.remove();
  }, 4000);

};


const sendErrorAlert = () => {

  const errorTemplate = document.querySelector('#error').content;
  const errorMessage = errorTemplate.querySelector('.error');
  const errorElement = errorMessage.cloneNode(true);

  mainElement.append(errorElement);

  const retryButton = errorElement.querySelector('.error__button');

  retryButton.addEventListener('click', () => {

    errorElement.classList.add('hidden');
  });


  document.addEventListener('keydown', onEscKeyPress);
  document.addEventListener('mousedown',  onMouseDownPress);


  setTimeout(() => {
    errorElement.remove();
  }, 4000);

};


export { sendSuccessAlert, sendErrorAlert, onEscKeyPress, onMouseDownPress };
