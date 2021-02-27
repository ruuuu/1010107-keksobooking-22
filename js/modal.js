const mainElement = document.querySelector('main');


const isEscEvent = (evt) => {
  return evt.key === ('Escape' || 'Esc');
};


const escKeyPress = (evt) => {

  if (isEscEvent(evt)) {
    //console.log('нажали клавишу esc');

    evt.preventDefault();

    const successElement = document.querySelector('.success');
    const errorElement = document.querySelector('.error');

    if(successElement){
      successElement.classList.add('hidden');
    }
    else if(errorElement){
      errorElement.classList.add('hidden');
    }
  }
};


const mouseDownPress = () => {
  //console.log('нажали на ппоизвольню область');
  const errorElement = document.querySelector('.error');
  const successElement = document.querySelector('.success');

  if(successElement){
    successElement.classList.add('hidden');
  }
  else if(errorElement){
    errorElement.classList.add('hidden');
  }
};




const successAlert = () => { // сообщение об успехе

  const successTemplate = document.querySelector('#success').content;
  const successMessage = successTemplate.querySelector('.success'); //успешное  сообщение
  const successElement = successMessage.cloneNode(true);

  mainElement.append(successElement); // дбоавляем сообщеие в mainElement

  document.addEventListener('keydown', escKeyPress); // нажатие на esc в соообщении
  document.addEventListener('mousedown',  mouseDownPress); // нажатие на любую область в соообщении


  setTimeout(() => {
    successElement.remove(); // убираем сообщение
  }, 4000); // на 4 сек показывает сообщение



};


const errorAlert = () => { // если данные не загрузились, показываем сообщение с ошибкой

  const errorTemplate = document.querySelector('#error').content;
  const errorMessage = errorTemplate.querySelector('.error');
  const errorElement = errorMessage.cloneNode(true);

  mainElement.append(errorElement);

  const retryButton = errorElement.querySelector('.error__button'); //кнопка Попробовать снова в сообщение с ошибкой

  retryButton.addEventListener('click', () => { // обработчик на Попробовать снова

    errorElement.classList.add('hidden');
  });


  document.addEventListener('keydown', escKeyPress);  // нажатие на esc в соообщении
  document.addEventListener('mousedown',  mouseDownPress); //  нажатие на любую область в соообщении


  setTimeout(() => {
    errorElement.remove();
  }, 4000);


};


export { successAlert, errorAlert, escKeyPress, mouseDownPress };
