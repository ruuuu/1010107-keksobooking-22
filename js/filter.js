import { removePinMarkers } from './map.js';

const ANY_VALUE = 'any';
const MIN_PRICE = 10000;
const MAX_PRICE = 50000;

const filters = document.querySelector('.map__filters');

const filtersForma = document.querySelector('.map__filters');

const filterItems = filtersForma.querySelectorAll('select, input');

const typeSelect = filtersForma.querySelector('#housing-type');

const priceSelect = filtersForma.querySelector('#housing-price');

const roomsSelect = filtersForma.querySelector('#housing-rooms');

const guestsSelect = filtersForma.querySelector('#housing-guests');

const featuresSelect = filtersForma.querySelector('#housing-features');



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


const checkFeatures = (offerr) => { //
  let isCorrectFeatures = true;
  const features = featuresSelect.querySelectorAll('input:checked');

  features.forEach((feature) => {
    if (offerr.offer.features.indexOf(feature.value) === -1) {
      isCorrectFeatures = false;
      return;
    }
  });

  return isCorrectFeatures;
};


const getFiltredOffers = (offers) => {

  const filteredOffers = offers.filter((offerr) => {
    return checkType(offerr) && checkPrice(offerr) && checkRooms(offerr) && checkGuests(offerr) && checkFeatures(offerr);
  });

  return filteredOffers.slice(0, 10);
};



const resetFilter = () => {
  filterItems.forEach(function (it) {
    it.value = 'any';
  });

  let featuresItems = featuresSelect.querySelectorAll('input');

  featuresItems.forEach(function (feature) {
    feature.checked = false;
  });
};


const setTypeClick = (сb) => {

  filters.addEventListener('change', () => {

    removePinMarkers();
    сb();
  });

};


export { getFiltredOffers, setTypeClick, resetFilter };
