const forma = document.querySelector('.ad-form'); // форма

const priceField = forma.querySelector('#price'); // поле Цена за ночь

const selectType = forma.querySelector('#type'); //  список Тип жилья

const selectCheckIn = forma.querySelector('#timein'); // список Заезд

const selectCheckOut = forma.querySelector('#timeout'); // список Выезд



selectType.addEventListener('change', () => { // вешаем обработчик на список Тип жилья

  //console.log('элемент выбран');
  priceField.setAttribute('max', '1000000');

  if(selectType.value === 'flat'){
    priceField.value = ' '; // очищаем от предыдущего значения
    priceField.setAttribute('min', '1000');
    priceField.setAttribute('placeholder', '1000');
  }

  if(selectType.value === 'bungalow'){
    priceField.value = ' ';
    priceField.setAttribute('min', '0');
    priceField.setAttribute('placeholder', '0');
  }

  if(selectType.value === 'house'){
    priceField.value = ' ';
    priceField.setAttribute('min', '5000');
    priceField.setAttribute('placeholder', '5000');
  }

  if(selectType.value === 'palace'){
    priceField.value = ' ';
    priceField.setAttribute('min', '10000');
    priceField.setAttribute('placeholder', '10000');
  }

});


selectCheckIn.addEventListener('change', () => { // вешаем событие на список Заезд

  if(selectCheckIn.value === '12:00'){
    selectCheckOut.value = '12:00';
  }

  if(selectCheckIn.value === '13:00'){
    selectCheckOut.value = '13:00';
  }

  if(selectCheckIn.value === '14:00'){
    selectCheckOut.value = '14:00';
  }

});



selectCheckOut.addEventListener('change', () => { // вешаем событие на список Выезд

  if(selectCheckOut.value === '12:00'){
    selectCheckIn.value = '12:00';
  }

  if(selectCheckOut.value === '13:00'){
    selectCheckIn.value = '13:00';
  }

  if(selectCheckOut.value === '14:00'){
    selectCheckIn.value = '14:00';
  }

});