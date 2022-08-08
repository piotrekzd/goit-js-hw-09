import flatpickr from 'flatpickr';
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
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
        if (selectedDates[0] < options.defaultDate) {
            Notiflix.Notify.failure('Please choose a valid date');
            startBtn.disabled = true;
        } else {
            startBtn.disabled = false;
        }
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
    let initialization = setInterval(() => {
        let countdown = new Date(input.value) - new Date();
        startBtn.disabled = true;
        if (countdown >= 0) {
            let time = convertMs(countdown);
            dataDays.textContent = addLeadingZero(time.days);
            dataHours.textContent = addLeadingZero(time.hours);
            dataMinutes.textContent = addLeadingZero(time.minutes);
            dataSeconds.textContent = addLeadingZero(time.seconds);
        } else {
            clearInterval(initialization);
        }
    }, 1000);
});