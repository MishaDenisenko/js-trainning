const url = 'http://myjson.dit.upm.es/api/bins/cyjc';
const urlLocal = '../server/server.json';
const errorUrl = '../server1/server.json';

let CATALOG = [];
CATALOG.priceId = '$';

(function (){
    spinner.render();

    fetch(url)
        .then(r => r.json())
        .then(data => {
            CATALOG = data

            spinner.handlerClear();

            counter.render();
            products.render();
            header.render();

        })
        .catch(() => {
            spinner.handlerClear();
            error.render()
        });
})();