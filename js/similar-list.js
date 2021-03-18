
const createFeatureElements = function (listOfFeatures, featuresArray) {
  if (featuresArray.length){
    const featureArray = featuresArray.map((feature) => `<li class="popup__feature popup__feature--${feature}"></li>`);
    listOfFeatures.insertAdjacentHTML('beforeend', featureArray.join(' '));
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





export { createFeatureElements, createPhotoElements, createTypeElem };







