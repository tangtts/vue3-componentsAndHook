let preload = (imgs): Promise<void> => {
  return new Promise((resolve, reject) => {
    if (!imgs.length) {
      resolve();
    }
    const length = imgs.length;
    let count = 0;

    const load = src => {
      let img = new Image();

      const checkIfFinished = () => {
        count++;
        if (count === length) {
          resolve();
        }
      };

      img.onload = checkIfFinished;
      img.onerror = checkIfFinished;

      img.src = src;
    };

    imgs.forEach(load);
  });
};

const getRandomInt = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

// by ustbhuangyi
const shuffle = arr => {
  let ret = arr.slice();
  for (let i = 0; i < ret.length; i++) {
    let j = getRandomInt(0, i);
    [ret[i], ret[j]] = [ret[j], ret[i]];
  }
  return ret;
};

export { shuffle, getRandomInt, preload };
