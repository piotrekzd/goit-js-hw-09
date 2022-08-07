const body = document.querySelector('body');
const startBtn = document.querySelector('button[data-start]');
const stopBtn = document.querySelector('button[data-stop]');

function getRandomColor() {
    return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
};

let bgColor = null;

const change = () => {
    return body.style.backgroundColor = `${getRandomColor()}`;
};

const stop = () => {
    clearInterval(bgColor);
    startBtn.disabled = false;
};

startBtn.addEventListener('click', () => {
    bgColor = setInterval(change, 1000);
    startBtn.disabled = true;
});

stopBtn.addEventListener('click', stop);