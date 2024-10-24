'use strict';

import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    userSelectedDate = selectedDates[0];
    console.log(selectedDates[0]);
    selectedDate();
  },
};
flatpickr('#datetime-picker', options);

const datetimePicker = document.querySelector('#datetime-picker');
const startButton = document.querySelector('button[type="button"]');
const timer = document.querySelector('.timer');

let userSelectedDate = null;
let countdownInterval = null;

startButton.disabled = true;

function selectedDate() {
  const now = new Date();
  if (userSelectedDate <= now) {
    iziToast.error({
      title: 'Error',
      message: 'Please choose a date in the future',
      position: 'topRight',
    });
    startButton.disabled = true;
  } else {
    startButton.disabled = false;
  }
}
startButton.addEventListener('click', handleClick);

function handleClick() {
  startButton.disabled = true;
  datetimePicker.disabled = true;

  if (countdownInterval) clearInterval(countdownInterval);

  countdownInterval = setInterval(() => {
    const now = new Date();
    const timeRemaining = userSelectedDate - now;

    if (timeRemaining <= 0) {
      clearInterval(countdownInterval);
      datetimePicker.disabled = false;
      timer.textContent = '00:00:00:00';
      startButton.disabled = false;
    } else {
      const time = convertMs(timeRemaining);
      updatedTimer(time);
    }
  }, 1000);
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}
function updatedTimer({ days, hours, minutes, seconds }) {
  timer.textContent = `${addLeadingZero(days)}:${addLeadingZero(
    hours
  )}:${addLeadingZero(minutes)}:${addLeadingZero(seconds)}`;
}
function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}
