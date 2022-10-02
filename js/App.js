const ls = window.localStorage;

const decrease = document.querySelector('[datatype=decrease]');
const reset = document.querySelector('[datatype=reset]');
const increase = document.querySelector('[datatype=increase]');

const counter = document.querySelector('.counter-number');

window.onload = () => {
    if (ls.getItem('counter')) {
        counter.textContent = ls.getItem('counter');
        changeColor();
    }
}

decrease.addEventListener('click', () => changeCounter(-1));
increase.addEventListener('click', () => changeCounter(+1));
reset.addEventListener('click', () => changeCounter())

function changeCounter(number = 0) {
    if (number === 0) counter.textContent = String(0);

    else {
        let counterNum = parseInt(counter.textContent);
        counter.textContent = String(counterNum + number);
    }

    ls.setItem('counter', counter.textContent)

    changeColor();
}

function changeColor() {
    const counterNum = parseInt(counter.textContent);

    if (counterNum > 0) counter.style.color = 'green';
    else if (counterNum < 0) counter.style.color = 'red';
    else counter.style.color = 'black';
}