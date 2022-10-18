class Products {
    handlerSetLocalStorage(id){
        for (let i = 0; i < counter.getCounter(id); i++) {
            localStorageUtil.putProduct(id);
        }
        header.render();
    }

    setCounter(id, inc = true){
        if (inc) counter.handlerIncCountOfProduct(id);
        else counter.handlerDecCountOfProduct(id);

        this.render();
    }

    render(){
        let list = '<ul class="products-list">';

        CATALOG.forEach(({id, img, name, price}) => {
            let listItem = `
                <li class="products-item">
                    <span class="products-item__title">${name}</span>
                    <img class="products-item__image" src="${img}" alt="guitar-image">
                    <span class="products-item__info">⚡️${Products.formatPrice(price)} ${CATALOG.priceId}</span>
                    <div class="products-item__bottom">
                        <div class="counter">
                            <span class="counter-item counter-item__decrease" onclick="products.setCounter('${id}', false)">
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#000000">
                                    <line x1="5" y1="12" x2="19" y2="12"></line>
                                </svg>
                            </span>
                            <span class="counter-item counter-item__number">${counter.getCounter(id)}</span>
                            <span class="counter-item counter-item__increase" onclick="products.setCounter('${id}')">
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#000000">
                                    <line x1="12" y1="5" x2="12" y2="19"></line>
                                    <line x1="5" y1="12" x2="19" y2="12"></line>
                                </svg>
                            </span>
                        </div>
                        <button class="products-item__btn" type="submit" onclick="products.handlerSetLocalStorage('${id}')">В корзину</button>
                    </div>
                </li>
            `;
            list += listItem;
        })

        list += '</ul>';

        ROOT_PRODUCTS.innerHTML = list;
    }

    static formatPrice(price){
        return price.toLocaleString().replace(/\s/, ',');
    }
}

const products = new Products();