import { removePinMarkers } from './map.js';



const ANY_VALUE = 'any'; // для фильтров

const filters = document.querySelector('.map__filters'); // форма с фильтрами

const filtersForma = document.querySelector('.map__filters');

const typeSelect = filtersForma.querySelector('#housing-type'); //Фильтер Тип жилья

const priceSelect = filtersForma.querySelector('#housing-price'); //Фильтер Тип жилья

const roomsSelect = filtersForma.querySelector('#housing-rooms'); // фильтр Число комнат

const guestsSelect = filtersForma.querySelector('#housing-guests'); // фильтр Число гостей

const featuresSelect = filtersForma.querySelector('#housing-features'); //контейнер для  фильтра Фич



const checkType = (offerr) => { // передаем объявление
  //console.log('typeSelect.value из checkType', typeSelect.value);
  return typeSelect.value === ANY_VALUE ? true : typeSelect.value === offerr.offer.type;
};


const checkPrice = (offerr) => { //  передаем  текущее объявление, для фильтра Цена
  let isCorrectPrice = true; // нач значение

  if (priceSelect.value !== ANY_VALUE) {
    switch (priceSelect.value) { // то что выбрали в списке
      case 'low': // если priceSelect.value = low
        isCorrectPrice = offerr.offer.price < 10000; // truе/false
        break;
      case 'middle':
        isCorrectPrice = offerr.offer.price >= 10000 && offerr.offer.price < 50000;
        break;
      case 'high':
        isCorrectPrice = offerr.offer.price >= 50000;
    }
  }

  return isCorrectPrice; // true/false
};


const checkRooms = (offerr) => { // передаем объявление
  //console.log('typeof(roomsSelect.value) = ', typeof(roomsSelect.value));
  //console.log('typeof(offerr.offer.rooms) = ', typeof(offerr.offer.rooms));

  return roomsSelect.value === ANY_VALUE ? true : parseInt(roomsSelect.value, 10) === parseInt(offerr.offer.rooms, 10); // true/false
};


const checkGuests = (offerr) => { // передаем объявление
  //console.log('typeof(roomsSelect.value) = ', typeof(roomsSelect.value));
  //console.log('typeof(offerr.offer.rooms) = ', typeof(offerr.offer.rooms));

  return guestsSelect.value === ANY_VALUE ? true : parseInt(guestsSelect.value, 10) === parseInt(offerr.offer.guests, 10); // true/false
};


const checkFeatures = (offerr) => { // для  фильтра Фич
  let isCorrectFeatures = true; // нач значение
  const features = featuresSelect.querySelectorAll('input:checked'); // находим все инпуты вfeaturesSelect
  //console.log('features = ', features); // [input#filter-wifi, input#filter-dishwasher input#filter-parking]

  features.forEach((feature) => { // проходимся по всем фичам
    if (offerr.offer.features.indexOf(feature.value) === -1) {
      isCorrectFeatures = false;
      return;
    }
  });

  return isCorrectFeatures; // true/false
};


const getFiltredOffers = (offers) => { // передаем исходный список,  возвращает отфильрованный массив

  //console.log('зашли в getFiltredOffers, offers =',  offers);

  const filteredOffers = offers.filter((offerr) => { // получаем отсортированный массив
    return checkType(offerr) && checkPrice(offerr) && checkRooms(offerr) && checkGuests(offerr) && checkFeatures(offerr); // вернет только те элемент на котрых checkType(advert) вернет true
  });

  //console.log('filteredOffers ', filteredOffers);

  return filteredOffers.slice(0, 10); // 10 объявлений только
};


const setTypeHouseClick = (сb) => { //при выборе фильтра, будет вызываться cb() = createListOffers(filteredArrayOffers)

  filters.addEventListener('change', (evt) => {
    //debugger;
    removePinMarkers();
    //console.log('нажали на список');

    filters.value = evt.target.value; // сохраняем то, что выбрали из списка
    //console.log('filters.value = ', typeSelect.value); // 'flat'

    сb(); // вызваем createListOffers(filteredArrayOffers)
  });

};


export { getFiltredOffers, setTypeHouseClick };
