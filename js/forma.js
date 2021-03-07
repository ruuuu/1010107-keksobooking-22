import { sendData } from './api.js';
import { successAlert, errorAlert } from './modal.js';
import { recreateMarker } from './map.js';


const MIN_PRICES =  {
  'bungalow': 0,
  'flat': 1000,
  'house': 5000,
  'palace': 10000,
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


addressField.readOnly = true;
priceField.setAttribute('placeholder', MIN_PRICES['flat']);
priceField.setAttribute('min', MIN_PRICES['flat']);
selectCapacity.options[0].disabled = true;
selectCapacity.options[1].disabled = true;
selectCapacity.options[3].disabled = true;




const toggledForms = () => {
  forma.classList.toggle('ad-form--disabled');

  fieldsets.forEach((fieldset) => {
    fieldset.disabled = !fieldset.disabled;
    //console.log('fieldset.disabled ', fieldset.disabled);
  });


  filters.childNodes.forEach((filter) => {
    filter.disabled = !filter.disabled;
  });


  //console.log(filterFeatures.childNodes); // фичи в фильтрах
  filterFeatures.childNodes.forEach((feature) => {
    feature.disabled = !feature.disabled;
  });
}


const onValidateCountRooms = (evt) => {
  selectCapacity.options[0].disabled = false;
  selectCapacity.options[1].disabled = false;
  selectCapacity.options[2].disabled = false;
  selectCapacity.options[3].disabled = false;

  if(evt.target.value === '1'){
    //console.log('выбрала значение ', evt.target.value);
    selectCapacity.options[0].disabled = true;
    selectCapacity.options[1].disabled = true;
    selectCapacity.options[3].disabled = true;
  }


  if(evt.target.value === '2'){
    selectCapacity.options[0].disabled = true;
    selectCapacity.options[3].disabled = true;
  }


  if(evt.target.value === '3'){
    selectCapacity.options[3].disabled = true;
    //console.log('длина списка ', selectCapacity.options.length);
  }


  if(evt.target.value === '100'){
    selectCapacity.options[0].disabled = true;
    selectCapacity.options[1].disabled = true;
    selectCapacity.options[2].disabled = true;
  }

};





const onValidateCountGuests = (evt) => {
  //selectCapacity.value = evt.target.value;
  //console.log('selectCapacity.value = ' , selectCapacity.value);

  selectRoomsNumber.options[0].disabled = false;
  selectRoomsNumber.options[1].disabled = false;
  selectRoomsNumber.options[2].disabled = false;
  selectRoomsNumber.options[3].disabled = false;

  if(evt.target.value === '3'){
    selectRoomsNumber.options[0].disabled = true;
    selectRoomsNumber.options[1].disabled = true;
    selectRoomsNumber.options[3].disabled = true;
  }

  if(evt.target.value === '2'){
    selectRoomsNumber.options[0].disabled = true;
    selectRoomsNumber.options[3].disabled = true;
  }

  if(evt.target.value === '1'){
    selectRoomsNumber.options[3].disabled = true;
  }

  if(evt.target.value === '0'){
    selectRoomsNumber.options[0].disabled = true;
    selectRoomsNumber.options[1].disabled = true;
    selectRoomsNumber.options[2].disabled = true;
  }
};



const onValidateTitleField = () => {
  //console.log('titleField.validity = ', titleField.validity);

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
  //console.log(evt.target); // выведет разметку списка
  //console.log(evt.target.value); // <option value="flat"> </option>само значение 'flat' , 'house', 'washer'

  priceField.setAttribute('max', '1000000');
  priceField.value = '';
  priceField.setAttribute('min', MIN_PRICES[evt.target.value]);
  priceField.setAttribute('placeholder', MIN_PRICES[evt.target.value]);
};



const onValidatePriceField = () => {
  //console.log('MIN_PRICES[flat] = ', MIN_PRICES['flat']);

  if(priceField.value < MIN_PRICES['bungalow']){
    priceField.classList.add('border_for-error');
    //priceField.setCustomValidity('цена не должна быть меньше 0');
  }
  else if(priceField.value < MIN_PRICES['float']){
    //priceField.setCustomValidity('цена не должна быть меньше 1000');
    priceField.classList.add('border_for-error');
  }
  else if(priceField.value < MIN_PRICES['house']){
    //priceField.setCustomValidity('цена не должна быть меньше 5000');
    priceField.classList.add('border_for-error');
  }
  else if(priceField.value < MIN_PRICES['palace']){
    //priceField.setCustomValidity('цена не должна быть меньше 10000');
    priceField.classList.add('border_for-error');
  }
  else if(priceField.validity.valueMissing) { // если не заполнили поле
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

  titleField.value = '';

  selectType.options[1].selected = true;
  priceField.setAttribute('placeholder', '1000');
  priceField.setAttribute('min', MIN_PRICES['flat']);
  priceField.value = '';

  selectRoomsNumber.options[0].selected = true;
  selectCapacity.options[2].selected = true;

  selectCheckIn.options[0].selected = true;
  selectCheckOut.options[0].selected = true;
  descriptionField.value = '';

  featuresFields.forEach((feature) => {
    feature.checked = false;
  })

  selectRoomsNumber.options[0].disabled = false;
  selectRoomsNumber.options[1].disabled = false;
  selectRoomsNumber.options[2].disabled = false;
  selectRoomsNumber.options[3].disabled = false;

  selectCapacity.options[0].disabled = false;
  selectCapacity.options[1].disabled = false;
  selectCapacity.options[2].disabled = false;
  selectCapacity.options[3].disabled = false;

};



const setUserFormSubmit = () => {

  forma.addEventListener('submit', (evt) => {
    evt.preventDefault();

    sendData(
      () => successAlert(),
      () => errorAlert(),
      new FormData(evt.target), // body
    );
  });
};


forma.addEventListener('reset', () => {
  //console.log('нажали на кнопку сброса');
  clearFields();
  recreateMarker();
});


toggledForms();

setUserFormSubmit();



export { toggledForms,  setUserFormSubmit, forma, clearFields, addressField };


