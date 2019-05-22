export const sumDoubleCells = arr => {
  const arrLength = arr.length;

  for (let i = 0; i < arr.length; i++) {
    if (arr[i] !== null) {
      for (let j = i + 1; j < arr.length; j++) {
        if (arr[i] === arr[j]) {
          const sum = arr[i] + arr[j];
          arr.splice(i, 1, sum);
          arr.splice(j, 1);
          j = arr.length;
        } else {
          if (arr[j] !== null) {
            j = arr.length;
          }
        }
      }
    } else {
      arr.splice(i, 1);
      i--;
    }
  }

  if (arr.length < arrLength) {
    for (let i = arr.length; i < arrLength; i++) {
      arr.push(null);
    }
  }

  return arr;
};
