import { sendData, offersFromServer } from './api.js';
import { sendSuccessAlert, sendErrorAlert } from './modal.js';
import { recreateMarker, createListOffers } from './map.js';
import { resetFilter } from './filter.js';



const MIN_PRICES =  {
  'bungalow': 0,
  'flat': 1000,
  'house': 5000,
  'palace': 10000,
};

const RoomsCount = {
  1: [1],
  2: [1, 2],
  3: [1, 2, 3],
  100: [0],
};

const forma = document.querySelector('.ad-form');

const priceField = forma.querySelector('#price');

const selectType = forma.querySelector('#type');

const selectCheckIn = forma.querySelector('#timein');

const selectCheckOut = forma.querySelector('#timeout');

const fieldsets = forma.querySelectorAll('fieldset');

const filters = document.querySelector('.map__filters');

const filterFeatures = filters.querySelector('.map__features');

const addressField = forma.querySelector('#address');

const titleField = forma.querySelector('#title');

const selectRoomsNumber = forma.querySelector('#room_number');

const selectCapacity = forma.querySelector('#capacity');

const descriptionField = forma.querySelector('#description');

const featuresFields = forma.querySelectorAll('.feature__checkbox');

const resetButton = forma.querySelector('.ad-form__reset');




const init = () => {

  addressField.readOnly = true;
  titleField.value = '';
  selectType.options[1].selected = true;
  priceField.setAttribute('placeholder', MIN_PRICES['flat']);
  priceField.setAttribute('min', MIN_PRICES['flat']);
  priceField.value = '';

  selectRoomsNumber.options[0].selected = true;
  selectCapacity.options[2].selected = true; //
  selectCapacity.options[2].disabled = false;

  selectCheckIn.options[0].selected = true;
  selectCheckOut.options[0].selected = true;
  descriptionField.value = '';

  featuresFields.forEach((feature) => {
    feature.checked = false;
  });

  for(let i = 0;  i < selectRoomsNumber.length; i++){
    selectRoomsNumber.options[i].disabled = false;
  }

  for(let i = 0;  i < selectCapacity.length; i++){
    if(i !== 2){
      selectCapacity.options[i].disabled = true;
    }
  }
};




const activateForms = () => {
  forma.classList.toggle('ad-form--disabled');

  fieldsets.forEach((fieldset) => {
    fieldset.disabled = !fieldset.disabled;
  });

  filters.childNodes.forEach((filter) => {
    filter.disabled = !filter.disabled;
  });

  filterFeatures.childNodes.forEach((feature) => {
    feature.disabled = !feature.disabled;
  });
}


const disableСapacityOptions = (value) => {

  const capacityOptions = selectCapacity.querySelectorAll('option');

  capacityOptions.forEach((option) => {
    option.disabled = true;
  });

  RoomsCount[value].forEach( (option) => {
    selectCapacity.querySelector('option' + '[value="' + option + '"]').disabled = false;
    selectCapacity.value = option;
  });


};



const onValidateCountRooms = (evt) => {

  disableСapacityOptions(evt.target.value);

};



const onValidateCountGuests = (evt) => {

  for(let i = 0;  i < selectRoomsNumber.length; i++){
    selectRoomsNumber.options[i].disabled = false;
  }

  switch(evt.target.value) {
    case '3':
      for(let i = 0;  i < selectRoomsNumber.length; i++){
        if (i !== 2){
          selectRoomsNumber.options[i].disabled = true;
        }
      }
      break;

    case '2':
      for(let i = 0;  i < selectRoomsNumber.length; i++){
        if (i === 0 ||  i === 3){
          selectRoomsNumber.options[i].disabled = true;
        }
      }
      break;

    case '1':
      selectRoomsNumber.options[3].disabled = true;
      break;

    case '0':
      for(let i = 0;  i < selectRoomsNumber.length; i++){
        if (i !== 3){
          selectRoomsNumber.options[i].disabled = false;
        }
      }
      break;
  }
};



const onValidateTitleField = () => {

  if (titleField.validity.tooShort) {
    titleField.classList.add('border_for-error');
    titleField.setCustomValidity('Имя должно состоять минимум из 30-ти символов');
  }
  else if (titleField.validity.tooLong) {
    titleField.classList.add('border_for-error');
    titleField.setCustomValidity('Имя не должно превышать 100 символов');
  }
  else if (titleField.validity.valueMissing) {
    titleField.classList.add('border_for-error');
    titleField.setCustomValidity('Обязательное поле');
  }
  titleField.setCustomValidity('');
  titleField.classList.remove('border_for-error');

};


const onValidateSelectType = (evt) => {
  priceField.setAttribute('max', '1000000');
  priceField.value = '';
  priceField.setAttribute('min', MIN_PRICES[evt.target.value]);
  priceField.setAttribute('placeholder', MIN_PRICES[evt.target.value]);
};



const onValidatePriceField = () => {

  if(priceField.value < MIN_PRICES['bungalow']){
    priceField.classList.add('border_for-error');
  }
  else if(priceField.value < MIN_PRICES['float']){
    priceField.classList.add('border_for-error');
  }
  else if(priceField.value < MIN_PRICES['house']){
    priceField.classList.add('border_for-error');
  }
  else if(priceField.value < MIN_PRICES['palace']){
    priceField.classList.add('border_for-error');
  }
  else if(priceField.validity.valueMissing) {
    priceField.setCustomValidity('Обязательное поле');
    priceField.classList.add('border_for-error');
  }
  else {
    priceField.classList.remove('border_for-error');
    priceField.setCustomValidity('');
  }
};



titleField.addEventListener('invalid', onValidateTitleField);

selectType.addEventListener('change', onValidateSelectType);

priceField.addEventListener('invalid', onValidatePriceField);

selectRoomsNumber.addEventListener('change', onValidateCountRooms);

selectCapacity.addEventListener('change', onValidateCountGuests);


selectCheckIn.addEventListener('change', (evt) => {
  selectCheckOut.value = evt.target.value;
});


selectCheckOut.addEventListener('change', (evt) => {
  selectCheckIn.value = evt.target.value;
});


const clearFields = () => {
  init();
};



const setUserFormSubmit = () => {

  forma.addEventListener('submit', (evt) => {
    evt.preventDefault();
    sendData(
      () => sendSuccessAlert(),
      () => sendErrorAlert(),
      new FormData(evt.target),
    );
    resetFilter();
    createListOffers(offersFromServer.slice(0, 10));
    selectCapacity.options[2].disabled = false;
  });

};


resetButton.addEventListener('click', () => {

  clearFields();
  recreateMarker();
  resetFilter();
  createListOffers(offersFromServer.slice(0, 10));

});


init();
activateForms();
setUserFormSubmit();



export { activateForms, setUserFormSubmit, forma, clearFields, addressField };


