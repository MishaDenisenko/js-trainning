class Spinner {
    handlerClear(){
        ROOT_SPINNER.innerHTML = '';
    }

    render(){
        ROOT_SPINNER.innerHTML = `
            <div class="spinner-container">
                <img class="spinner-container__img" src="../../img/spinner.svg" alt="loading">
            </div>
        `;
    }
}

const spinner = new Spinner();