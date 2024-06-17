// Описаний в документації
import flatpickr from "flatpickr";
// Додатковий імпорт стилів
import "flatpickr/dist/flatpickr.min.css";
// Описаний у документації
import iziToast from "izitoast";
// Додатковий імпорт стилів
import "izitoast/dist/css/iziToast.min.css";

function query(selector) {
    return document.querySelector(selector);
}


const elementsDOM = [
    { elDOM: '[data-days]', value: '00' },
    { elDOM: '[data-hours]', value: '00' },
    { elDOM: '[data-minutes]', value: '00' },
    { elDOM: '[data-seconds]', value: '00' }
];
const datetimeInpEL = query('#datetime-picker');
const btnStart = query('[data-start]');

const elements = elementsDOM.map(item => ({
    elDOM: query(item.elDOM),
    value: item.value
}));

btnStart.disabled = true;

let userSelectedDate;

const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
        handleDateSelection(selectedDates);
    }
}

flatpickr(datetimeInpEL, options);

function handleDateSelection(selectedDates) {
    const selectedDate = selectedDates[0];

    if (selectedDate > new Date()) {
        btnStart.disabled = false;
        userSelectedDate = selectedDate;
    } else {
        showError("Please choose a date in the future");
        btnStart.disabled = true;
    }
}

function showError(message) {
    iziToast.error({
        title: 'Error',
        titleColor: '#fff',
        message: message,
        messageColor: '#fff',
        backgroundColor: '#ef4040',
        position: 'topRight',
        iconColor: '#fff',
        theme: 'dark',
    });
}

btnStart.addEventListener('click', activateTimer);

function activateTimer() {

    btnStart.disabled = true;
    datetimeInpEL.disabled = true;

    const countdownDateMs = new Date(userSelectedDate).getTime();

    const timerInterval = setInterval(updateTimer, 1000);

    function updateTimer() {

        const currentTimeMs = Date.now();

        const differenceMs = countdownDateMs - currentTimeMs;

        if (differenceMs <= 0) {
            clearInterval(timerInterval);
            elements.forEach(item => item.elDOM.textContent = item.value);
            datetimeInpEL.disabled = false;
            return;
        }

        const time = convertMs(differenceMs);
        elements.forEach((item, index) => {
            item.elDOM.textContent = addLeadingZero(time[Object.keys(time)[index]]);
        });
    }
}

function addLeadingZero(value) {
    return String(value).padStart(2, '0');
}

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
}
