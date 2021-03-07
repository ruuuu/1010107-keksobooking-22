
const createFeatureElements = function (listOfFeatures, featuresArray) {
  if (featuresArray.length){
    const features__array = featuresArray.map((feature) => `<li class="popup__feature popup__feature--${feature}"></li>`);
    listOfFeatures.insertAdjacentHTML('beforeend', features__array.join(' '));
  }
  else {
    listOfFeatures.classList.add('hidden');
  }
};



const createPhotoElements = function (listOfPhotos, photosArray) {

  if (photosArray.length) {
    photosArray.forEach((photo) => {
      const photoElement = document.createElement('img');
      photoElement.classList.add('popup__photo');
      photoElement.setAttribute('src', photo);
      photoElement.setAttribute('width', '45');
      photoElement.setAttribute('height', '40');
      photoElement.setAttribute('alt', 'Фотография жилья');
      listOfPhotos.appendChild(photoElement);
    });
  }
  else{
    listOfPhotos.classList.add('hidden');
  }
};


const createTypeElem = function(typeElem, offerType){

  switch(offerType) {
    case 'flat':
      offerType = 'Квартира';
      break;

    case 'bungalow':
      offerType = 'Бунгало';
      break;

    case 'house':
      offerType = 'Дом';
      break;

    case 'palace':
      offerType = 'Дворец';
      break;

    default:
      typeElem.classList.add('hidden');
  }

  return offerType;
};





//const map = document.querySelector('#map-canvas'); // родитель, сюда вставляем объяления

//const cardTemplate = document.querySelector('#card').content;
// console.log(cardTemplate);

//const card = cardTemplate.querySelector('.popup'); // карточка объявелния
// console.log(card);
// const similarOffers = createOffers(); // вызов функции, выдаст сгенеренные [{},{},{}]

//ДОБАВИЛА
// const getOfferRank = (offerr) => { // передаем объект - offerr . определяем рейтинг у передаваемго офера

//   const filtersForma = document.querySelector('.map__filters');

//   const typeSelect = filtersForma.querySelector('#housing-type'); // Тип жилья

//   typeSelect.value = offerr.offer.type; // запоминаем что выбрали из списка

//   let rank = 0; // у всех объявлений сперва рейтинг =0

//   //console.log('в getOfferRank typeSelect.value = ',  typeSelect.value);
//   if (offerr.offer.type === (typeSelect.value || Default.TYPE_HOUSE)) { // если у объявлеия тип равен  с тем что выбрали в фильтре
//     rank += 2; // за совпадение по Типу жилья, даем 2 очка
//   }

//   //console.log('rank ', rank);
//   return rank; // возвращаем rank offerr
// };


// // фукнция компаратор, получает два офера, передаем ее в sort как колбэк
// const sortOffers = (offerA, offerB) => {
//   const rankA = getOfferRank(offerA); // получаем рейтинг офераА

//   //console.log('offerA = ', offerA, 'rankA =', rankA);

//   const rankB = getOfferRank(offerB); // получаем рейтинг офераВ
//   //console.log('offerB = ', offerB, 'rankB =', rankB);

//   //console.log('rankB - rankA = ', rankB - rankA);
//   return rankB - rankA; // -1 или  1 или  0
// };




//ФУНКЦИЯ ее вызываем в fetch: добавит на карту map  объявления с сервера
// const renderSimilarList = (similarOffers) => { // передаем [{},{},{}] , ВСТАВЛЯЕТ ОБЪЯВЛЕНИЯ НА КАРТу

//   const similarListFragment = document.createDocumentFragment(); //корбка куда будем складвать оферы

//   // [{},{},{}]
//   similarOffers.forEach(({ author, offer }) => { //передаем объект-деструктуризация,  для каждого офера вызывается функция
//     const offerElement = card.cloneNode(true); // копия разметки объявления
//     //console.log(offerElement);

//     offerElement.querySelector('.popup__title').textContent = offer.title;
//     //console.log(offerElement.querySelector('.popup__title').textContent);

//     offerElement.querySelector('.popup__text--address').textContent = offer.address;
//     //console.log(offerElement.querySelector('.popup__text--address').textContent);

//     offerElement.querySelector('.popup__text--price').textContent = +(offer.price) + ' ₽/ночь';
//     //console.log(offerElement.querySelector('.popup__text--price').textContent);

//     offerElement.querySelector('.popup__type').textContent = createTypeElem(offerElement.querySelector('.popup__type'),offer.type);
//     //console.log(offerElement.querySelector('.popup__type').textContent);

//     offerElement.querySelector('.popup__text--capacity').textContent = offer.rooms + ' комнаты для ' + offer.guests + ' гостей';
//     //console.log(offerElement.querySelector('.popup__text--capacity').textContent);

//     offerElement.querySelector('.popup__text--time').textContent = 'Заезд после ' +  offer.checkin + ', выезд до  ' + offer.checkout;
//     //console.log(offerElement.querySelector('.popup__text--time').textContent);

//     createFeatureElements(offerElement.querySelector('.popup__features'), offer.features); // фичи ['wi-fi', 'wash', 'conditioner']
//     //console.log(offerElement.querySelector('.popup__features').textContent);

//     offerElement.querySelector('.popup__description').textContent = offer.description;
//     //console.log(offerElement.querySelector('.popup__description').textContent);

//     createPhotoElements(offerElement.querySelector('.popup__photos'), offer.photos); // фотки
//     //console.log(offerElement.querySelector('.popup__photos').textContent);

//     offerElement.querySelector('.popup__avatar').setAttribute('src', author.avatar);

//     similarListFragment.appendChild(offerElement);

//   }); // forEach

//   map.innerHTML = ''; // очищаем карту от старых оферов

//   map.appendChild(similarListFragment); // вставляем коробку с оферами в родитель map
//   //console.log('map ', map); // размекта с обяъвлениями серверным

//   //map.classList.remove('hidden');
// };




export { createFeatureElements, createPhotoElements, createTypeElem };







