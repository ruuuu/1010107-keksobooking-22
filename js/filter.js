import { removePinMarkers } from './map.js';

const ANY_VALUE = 'any';

const filters = document.querySelector('.map__filters');

const filtersForma = document.querySelector('.map__filters');

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
        isCorrectPrice = offerr.offer.price < 10000;
        break;
      case 'middle':
        isCorrectPrice = offerr.offer.price >= 10000 && offerr.offer.price < 50000;
        break;
      case 'high':
        isCorrectPrice = offerr.offer.price >= 50000;
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


const setTypeClick = (сb) => {

  filters.addEventListener('change', () => {

    removePinMarkers();
    сb();
  });

};


export { getFiltredOffers, setTypeClick };
