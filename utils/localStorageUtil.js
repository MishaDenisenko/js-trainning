class LocalStorageUtil {
    constructor() {
        this.keyName = 'products';
        this.products = [];
    }

    getProducts(){
        let products = localStorage.getItem(this.keyName);

        if (products) return JSON.parse(products);
        return [];
    }

    putProduct(id){
        this.products = this.getProducts();
        this.products.push(id);
        this.products.sort();
        this.#updateProducts();
    }

    removeProduct(id){
        this.products = this.getProducts().filter((el) => el !== id);

        this.#updateProducts();
        return this.getProducts();
    }

    removeAllProduct(){
        this.products = [];

        this.#updateProducts();
        return this.getProducts();
    }

    #updateProducts(){
        localStorage.setItem(this.keyName, JSON.stringify(this.products));
    }

    getProductsManager(){
        let products = this.products.length ? this.products : this.getProducts();
        return products.reduce((acc, el) => {
            acc[el] = (acc[el] || 0) + 1;
            return acc;
        }, {});
    }
}

const localStorageUtil = new LocalStorageUtil();