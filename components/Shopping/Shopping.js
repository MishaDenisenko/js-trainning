class Shopping {
    close() {
        ROOT_SHOPPING.innerHTML = '';
    }

    deleteProduct(id){
        if (!id) localStorageUtil.removeAllProduct();

        localStorageUtil.removeProduct(id);
        this.render();
        header.render();
    }

    render() {
        let countOfProducts = localStorageUtil.getProducts().length;

        if (countOfProducts > 0){
            let htmlCatalog = `
                <tr class="shopping-table-row shopping-table-row__title">
                    <td class="shopping-table-column">Название</td>
                    <td class="shopping-table-column">Кол-во</td>
                    <td class="shopping-table-column">Цена</td>
                    <td class="shopping-table-column"></td>
                </tr>
            `;
            let productsManager = localStorageUtil.getProductsManager();
            let productCount = 0, productPrice = 0;

            CATALOG.forEach(({id, name, price}) => {
                if (Object.keys(productsManager).indexOf(id) > -1) {
                    let countOfProductItem = productsManager[id];
                    productCount += countOfProductItem;
                    productPrice += price * countOfProductItem;

                    htmlCatalog += `
                        <tr class="shopping-table-row">
                            <td class="shopping-table-column">⚡️${name}</td>
                            <td class="shopping-table-column">x ${countOfProductItem}</td>
                            <td class="shopping-table-column">
                                ${Products.formatPrice(price * countOfProductItem)} ${CATALOG.priceId}
                            </td>
                            <td class="shopping-table-column">
                                <button type="submit" class="shopping-table__btn" onclick="shopping.deleteProduct('${id}')">
                                    Убрать
                                </button>
                            </td>
                        </tr>
                    `;
                }
            });

            htmlCatalog += `
                <tr class="shopping-table-row">
                    <td class="shopping-table-column">🔥Всего товаров: </td>
                    <td class="shopping-table-column">${productCount}</td>
                    <td class="shopping-table-column">
                        ${Products.formatPrice(productPrice)} ${CATALOG.priceId}
                    </td>
                    <td class="shopping-table-column">
                        <button type="submit" class="shopping-table__btn" onclick="shopping.deleteProduct()">
                            Убрать вcё
                        </button>
                    </td>
                </tr>
            `;

            ROOT_SHOPPING.innerHTML = `
                <div class="shopping-catalog__fade">
                    <div class="shopping-catalog">
                        <table class="shopping-table">
                            ${htmlCatalog}
                        </table>
                        <span class="shopping-catalog__close" onclick="shopping.close()">
                            <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#000000" stroke-width="1">
                                <line x1="18" y1="6" x2="6" y2="18"></line>
                                <line x1="6" y1="6" x2="18" y2="18"></line>
                            </svg>
                        </span>
                    </div>
                </div>
            `;
        }
        else {
            ROOT_SHOPPING.innerHTML = `
                <div class="shopping-catalog__fade">
                    <div class="shopping-catalog">
                        <div class="shopping-table empty">
                            Корзина пуста
                            <button type="submit" class="shopping-table__btn empty" onclick="shopping.close()">
                                Проджолжить просмотр
                            </button>
                        </div>
                        <span class="shopping-catalog__close" onclick="shopping.close()">
                            <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#000000" stroke-width="1">
                                <line x1="18" y1="6" x2="6" y2="18"></line>
                                <line x1="6" y1="6" x2="18" y2="18"></line>
                            </svg>
                        </span>
                    </div>
                </div>
            `;
        }
    }
}

const shopping = new Shopping();