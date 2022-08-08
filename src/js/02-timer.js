import flatpickr from "flatpickr";
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';

const input = document.querySelector('#datetime-picker');
const startBtn = document.querySelector('button[start-data]');
const dataDays = document.querySelector('span[data-days]');
const dataHours = document.querySelector('span[data-hours]');
const dataMinutes = document.querySelector('span[data-minutes]');
const dataSeconds = document.querySelector('span[data-seconds]');

startBtn.disabled = true;

const options = {
    enableTime: true,
    time_24h: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
        if (selectedDates[0] <= new Date()) {
            Notiflix.Notify.failure('Please choose a valid date');
        } else {
            startBtn.disabled = false;
        };
    },
};

flatpickr(input, options);

function convertMs(ms) {
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;

    const days = Math.floor(ms / day);
    const hours = Math.floor((ms % day) / hour);
    const minutes = Math.floor(((ms % day) % hour) / minute);
    const seconds = Math.floor((((ms % day) % hour) % minute) / second);

    return { days, hours, minutes, seconds };
};

function addLeadingZero(num) {
        return num.toString().padStart(2, '0');
};

startBtn.addEventListener('click', () => {
    const initialization = () => {
        const dateSelect = localStorage.getItem('date');
        const today = new Date();
        const time = today.getTime();
        const ms = dateSelect - time;
        const cvtDate = convertMs(ms);
        if (ms < 1000) {
            clearInterval(timerID);
        };
        const getDifference = () => {
            dataDays.textContent = `${addLeadingZero(cvtDate.days)}`;
            dataHours.textContent = `${addLeadingZero(cvtDate.hours)}`;
            dataMinutes.textContent = `${addLeadingZero(cvtDate.minutes)}`;
            dataSeconds.textContent = `${addLeadingZero(cvtDate.seconds)}`;
        };
        getDifference();
    };
    const timerID = setInterval(initialization, 1000);
});
