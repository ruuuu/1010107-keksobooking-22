import { getFloatRandomNumber, randomInteger  } from './util.js';

const COUNT_OFFERS = 100;

const OFFER_TITLE = [
  'Объявление 1',
  'Объявление 2',
  'Объявление 3',
  'Объявление 4',
];

const OFFER_TYPE = ['palace', 'flat', 'house', 'bungalow'];

const OFFER_CHECK_IN = ['12:00', '13:00', '14:00'];

const OFFER_CHECK_OUT = ['12:00', '13:00', '14:00'];

const OFFER_FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];

const OFFER_PHOTOS = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];


const DeleteRepeatElemsFromArray = (mas) => {

  //console.log('mas ', mas);
  let mas1 = [];

  mas1[0] = mas[0];
  let m = 1;

  for (let i = 1; i <= mas.length - 1; i++) {
    let f = true;

    for (let j = 0; j < m; j++) {
      if (mas[i] === mas1[j]) {
        f = false;
      }
    }

    if (f === true) {
      m++;
      mas1[m - 1] = mas[i];
    }
  }

  return mas1;
};
//console.log(DeleteRepeatElemsFromArray(["wifi", "washer", "parking", "dishwasher"]));


const createFeaturesArray = (array) => { // созадем массив строк

  let mas = [];
  let countElems = randomInteger(array.length); //[1,6]
  //console.log('countElems', countElems);

  for (let i = 0; i < countElems; i++) {
    //console.log('randomInteger(OFFER_FEATURES.length)  equal', randomInteger(OFFER_FEATURES.length));
    mas[i] = array[randomInteger(array.length) - 1]; // индекк [1,6]
  }

  //console.log('mas', mas);

  let mas1 = DeleteRepeatElemsFromArray(mas);

  //mas1 = mas1.join(', '); //чтоб элементы не слипались, строка

  return mas1;
};
//console.log('result', createFeaturesArray(OFFER_FEATURES));


const createAuthorOffer = () => {
  return {
    avatar: 'img/avatars/user0' + randomInteger(8) + '.png',
  };
};
//console.log(createAuthorOffer());


const createInfoOffer = () => {  //offer:{}
  return {
    title: OFFER_TITLE[randomInteger(OFFER_TITLE.length - 1)],
    address: getFloatRandomNumber(5.90, 45.90, 3) + ', ' + getFloatRandomNumber(1.90, 10.90, 3),
    price: randomInteger(4000),
    type: OFFER_TYPE[randomInteger(OFFER_TYPE.length - 1)],
    rooms: randomInteger(3),
    guests: randomInteger(6),
    checkin: OFFER_CHECK_IN[randomInteger(OFFER_CHECK_IN.length - 1)],
    checkout: OFFER_CHECK_OUT[randomInteger(OFFER_CHECK_OUT.length - 1)],
    features: createFeaturesArray(OFFER_FEATURES), //массив строк
    description: 'Описание помещения',
    photos: createFeaturesArray(OFFER_PHOTOS), //массив строк

  };
};
//console.log(createInfoOffer());


const createLocationOffer = () => {
  return {
    x: +getFloatRandomNumber(35.65000, 35.70000, 5), // оператор + приводит строку к числу
    y: +getFloatRandomNumber(139.70000, 139.80000, 5),
  };
};
//console.log(createLocationOffer());


const createOffer = () => {
  return {
    author: createAuthorOffer(),
    offer: createInfoOffer(),
    location: createLocationOffer(),
  };
};
//console.log(createOffer());


const createOffers = () => new Array(COUNT_OFFERS).fill(null).map(() => createOffer());

//console.log('массив объявлений ', createOffers());



export{ createOffers };

