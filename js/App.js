const burger = document.querySelector('.nav-burger');
const closeButton = document.querySelector('#close');

burger.addEventListener('click', openClose)
closeButton.addEventListener('click', openClose)

function openClose() {
    closeButton.parentElement.parentElement.classList.toggle('open');
    closeButton.parentElement.parentElement.classList.toggle('close');
}
