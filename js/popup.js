import { createOffers } from  './data.js'; 

//                                      ul
const createFeatureElements = function (listOfFeatures, featuresArray) { // featuresArray =['wi-fi', 'wash', 'conditioner']
  //1-ый способ:
  if (featuresArray.length){
    const features__array = featuresArray.map((feature) => `<li class="popup__feature popup__feature--${feature}"></li>`); // [<li></li>, <li></li>, <li></li>]
    listOfFeatures.insertAdjacentHTML('beforeend', features__array.join(' ')); // строка  из элементов массива "<li></li> <li></li> <li></li>" и добавляем в родитель
  }
  //2-ой способ:
  // if (featuresArray.length) {
  //   featuresArray.forEach((elem) => { 
  //     const featureElement = document.createElement('li');
  //     featureElement.classList.add('popup__feature', 'popup__feature--' + elem); 
  //     listOfFeatures.appendChild(featureElement);  //добавляем li в ul
  //   });
  // } 
  else {
    listOfFeatures.classList.add('hidden'); // скроем
  }
};



const createPhotoElements = function (listOfPhotos, photosArray) {

  if (photosArray.length) {
    photosArray.forEach((photo) => { // функция вызывается  к каждому photo
      const photoElement = document.createElement('img');
      photoElement.classList.add('popup__photo'); 
      photoElement.setAttribute('src', photo); //добавляем атрибут
      photoElement.setAttribute('width', '45'); 
      photoElement.setAttribute('height', '40');
      photoElement.setAttribute('alt', 'Фотография жилья');
      listOfPhotos.appendChild(photoElement);  //добавляем img в родитель listOfPhotos 
    });
  }
  else{
    listOfPhotos.classList.add('hidden'); 
  }
};


const createTypeElem = function(typeElem, offerType){
  // if(offerType){

  //   if(offerType === 'flat'){
  //     offerType = 'Квартира';
  //   }

  //   if(offerType === 'bungalow'){
  //     offerType = 'Бунгало';
  //   }

  //   if(offerType === 'house'){
  //     offerType = 'Дом';
  //   }

  //   if(offerType === 'palace'){
  //     offerType = 'Дворец';
  //   }

  //   return  offerType;
  // }
  // else{
  //   typeElem.classList.add('hidden');
  // }
  
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



const map = document.querySelector('#map-canvas'); //родитель, сюда вставляем объяления

const cardTemplate = document.querySelector('#card').content;
//console.log(cardTemplate);

const card = cardTemplate.querySelector('.popup'); //карточка объявелния
//console.log(card);

const similarOffers = createOffers(); // [{},{},{}]
console.log('массив объявлений ', similarOffers); //массив объектов-объявлений


const similarListFragment = document.createDocumentFragment(); //корбка куда будем складвать оферы


similarOffers.forEach(( {author, offer} ) => { // для каждого офера вызывается функция
  const offerElement = card.cloneNode(true); // копия разметки объявления
  //console.log(offerElement); 

  offerElement.querySelector('.popup__title').textContent = offer.title;
  //console.log(offerElement.querySelector('.popup__title').textContent);

  offerElement.querySelector('.popup__text--address').textContent = offer.address;
  //console.log(offerElement.querySelector('.popup__text--address').textContent);

  offerElement.querySelector('.popup__text--price').textContent = +(offer.price) + ' ₽/ночь';
  //console.log(offerElement.querySelector('.popup__text--price').textContent);

  offerElement.querySelector('.popup__type').textContent = createTypeElem(offerElement.querySelector('.popup__type'),offer.type); 
  //console.log(offerElement.querySelector('.popup__type').textContent);

  offerElement.querySelector('.popup__text--capacity').textContent = offer.rooms + ' комнаты для ' + offer.guests + ' гостей';
  //console.log(offerElement.querySelector('.popup__text--capacity').textContent);

  offerElement.querySelector('.popup__text--time').textContent = 'Заезд после ' +  offer.checkin + ', выезд до  ' + offer.checkout;
  //console.log(offerElement.querySelector('.popup__text--time').textContent);

  
  createFeatureElements(offerElement.querySelector('.popup__features'), offer.features); // фичи ['wi-fi', 'wash', 'conditioner']
  //console.log(offerElement.querySelector('.popup__features').textContent);
  
  offerElement.querySelector('.popup__description').textContent = offer.description;
  //console.log(offerElement.querySelector('.popup__description').textContent);

  
  createPhotoElements(offerElement.querySelector('.popup__photos'), offer.photos); // фотки
  //console.log(offerElement.querySelector('.popup__photos').textContent);

  offerElement.querySelector('.popup__avatar').setAttribute('src', author.avatar);
  
  similarListFragment.appendChild(offerElement);

});

map.appendChild(similarListFragment); // вставляем коробку с оферами в родитель map









