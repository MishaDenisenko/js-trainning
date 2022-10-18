class Counter {
    render(){
        this.counter = {};
        CATALOG.forEach(({id}) => {
            this.counter[id] = 1;
        })
    }

    handlerIncCountOfProduct(id){
        return this.counter[id] < 10 ? ++this.counter[id] : 10;
    }

    handlerDecCountOfProduct(id){
        return this.counter[id] > 1 ? --this.counter[id] : 1;
    }

    getCounter(id){
        return this.counter[id];
    }
}

const counter = new Counter();