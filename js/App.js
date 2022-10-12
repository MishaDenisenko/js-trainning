const [HIDE, SHOW] = ['M7 11V7a5 5 0 0 1 10 0v4', 'M7 11V7a5 5 0 0 1 9.9-1'];

const generateBtn = document.querySelector('.generate-btn');
const hideShowBtn = document.querySelector('#hide-show__password');
const copyPassword = document.querySelector('#copy-password');
const pass = document.querySelector('.password-field');
const passRate = document.querySelector('#password-rate');
const [countOfSymbols, ...checkboxes] = document.querySelectorAll('.criteria-input');
const [uppercase, numbers, symbols] = checkboxes

const CONSONANTS_COMMON = 'bcdfghklmnprstvz';
const CONSONANTS_ALL = CONSONANTS_COMMON + 'jqwx';
const VOWELS_ALL = 'aeiouy';
const ALL_LETTERS = CONSONANTS_ALL + VOWELS_ALL;
const SYMBOLS = '~!@#$%^&()[]{};:\'"/?.,';

let password = '';
let hide = true;

hideShowBtn.addEventListener('click', hideShowPass);
generateBtn.addEventListener('click', generatePassword)
copyPassword.addEventListener('click', () => {
    navigator.clipboard
        .writeText(password)
        .catch((err) => console.log('Something went wrong', err));
})

function generatePassword() {
    password = '';

    let probabilities = {
        'U': uppercase.checked,
        'L': true,
        'N': numbers.checked,
        'S': symbols.checked,
    }

    let unused = [];
    let used = [];

    for (const probabilitiesKey in probabilities) {
        if (probabilities[probabilitiesKey]) unused.push(probabilitiesKey);
    }

    for (let i = 0; i < countOfSymbols.value; i++) {
        unused = shuffle(unused);

        let action = unused.pop();

        switch (action) {
            case 'U':
                password += getRandLetter(ALL_LETTERS).toUpperCase();
                break;
            case 'N':
                password += Math.floor(Math.random() * 10);
                break;
            case 'L':
                password += getRandLetter(ALL_LETTERS);
                break;
            case 'S':
                password += getRandLetter(SYMBOLS);
                break;
        }
        used.push(action);
        if (!unused.length) {
            unused = used;
            used = [];
        }
    }

    pastePassword();
    ratePassword(probabilities);
}

function hideShowPass() {
    let path = this.querySelector('path');

    if (path.getAttribute('d') === SHOW) {
        hide = true;
        path.setAttribute('d', HIDE);
    }
    else {
        hide = false;
        path.setAttribute('d', SHOW);
    }

    pastePassword();
}

function pastePassword() {
    pass.textContent = hide ? '*'.repeat(password.length) : password;
}

function getRandLetter(letters) {
    return letters.charAt(Math.floor(Math.random() * letters.length));
}

function shuffle(array) {
    let currentIndex = array.length, temporaryValue, randomIndex;

    while (0 !== currentIndex) {

        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;

        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

function ratePassword(probabilities) {
    let rating = 0;

    if (probabilities['U']) rating++;
    if (probabilities['L']) rating++;
    if (probabilities['N']) rating++;
    if (probabilities['S']) rating++;

    if (password.length < 6 && rating < 3) {
        passRate.textContent = 'Simple';
        passRate.style.color = 'red'
    }
    else if (password.length < 6 && rating >= 3) {
        passRate.textContent = 'Middle';
        passRate.style.color = 'yellow'
    }
    else if (password.length >= 8 && rating < 3) {
        passRate.textContent = 'Middle';
        passRate.style.color = 'yellow'
    }
    else if (password.length >= 8 && rating >= 3) {
        passRate.textContent = 'Hard';
        passRate.style.color = 'green'
    }
    else if (password.length >= 6 && rating === 1) {
        passRate.textContent = 'Simple';
        passRate.style.color = 'red'
    }
    else if (password.length >= 6 && rating > 1 && rating < 4) {
        passRate.textContent = 'Middle';
        passRate.style.color = 'yellow'
    }
    else if (password.length >= 6 && rating === 4) {
        passRate.textContent = 'Hard';
        passRate.style.color = 'green'
    }
}
