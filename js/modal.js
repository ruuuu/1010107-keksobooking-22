const mainElement = document.querySelector('main');

const successAlert = () => { // сообщение об успехе

  const successTemplate = document.querySelector('#success').content;
  const successMessage = successTemplate.querySelector('.success'); //успешное  сообщение
  const successElement = successMessage.cloneNode(true);

  mainElement.append(successElement); // дбоавляем сообщеие в mainElement


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


  setTimeout(() => {
    errorElement.remove();
  }, 4000);

};



const isEscEvent = (evt) => {
  return evt.key === ('Escape' || 'Esc');
};


const escKeyPress = (evt) => {

  //console.log('перед if');
  if (isEscEvent(evt)) {
    //console.log('нажали на клаваишу esc');
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

document.addEventListener('keydown',  (evt) => { // нажатие на esc в соообщении
  escKeyPress(evt);
});


document.removeEventListener('keydown', (evt) => { // снимаем обработчик когда нет сообщеий
  escKeyPress(evt);
});


const mouseDownPress = () => {
  const errorElement = document.querySelector('.error');
  const successElement = document.querySelector('.success');

  if(successElement){
    successElement.classList.add('hidden');
  }
  else if(errorElement){
    errorElement.classList.add('hidden');
  }
};

document.addEventListener('mousedown',  () => { // нажатие на любую область в соообщении
  mouseDownPress();
});

document.removeEventListener('mousedown',  () => {
  mouseDownPress();
});

export { successAlert, errorAlert };
