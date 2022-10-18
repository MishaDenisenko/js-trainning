class Error {
    render(){
        ROOT_ERROR.innerHTML = `
            <div class="error-container">
                <h2 class="error-container__title">Не удалось получить доступ🥺</h2>
                <p class="error-container__msg">Попробуйте зайти позже</p>
                <img class="error-container__img" src="../../img/error.png" alt="error">
            </div>
        `;
    }
}

const error = new Error();