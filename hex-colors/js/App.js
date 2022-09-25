const body = document.body;
const changeButton = document.querySelector('.change-color');
const [fromColor, toColor] = document.querySelectorAll('.hex-color');

const HEX_NUMS = '0123456789abcdef';

const changeColor = () => {
    let firstColor = '#', secondColor = '#';
    for (let i = 0; i < 6; i++) {
        firstColor += HEX_NUMS[Math.floor(Math.random() * HEX_NUMS.length)];
        secondColor += HEX_NUMS[Math.floor(Math.random() * HEX_NUMS.length)];
    }

    body.style.background = `linear-gradient(to right, ${firstColor}, ${secondColor})`;
    fromColor.innerHTML = firstColor;
    toColor.innerHTML = secondColor;
}

changeButton.addEventListener('click', changeColor);