import { createFeatureElements, createPhotoElements, createTypeElem } from './similar-list.js';
import { addressField } from './forma.js';
import { onEscKeyPress,  onMouseDownPress } from './modal.js';
import { getFiltredOffers } from './filter.js';


document.removeEventListener('keydown', onEscKeyPress); // снимаем обработчик когда нет сообщеий
document.removeEventListener('mousedown',  onMouseDownPress); // снимаем обработчик когда нет сообщеий
let arrayPinMarkers = [];


/* global L:readonly */
const map = L.map('map-canvas')

map.on('load', () => {

  //console.log('карта загружена');
  L.tileLayer(
    'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
    {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    },
  ).addTo(map)
})



map.on('error', () => {
  map.remove();
})


map.setView({
  lat: 35.70,
  lng: 139.425,
}, 10);



const createCustomPopup = (offer_elem) => {

  const cardTemplate = document.querySelector('#card').content;
  const card = cardTemplate.querySelector('.map__card');

  const offerElement = card.cloneNode(true);

  offerElement.querySelector('.popup__title').textContent = offer_elem.offer.title;

  offerElement.querySelector('.popup__text--address').textContent = offer_elem.offer.address;

  offerElement.querySelector('.popup__text--price').textContent = +(offer_elem.offer.price) + ' ₽/ночь';

  offerElement.querySelector('.popup__type').textContent = createTypeElem(offerElement.querySelector('.popup__type'), offer_elem.offer.type);

  offerElement.querySelector('.popup__text--capacity').textContent = offer_elem.offer.rooms + ' комнаты для ' + offer_elem.offer.guests + ' гостей';

  offerElement.querySelector('.popup__text--time').textContent = 'Заезд после ' +  offer_elem.offer.checkin + ', выезд до  ' + offer_elem.offer.checkout;

  createFeatureElements(offerElement.querySelector('.popup__features'), offer_elem.offer.features);

  offerElement.querySelector('.popup__description').textContent = offer_elem.offer.description;

  createPhotoElements(offerElement.querySelector('.popup__photos'), offer_elem.offer.photos);

  offerElement.querySelector('.popup__avatar').setAttribute('src', offer_elem.author.avatar);

  return offerElement;

};


const createListOffers = (offers) => {

  arrayPinMarkers = [];

  const filteredOffers = getFiltredOffers(offers);

  //console.log('filteredOffers = ', filteredOffers);

  filteredOffers.forEach((elem) => {
    const { location } = elem;

    const pinIcon = L.icon({
      iconUrl: '../img/pin.svg',
      iconSize: [26, 26],
      iconAnchor: [13, 26],
    });

    const pinMarker = L.marker(
      {
        lat: location.lat,
        lng: location.lng,
      },
      {
        icon: pinIcon,
      },
    );

    pinMarker.addTo(map);
    pinMarker.bindPopup(createCustomPopup(elem));
    arrayPinMarkers.push(pinMarker);

  });

};



const removePinMarkers = () => {
  arrayPinMarkers.forEach((pin) => pin.remove())
  arrayPinMarkers = [];
};



const mainPinIcon = L.icon({
  iconUrl: '../img/main-pin.svg',
  iconSize: [60, 60],
  iconAnchor: [30, 60],
});


const mainPinMarker = L.marker(
  {
    lat: 35.70,
    lng: 139.425,
  },
  {
    draggable: true,
    icon: mainPinIcon,
  },
);


mainPinMarker.addTo(map);
addressField.value = '35.70, 139.425';


mainPinMarker.addEventListener('dragstart', (evt) => {
  //console.log('evt.target ', evt.target);
  const cooords = evt.target.getLatLng();
  //console.log('cooords.lat = ', cooords.lat, 'cooords.lng = ', cooords.lng);
  addressField.value = `${cooords.lat.toFixed(5)}, ${cooords.lng.toFixed(5)}`;
});



mainPinMarker.addEventListener('dragend', (evt) => {
  const cooords = evt.target.getLatLng(); // {lat:  , lng: }
  //console.log('cooords.lat = ', cooords.lat, 'cooords.lng = ', cooords.lng);
  addressField.value = `${cooords.lat.toFixed(5)}, ${cooords.lng.toFixed(5)}`;
});


const recreateMarker = () => {
  mainPinMarker.setLatLng({lat: 35.70, lng: 139.425});
  addressField.value = `${mainPinMarker.getLatLng().lat}, ${mainPinMarker.getLatLng().lng}`;
};




export { createListOffers, recreateMarker, removePinMarkers, map };
