'use strict';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import errorSvg from '../img/symbol-defs.svg';
import okaySvg from '../img/ok.svg';

const form = document.querySelector('.form');
const delayInput = form.querySelector('input[name="delay"]');
const stateInputs = form.querySelectorAll('input[name="state"]');

form.addEventListener('submit', handleSubmit);

function handleSubmit(event) {
  event.preventDefault();

  const delay = Number(delayInput.value);
  const state = getSelectedState();

  makePromise(delay, state)
    .then(result => {
      console.log(result);
      iziToast.success({
        title: 'Ok',
        message: result,
        titleColor: '#fff',
        titleSize: '16px',
        titleLineHeight: 1.5,
        position: 'topRight',
        messageSize: '16px',
        messageLineHeight: 1.5,
        messageColor: '#fff',
        backgroundColor: '#59a10d',
        closeOnEscape: true,
        icon: 'ok',
        iconUrl: okaySvg,
        theme: 'dark',
      });
      resetForm();
    })
    .catch(error => {
      console.log(error);
      iziToast.error({
        titleColor: '#fff',
        titleSize: '16px',
        titleLineHeight: 1.5,
        position: 'topRight',
        messageSize: '16px',
        messageLineHeight: 1.5,
        messageColor: '#fff',
        backgroundColor: '#ef4040',
        closeOnEscape: true,
        icon: 'error',
        iconUrl: errorSvg,
        theme: 'dark',
        title: 'Error',
        message: error,
        iconUrl: errorSvg,
      });
      resetForm();
    });
}
function getSelectedState() {
  for (const input of stateInputs) {
    if (input.checked) {
      return input.value;
    }
  }
  return null;
}

const makePromise = (delay, state) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (state === 'fulfilled') {
        resolve(` Fulfilled promise in ${delay}ms`);
      } else {
        reject(` Rejected promise in ${delay}ms`);
      }
    }, delay);
  });
};

function resetForm() {
  delayInput.value = '';
  stateInputs.forEach(input => (input.checked = false));
}
