(async function all(){
    const [fromSelect, toSelect] = document.querySelectorAll('.currency-select');
    const currencyInput = document.querySelector('.currency-input');
    const convertBtn = document.querySelector('.convert-btn');
    const currencyResult = document.querySelector('#currency-result');
    const swapBtn = document.querySelector('.swap-btn');
    const REGEX = /^(0|[1-9]\d*)$|^\d+(.\d*)?$/;

    let currencyRates = {};
    let activeCurrencies = ['USD', 'EUR'];

    await (async function getCurrencies() {
        currencyRates = await fetch('https://cdn.cur.su/api/cbr.json')
            .then(response => response.json())
            .then(data => data['rates'])
            .catch(error => console.log('error', error));
    })();

    currencyInput.onchange = () => {
        if (!REGEX.test(currencyInput.value)) {
            currencyInput.parentElement.classList.add('wrong');
            convertBtn.setAttribute('disabled', 'true');
        }
        else {
            currencyInput.parentElement.classList.remove('wrong');
            convertBtn.removeAttribute('disabled');
        }
    }

    fromSelect.onchange = () => changeActiveCurrency.bind(fromSelect)(0);
    toSelect.onchange = () => changeActiveCurrency.bind(toSelect)(1);

    convertBtn.addEventListener('click', convert);
    swapBtn.addEventListener('click', swap);

    fromSelect.append(getHtmlSelect(activeCurrencies[0]));
    toSelect.append(getHtmlSelect(activeCurrencies[1]));

    function getHtmlSelect(cur){
        if (!currencyRates) return undefined;

        let fragment = document.createDocumentFragment();
        let ratesList = Object.keys(currencyRates);

        return ratesList.reduce((acc, rate) => {
            let option = document.createElement('option');

            option.innerHTML = rate;
            option.value = rate;
            if (rate === cur) option.selected = true;

            acc.append(option);
            return acc;
        }, fragment)
    }

    function changeActiveCurrency(index) {
        activeCurrencies[index] = this.value;
    }

    function convert() {
        let res = parseFloat(currencyInput.value) * currencyRates[activeCurrencies[1]]/currencyRates[activeCurrencies[0]];

        currencyResult.innerHTML = res.toFixed(5);
    }

    function swap() {
        this.classList.toggle('rotate');

        let tmpCurrency = activeCurrencies[0];
        activeCurrencies[0] = activeCurrencies[1];
        activeCurrencies[1] = tmpCurrency;

        fromSelect.value = activeCurrencies[0];
        toSelect.value = activeCurrencies[1];
    }

})();

