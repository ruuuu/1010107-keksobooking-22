import { sendData } from './api.js';
import { successAlert, errorAlert } from './modal.js';
import { recreateMarker } from './map.js';


const MIN_PRICES =  {
  'bungalow': 0,
  'flat': 1000,
  'house': 5000,
  'palace': 10000,
};


const forma = document.querySelector('.ad-form'); // форма

const priceField = forma.querySelector('#price'); // поле Цена за ночь

const selectType = forma.querySelector('#type'); //  список Тип жилья

const selectCheckIn = forma.querySelector('#timein'); // список Заезд

const selectCheckOut = forma.querySelector('#timeout'); // список Выезд

const fieldsets = forma.querySelectorAll('fieldset');

const filters = document.querySelector('.map__filters'); // форма с фильтрами

const filterFeatures = filters.querySelector('.map__features'); // ['wash', 'conditioner', '']

const addressField = forma.querySelector('#address'); // поле Адрес

const titleField = forma.querySelector('#title'); //название офера

//const submitButton = forma.querySelector('.ad-form__submit');

const selectRoomsNumber = forma.querySelector('#room_number'); // Список Кол-во комнат

const selectCapacity = forma.querySelector('#capacity'); // Список Кол-во гостей(мест)

const descriptionField = forma.querySelector('#description'); // Описание

const featuresFields = forma.querySelectorAll('.feature__checkbox'); // список чекбоксов


addressField.readOnly = true; // нередактируемое поле

// нач состояние
priceField.setAttribute('placeholder', MIN_PRICES['flat']);
priceField.setAttribute('min', MIN_PRICES['flat']);


//нач состояние:
selectCapacity.options[0].disabled = true;
selectCapacity.options[1].disabled = true;
selectCapacity.options[3].disabled = true;



//состояние:
const toggledForms = () => {
  forma.classList.toggle('ad-form--disabled'); //  если  у формы есть класс, то его убирает, если нет, то добавляет

  fieldsets.forEach((fieldset) => { // пройдемся по всем fieldset
    fieldset.disabled = !fieldset.disabled;
    //console.log('fieldset.disabled ', fieldset.disabled);
  });

  //console.log(filters.childNodes);// вернет список дочерних дом эл-ов

  filters.childNodes.forEach((filter) => { // проходимся по всем выпад спискам
    filter.disabled = !filter.disabled;
  });


  //console.log(filterFeatures.childNodes);
  filterFeatures.childNodes.forEach((feature) => {
    feature.disabled = !feature.disabled;
  });
}


// const isFormaActive = () => {
//   const elemForma  = forma.classList.contains('ad-form--disabled');
//   return !(elemForma); //если содержит класс, то  false
// };



const onValidateCountRooms = (evt) => { // фукнция обработчик для колва комнат
  selectCapacity.options[0].disabled = false; // раздизейбливаем предыдущие значения
  selectCapacity.options[1].disabled = false;
  selectCapacity.options[2].disabled = false;
  selectCapacity.options[3].disabled = false;

  if(evt.target.value === '1'){ // если выбрали 1 команта, ind=0
    //console.log('выбрала значение ', evt.target.value);
    selectCapacity.options[0].disabled = true;
    selectCapacity.options[1].disabled = true;
    selectCapacity.options[3].disabled = true;
  }


  if(evt.target.value === '2'){ // если выбрали 2 команты, ind=1
    selectCapacity.options[0].disabled = true;
    selectCapacity.options[3].disabled = true;
  }


  if(evt.target.value === '3'){ // если выбрали 3 команты, ind=2
    selectCapacity.options[3].disabled = true;
    //console.log('длина списка ', selectCapacity.options.length);
  }


  if(evt.target.value === '100'){ // если выбрали 100 комант, ind=3
    selectCapacity.options[0].disabled = true;
    selectCapacity.options[1].disabled = true;
    selectCapacity.options[2].disabled = true;
  }

};





const onValidateCountGuests = (evt) => { //фукнция-обработчки для списка Кол-во гостей
  //selectCapacity.value = evt.target.value;
  //console.log('selectCapacity.value = ' , selectCapacity.value);

  selectRoomsNumber.options[0].disabled = false; // раздизейбливаем предыдущие значения
  selectRoomsNumber.options[1].disabled = false;
  selectRoomsNumber.options[2].disabled = false;
  selectRoomsNumber.options[3].disabled = false;

  if(evt.target.value === '3'){ // если выбрали 3 гостей
    selectRoomsNumber.options[0].disabled = true;
    selectRoomsNumber.options[1].disabled = true;
    selectRoomsNumber.options[3].disabled = true;
  }

  if(evt.target.value === '2'){ // если выбрали 2 гостей
    selectRoomsNumber.options[0].disabled = true;
    selectRoomsNumber.options[3].disabled = true;
  }

  if(evt.target.value === '1'){ // если выбрали 1 гостя
    selectRoomsNumber.options[3].disabled = true;
  }

  if(evt.target.value === '0'){ // если выбрали Не для гостей
    selectRoomsNumber.options[0].disabled = true;
    selectRoomsNumber.options[1].disabled = true;
    selectRoomsNumber.options[2].disabled = true;
  }
};



const onValidateTitleField = () => { // функция обработчика, для поля Название отеля
  //console.log(titleField.validity);

  if (titleField.validity.tooShort) {
    titleField.classList.add('border_for-error');
    //titleField.style.borderColor = 'green';
    titleField.setCustomValidity('Имя должно состоять минимум из 30-ти символов'); // отобразит наше сообщение вместо штатного
  }
  else if (titleField.validity.tooLong) {
    titleField.classList.add('border_for-error');
    titleField.setCustomValidity('Имя не должно превышать 100 символов');
  }
  else if (titleField.validity.valueMissing) { // если не заполнили поле
    titleField.classList.add('border_for-error');
    titleField.setCustomValidity('Обязательное поле');

  }
  else {
    titleField.setCustomValidity(''); // сбрасываем ошибку, когда уже ввели корреткное значение
    titleField.classList.remove('border_for-error');
  }
};


const onValidateSelectType = (evt) => { // фкнуия обработчик Тип жилья
  //console.log(evt.target); // выведет разметку списка
  //console.log(evt.target.value); // <option value="flat"> </option>само значение 'flat' , 'house', 'washer'

  priceField.setAttribute('max', '1000000');
  priceField.value = ''; // очищаем от предыдущего значения
  priceField.setAttribute('min', MIN_PRICES[evt.target.value]); // MIN_PRICES['flat']
  priceField.setAttribute('placeholder', MIN_PRICES[evt.target.value]);
};



const onValidatePriceField = () => { // фукнция обработчкиа для поля Цена
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



titleField.addEventListener('invalid', onValidateTitleField); //событие произойдет если в  поле ввели некорретное значние после того как нажмешь на кноку Отправить

selectType.addEventListener('change', onValidateSelectType);  // Тип жилья

priceField.addEventListener('invalid', onValidatePriceField); // вешаем обработчик на поле Цена

selectRoomsNumber.addEventListener('change', onValidateCountRooms); //  вешаем обработчик на список Кол-во комнат

selectCapacity.addEventListener('change', onValidateCountGuests); // вешаем обработчик на список Кол-во гостей

selectCheckIn.addEventListener('change', (evt) => { // вешаем обработчик на список Заезд
  selectCheckOut.value = evt.target.value;
});

selectCheckOut.addEventListener('change', (evt) => { // вешаем обработчик на список Выезд
  selectCheckIn.value = evt.target.value;
});


const clearFields = () => {

  titleField.value = ''; // очищаем

  selectType.options[1].selected = true; // Квартира
  // нач состояние
  priceField.setAttribute('placeholder', '1000');
  priceField.setAttribute('min', MIN_PRICES['flat']); // MIN_PRICES['flat']
  priceField.value = '';

  selectRoomsNumber.options[0].selected = true; // 1 комната
  selectCapacity.options[2].selected = true; // на 1 гостя

  selectCheckIn.options[0].selected = true; // 12:00
  selectCheckOut.options[0].selected = true; // 12:00
  descriptionField.value = '';

  featuresFields.forEach((feature) => { // снимам галочки с чекбоксов
    feature.checked = false;
  })

  selectRoomsNumber.options[0].disabled = false; // раздизейбливаем предыдущие значения
  selectRoomsNumber.options[1].disabled = false;
  selectRoomsNumber.options[2].disabled = false;
  selectRoomsNumber.options[3].disabled = false;

  selectCapacity.options[0].disabled = false; // раздизейбливаем предыдущие значения
  selectCapacity.options[1].disabled = false;
  selectCapacity.options[2].disabled = false;
  selectCapacity.options[3].disabled = false;

};



const setUserFormSubmit = () => {

  forma.addEventListener('submit', (evt) => {
    evt.preventDefault();
    //вызов функции:
    sendData(
      () => successAlert(),
      () => errorAlert(),
      new FormData(evt.target), // body
    );
  });
};


forma.addEventListener('reset', () => { // Нажатие на кноку Очистить
  //console.log('нажали на кнопку сброса');
  clearFields(); // очистка полей
  recreateMarker();
});

setUserFormSubmit();
//toggledForms();



export { toggledForms, setUserFormSubmit, forma, clearFields, addressField };


