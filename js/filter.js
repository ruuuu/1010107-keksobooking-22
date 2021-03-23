import { removePinMarkers, arrayPinMarkers } from './map.js';
import {  createListOffers } from './map.js';
import {  offersFromServer } from './api.js';

const ANY_VALUE = 'any';
const MIN_PRICE = 10000;
const MAX_PRICE = 50000;

const filters = document.querySelector('.map__filters'); //  форма с фильтрами

const filterItems = filters.querySelectorAll('select, input'); // [ select, select, select, select, input, input, input, input]

const typeSelect = filters.querySelector('#housing-type'); // список Тип жилья

const priceSelect = filters.querySelector('#housing-price'); // список Цены

const roomsSelect = filters.querySelector('#housing-rooms'); // список колво комнат

const guestsSelect = filters.querySelector('#housing-guests'); // список число готсей

const featuresSelect = filters.querySelector('#housing-features'); // контейнер для  фич (чекбоксы)

const ch =  featuresSelect.querySelector('.map__checkbox');
console.log('ch = ', ch);


const checkType = (offerr) => {
  return typeSelect.value === ANY_VALUE ? true : typeSelect.value === offerr.offer.type;
};


const checkPrice = (offerr) => {
  let isCorrectPrice = true;

  if (priceSelect.value !== ANY_VALUE) {
    switch (priceSelect.value) {
      case 'low':
        isCorrectPrice = offerr.offer.price < MIN_PRICE;
        break;
      case 'middle':
        isCorrectPrice = offerr.offer.price >= MIN_PRICE && offerr.offer.price < MAX_PRICE;
        break;
      case 'high':
        isCorrectPrice = offerr.offer.price >= MAX_PRICE;
    }
  }

  return isCorrectPrice;
};


const checkRooms = (offerr) => {

  return roomsSelect.value === ANY_VALUE ? true : parseInt(roomsSelect.value, 10) === parseInt(offerr.offer.rooms, 10);
};


const checkGuests = (offerr) => {

  return guestsSelect.value === ANY_VALUE ? true : parseInt(guestsSelect.value, 10) === parseInt(offerr.offer.guests, 10);
};


const checkFeatures = (offerr) => { // фильтр фич, предаем объект
  let isCorrectFeatures = true;
  const features = featuresSelect.querySelectorAll('input:checked'); //в featuresSelect- контейнер для  фич (чекбоксы)

  console.log('features = ', features); // [input#filter-wifi, input#filter-dishwasher, input#filter-parking]

  features.forEach((feature) => { //
    if (offerr.offer.features.indexOf(feature.value) === -1) {
      isCorrectFeatures = false;
      return;
    }
  });

  return isCorrectFeatures;
};


const getFiltredOffers = (offers) => { // возвращает отфильтрованные оферы, вызваем этот метод в Map.js
  console.log('фильтр');

  const filteredOffers = offers.filter((offerr) => { // для каждого офера
    return checkType(offerr) && checkPrice(offerr) && checkRooms(offerr) && checkGuests(offerr) && checkFeatures(offerr);
  }); // возвращает отфильрованные оферы

  console.log('filteredOffers ', filteredOffers);

  return filteredOffers.slice(0, 10); // берем 10 штук
};



const resetFilter = () => { // сброс фильтров

  filterItems.forEach((item) => { //  [select, select, select, select, input, input, input, input, input]
    item.value = 'any';
  });

  let featuresItems = featuresSelect.querySelectorAll('input'); // фичи

  featuresItems.forEach((feature) => { // фичи,  [input, input, input, input, input]
    feature.checked = false;
  });



};


const setTypeClick = (сb) => { // cb = () => createListOffers(offers)

  filters.addEventListener('change', () => { // обработчик нажатия фильтров
    console.log('нажала на фильтр');

    removePinMarkers(); // при перерисовки, старые метки удаляем
    сb();

  });




};




export { getFiltredOffers, setTypeClick, resetFilter };
