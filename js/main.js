const getFloatRandomNumber = function(min, max, countDigits){
  
  let minNumber = min;
  let maxNumber = max;

  if(minNumber > maxNumber){
    minNumber = max;
    maxNumber = min
  }

  if(minNumber === maxNumber){
    return minNumber.toFixed(countDigits);
  }
  
  let n = (Math.random() * (maxNumber - minNumber) + minNumber).toFixed(countDigits);

  return n;
  
}


getFloatRandomNumber(5.90, 5.90,  3);
//let result = getFloatRandomNumber(5.90, 5.90,  3);
//console.log(result);