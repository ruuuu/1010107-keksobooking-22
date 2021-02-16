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




selectType.addEventListener('change', (evt) => { // вешаем обработчик на список Тип жилья

  //console.log(evt.target); // выведет разметку списка
  //console.log(evt.target.value); // <option value="flat"> </option>само значение 'flat' , 'house', 'washer'

  priceField.setAttribute('max', '1000000');

  priceField.value = ' '; // очищаем от предыдущего значения
  priceField.setAttribute('min', MIN_PRICES[evt.target.value]);
  priceField.setAttribute('placeholder', MIN_PRICES[evt.target.value]);

});


selectCheckIn.addEventListener('change', (evt) => { // вешаем обработчик на список Заезд
  // console.log(evt.target); // выведет разметку списка
  // console.log(evt.target.value); // '14:00'

  selectCheckOut.value = evt.target.value;

});


selectCheckOut.addEventListener('change', (evt) => { // вешаем обработчик на список Выезд
  selectCheckIn.value = evt.target.value;
  
});