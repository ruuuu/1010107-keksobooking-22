import { createFeatureElements, createPhotoElements, createTypeElem } from './similar-list.js';
import { addressField } from './forma.js';
import { onEscKeyPress,  onMouseDownPress } from './modal.js';
import { getFiltredOffers } from './filter.js';

let arrayPinMarkers = [];




const map = window.L.map('map-canvas')
map.on('load', () => {

  window.L.tileLayer(
    'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
    {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    },
  ).addTo(map)

  document.removeEventListener('keydown', onEscKeyPress);
  document.removeEventListener('mousedown', onMouseDownPress);
})



map.on('error', () => {
  map.remove();
})


map.setView({
  lat: 35.70, //  центр находится в тОкио
  lng: 139.425,
}, 10);



const createCustomPopup = (offerElem) => { // передаем объект-объвление {author, offer, location} , создаем  разметку одного объявления

  const cardTemplate = document.querySelector('#card').content;
  const card = cardTemplate.querySelector('.map__card');

  const offerElement = card.cloneNode(true);

  offerElement.querySelector('.popup__title').textContent = offerElem.offer.title;

  offerElement.querySelector('.popup__text--address').textContent = offerElem.offer.address;

  offerElement.querySelector('.popup__text--price').textContent = +(offerElem.offer.price) + ' ₽/ночь';

  offerElement.querySelector('.popup__type').textContent = createTypeElem(offerElement.querySelector('.popup__type'), offerElem.offer.type);

  offerElement.querySelector('.popup__text--capacity').textContent = offerElem.offer.rooms + ' комнаты для ' + offerElem.offer.guests + ' гостей';

  offerElement.querySelector('.popup__text--time').textContent = 'Заезд после ' +  offerElem.offer.checkin + ', выезд до  ' + offerElem.offer.checkout;

  createFeatureElements(offerElement.querySelector('.popup__features'), offerElem.offer.features);

  offerElement.querySelector('.popup__description').textContent = offerElem.offer.description;

  createPhotoElements(offerElement.querySelector('.popup__photos'), offerElem.offer.photos);

  offerElement.querySelector('.popup__avatar').setAttribute('src', offerElem.author.avatar);

  return offerElement; //  получили разметку  1-го объвления

};

//привязка балуна к метке:
const createListOffers = (offers) => { // передаем серверные объявления, в fetch вызываем ее

  //arrayPinMarkers = [];

  const filteredOffers = getFiltredOffers(offers); // отфильтрованные оферы  возвращает

  filteredOffers.forEach((elem) => { // проходимся по отфильтрованным оферам
    const { location } = elem;

    const pinIcon = window.L.icon({
      iconUrl: '../img/pin.svg',
      iconSize: [26, 26],
      iconAnchor: [13, 26],
    });

    const pinMarker = window.L.marker(
      {
        lat: location.lat,
        lng: location.lng,
      },
      {
        icon: pinIcon,
      },
    );

    pinMarker.addTo(map); //  добавляем обычную метку на карту
    //                    разметка offer
    pinMarker.bindPopup(createCustomPopup(elem)); // передаем {author, offer, location}, при нажатии на метку, вернет разметку объявления
    arrayPinMarkers.push(pinMarker); // отрисованную метку дбоавляем в массив arrayPinMarkers

    //console.log('arrayPinMarkers = ', arrayPinMarkers);
  });

};



const removePinMarkers = () => {
  //console.log('зашли в  removePinMarkers');
  arrayPinMarkers.forEach((pin) => pin.remove()); //  удаляем метку
  arrayPinMarkers = [];
};



const mainPinIcon = window.L.icon({
  iconUrl: '../img/main-pin.svg',
  iconSize: [60, 60],
  iconAnchor: [30, 60],
});


const mainPinMarker = window.L.marker(
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
  const cooords = evt.target.getLatLng();
  addressField.value = `${cooords.lat.toFixed(5)}, ${cooords.lng.toFixed(5)}`;
});



mainPinMarker.addEventListener('dragend', (evt) => {
  const cooords = evt.target.getLatLng();
  addressField.value = `${cooords.lat.toFixed(5)}, ${cooords.lng.toFixed(5)}`;
});


const recreateMarker = () => {
  mainPinMarker.setLatLng({lat: 35.70, lng: 139.425});
  addressField.value = `${mainPinMarker.getLatLng().lat}, ${mainPinMarker.getLatLng().lng}`;

};




export { createListOffers, recreateMarker, removePinMarkers, map, arrayPinMarkers  };
