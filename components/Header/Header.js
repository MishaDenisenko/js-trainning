class Header {
    handlerOpenShoppingCatalog(){
        shopping.render();
    }

    render(){
        let products = localStorageUtil.getProducts();

        ROOT_HEADER.innerHTML = `
            <div class="header-container">
                <div class="header">
                    <nav class="header-nav">
                        <a class="header-nav-item">home</a>
                        <a class="header-nav-item">contact</a>
                    </nav>
                    <div class="header-cart" onclick="header.handlerOpenShoppingCatalog()">
                        <span class="header-cart__counter">🛒 ${products.length}</span>
                    </div>
                </div>
            </div>
            
        `;
    }
}

const header = new Header();