import { createOffers } from  './data.js'; 

//                                      ul
const createFeatureElements = function (listOfFeatures, featuresArray) { // featuresArray =['wi-fi', 'wash', 'conditioner']
      
  if (featuresArray.length) {
    featuresArray.forEach((elem) => { 
      const featureElement = document.createElement('li');
      featureElement.classList.add('popup__feature', 'popup__feature--' + elem); 
      listOfFeatures.appendChild(featureElement);  //добавляем li в ul
    });
  } 
  else {
    listOfFeatures.classList.add('hidden'); // скроем
  }
};



const createPhotoElements = function (listOfPhotos, photosArray) {

  if (photosArray.length) {
    for(let i = 0; i < photosArray.length; i++){
      const photoElement = document.createElement('img');
      photoElement.classList.add('popup__photo'); 
      photoElement.setAttribute('src', photosArray[i]); 
      listOfPhotos.appendChild(photoElement);  //добавляем img в listOfPhotos 
    }
  }
  else{
    listOfPhotos.classList.add('hidden'); 
  }
};


const createTypeElem = function(typeElem, offerType){
  if(offerType){

    if(offerType === 'flat'){
      offerType = 'Квартира';
    }

    if(offerType === 'bungalow'){
      offerType = 'Бунгало';
    }

    if(offerType === 'house'){
      offerType = 'Дом';
    }

    if(offerType === 'palace'){
      offerType = 'Дворец';
    }

    return  offerType;
  }
  else{
    typeElem.classList.add('hidden');
  }
  
};






const map = document.querySelector('#map-canvas'); //родитель, сюда вставляем объяления

const cardTemplate = document.querySelector('#card').content;
//console.log(cardTemplate);

const card = cardTemplate.querySelector('.popup'); //карточка объявелния
//console.log(card);

const similarOffers = createOffers(); // [{},{},{}]

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

  createFeatureElements(offerElement.querySelector('.popup__features'), offer.features); // фичи
  //console.log(offerElement.querySelector('.popup__features').textContent);
  
  offerElement.querySelector('.popup__description').textContent = offer.description;
  //console.log(offerElement.querySelector('.popup__description').textContent);

  
  createPhotoElements(offerElement.querySelector('.popup__photos'), offer.photos); // фотки
  //console.log(offerElement.querySelector('.popup__photos').textContent);

  offerElement.querySelector('.popup__avatar').setAttribute('src', author.avatar);
  
  similarListFragment.appendChild(offerElement);

});

map.appendChild(similarListFragment); // вставляем коробку с оферами в родитель map
