const getFloatRandomNumber = function (min, max, countDigits) { // рандомное вещественное число с countDigits знаками после запятой
  let maxNumber = max;
  let minNumber = min;

  if (minNumber > maxNumber) {
    minNumber = max;
    maxNumber = min
  }

  if (minNumber === maxNumber) {
    return minNumber.toFixed(countDigits);
  }

  let n = (Math.random() * (maxNumber - minNumber) + minNumber).toFixed(countDigits);

  //console.log('typeof(n)', typeof (n)); // instanceof()
  //console.log('typeof(n)', typeof (+n));
  return n; //строка

};
//console.log(getFloatRandomNumber(35.65000, 35.70000, 5));



const randomInteger = function (max) { // для генерации целого числа от [0,max]
  return Math.floor(Math.random() * Math.floor(max)) + 1; // [1, max]
};
//console.log('случайное целое число равно', randomInteger(6)); // вернет [1,6]




const showAlert = (message) => {
  const alertContainer = document.createElement('div');
  alertContainer.style.zIndex = 100;
  alertContainer.style.position = 'absolute';
  alertContainer.style.left = 0;
  alertContainer.style.top = 0;
  alertContainer.style.right = 0;
  alertContainer.style.padding = '10px 3px';
  alertContainer.style.fontSize = '30px';
  alertContainer.style.textAlign = 'center';
  alertContainer.style.backgroundColor = 'red';

  alertContainer.textContent = message;

  document.body.append(alertContainer);

  setTimeout(() => {
    alertContainer.remove();
  }, 5000);
};





export{ getFloatRandomNumber, randomInteger,  showAlert };
