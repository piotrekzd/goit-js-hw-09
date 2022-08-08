import Notiflix from 'notiflix';

const delay = document.querySelector('#delay')
const step = document.querySelector('#step');
const amount = document.querySelector('#amount');
const btn = document.querySelector('button')

function createPromise(position, delay) {
  const newPromise = new Promise((resolve, reject) => {
    setTimeout(() => {
      const shouldResolve = Math.random() > 0.3;
      if (shouldResolve) {
          resolve({ position, delay})
      } else {
        reject({ position, delay})
        }
    }, delay)
  });
  return newPromise;
};

btn.addEventListener('click', e => {
  e.preventDefault();
  let firstDelay = Number(delay.value);
  let delayStep = Number(step.value);
  for (let i = 0; i < amount.value; i++) {
    createPromise(1 + i, firstDelay + i * delayStep)
      .then(({ position, delay }) => {
        Notiflix.Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
      })
      .catch(({ position, delay }) => {
        Notiflix.Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
      });
  }
});