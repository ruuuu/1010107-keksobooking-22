import { createFeatureElements, createPhotoElements, createTypeElem } from './similar-list.js';
import { addressField } from './forma.js';
import { onEscKeyPress,  onMouseDownPress } from './modal.js';

document.removeEventListener('keydown', onEscKeyPress); // снимаем обработчик когда нет сообщеий
document.removeEventListener('mousedown',  onMouseDownPress); // снимаем обработчик когда нет сообщеий


/* global L:readonly */
const map = L.map('map-canvas') //создали карту , нашли ее по id
  .on('load', () => { // событие load загрузки карты
    //toggledForms();
    //console.log('Карта инициализирована');

  })
  .setView({
    lat: 35.70,  // кординаты центра  Токио
    lng: 139.425,
  }, 10); // масштаб


L.tileLayer( // добавляем слой
  'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  },
).addTo(map); // добавили в карту



const createCustomPopup = (offer_elem) => { // передаем объект-объвление {author, offer, location} , создаем  разметку одного объявления

  const cardTemplate = document.querySelector('#card').content;
  const card = cardTemplate.querySelector('.map__card'); // карточка объявелния

  const offerElement = card.cloneNode(true); // копия разметки объявления

  offerElement.querySelector('.popup__title').textContent = offer_elem.offer.title;

  offerElement.querySelector('.popup__text--address').textContent = offer_elem.offer.address;

  offerElement.querySelector('.popup__text--price').textContent = +(offer_elem.offer.price) + ' ₽/ночь';

  offerElement.querySelector('.popup__type').textContent = createTypeElem(offerElement.querySelector('.popup__type'), offer_elem.offer.type);

  offerElement.querySelector('.popup__text--capacity').textContent = offer_elem.offer.rooms + ' комнаты для ' + offer_elem.offer.guests + ' гостей';

  offerElement.querySelector('.popup__text--time').textContent = 'Заезд после ' +  offer_elem.offer.checkin + ', выезд до  ' + offer_elem.offer.checkout;

  createFeatureElements(offerElement.querySelector('.popup__features'), offer_elem.offer.features); //ВЫЗОВ ФУНЦИИ фичи ['wi-fi', 'wash', 'conditioner']

  offerElement.querySelector('.popup__description').textContent = offer_elem.offer.description;

  createPhotoElements(offerElement.querySelector('.popup__photos'), offer_elem.offer.photos); //ВЫЗОВ ФУНКЦИИ  фотки

  offerElement.querySelector('.popup__avatar').setAttribute('src', offer_elem.author.avatar);

  return offerElement; //  получили разметку  1-го объвления

};

// const similarOffers = createOffers(); //  выдаст [{},{},{}]

const createListOffers = (offers) => { // в fetch вызываем ее

  // [{},{},{}] берем с  сервера
  offers.forEach((elem) => { // передаем объект elem = {author, offer, location}
    const { location } = elem;

    const pinIcon = L.icon({ // создаем иконку для обычной метки
      iconUrl: '../img/pin.svg',
      iconSize: [26, 26], // размеры метки
      iconAnchor: [13, 26], // координаты хвоста метки, вычисляем от верхнего левого угла иконки (х/2, y)
    });

    const pinMarker = L.marker(  // создаем обычную(синюю) метку
      {
        lat: location.lat,
        lng: location.lng,
      },
      {
        icon: pinIcon, // меняем иконку метки на свою
      },
    );

    pinMarker.addTo(map);  // добавляем обычную метку на карту

    pinMarker.bindPopup(createCustomPopup(elem)); // передаем {author, offer, location}, при нажатии на метку, вернет разметку объявления

  }); // forEach()

};


//главная метка
const mainPinIcon = L.icon({ // создаем иконку для главной метки
  iconUrl: '../img/main-pin.svg',
  iconSize: [60, 60],
  iconAnchor: [30, 60],
});


const mainPinMarker = L.marker(  // создаем главную метку
  {
    lat: 35.70, // центр токио
    lng: 139.425,
  },
  {
    draggable: true,
    icon: mainPinIcon, // меняем иконку метки на свою
  },
);


mainPinMarker.addTo(map);
addressField.value = '35.70, 139.425';  // нач значение, центр токио



mainPinMarker.addEventListener('dragstart', (evt) => { //  срабатывает в момент начала перетаскивания
  //console.log('evt.target ', evt.target);
  const cooords = evt.target.getLatLng();
  //console.log('cooords ', cooords);
  //console.log('cooords.lat = ', cooords.lat, 'cooords.lng = ', cooords.lng);
  addressField.value = `${cooords.lat.toFixed(5)}, ${cooords.lng.toFixed(5)}`;
});



mainPinMarker.addEventListener('dragend', (evt) => { // срабатывает после завершения перетаскивания
  const cooords = evt.target.getLatLng(); // {lat:  , lng: }
  //console.log('cooords.lat = ', cooords.lat, 'cooords.lng = ', cooords.lng);
  addressField.value = `${cooords.lat.toFixed(5)}, ${cooords.lng.toFixed(5)}`;
});



mainPinMarker.addEventListener('dragover', () => { // событие dragover, вешаем на метку, отслжеиваем метоположение перемещаемого эл-та
  // не знаю что тут долно происходить

});



const recreateMarker = () => {
  mainPinMarker.setLatLng({lat: 35.70, lng: 139.425});
  addressField.value = `${mainPinMarker.getLatLng().lat}, ${mainPinMarker.getLatLng().lng}`;
};




export { createListOffers, recreateMarker };
