const container = document.querySelector('.container');

const searchBtn = document.querySelector('.search-button');
const searchInput = document.querySelector('#search-input-id');
const ls = window.localStorage;


let data = {}, books = [];

searchBtn.addEventListener('click', async () => {
    let request = searchInput.value;
    ls.setItem(request, request)

    data = await get(request.split(' ').join('+'));
    if (!data) return;

    data.items.forEach((el) => {
        const book = {};
        const volumeInfo = el['volumeInfo'];

        book.title = volumeInfo['title'];
        book.authors = volumeInfo['authors'].join(',');
        book.categories = volumeInfo['categories'].join(',');
        book.language = volumeInfo['language'];
        book.pageCount = volumeInfo['pageCount'];
        book.link = volumeInfo['canonicalVolumeLink'];
        book.publishedDate = volumeInfo['publishedDate'];
        book.description = volumeInfo['description'];
        book.img = volumeInfo['imageLinks']['smallThumbnail'];

        books.push(book);
    })

    let booksList = document.createElement('ul');
    booksList.classList.add('book-list');
    books.forEach((book, i) => {
        booksList.insertAdjacentHTML("beforeend", createListItem(book, i))
    })
    container.append(booksList)
})

function createListItem(book, index) {
    return `<li class="list-item">

                <div class="item-top">
                    <div class="item-left">
                        <a class="book-link" href="${book.link}" target="_blank">
                            <img src="${book.img}" alt="prevew">
                        </a>
                    </div>
                    <div class="item-right">
                        <h5 class="book-title">
                            <a class="book-link" href="${book.link}" target="_blank">${book.title}</a>
                        </h5>
                        <h6 class="book-info">Author: ${book.authors}</h6>
                        <h6 class="book-info">Published at: ${book.publishedDate}</h6>
                    </div>
                </div>
               
                <div class="item-bottom">
                  <div class="accordion accordion-flush" id="accordionExample">
                      <div class="accordion-item">
                          <h2 class="accordion-header" id="headingOne">
                              <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapse${index}" aria-expanded="false" aria-controls="collapseOne">
                                  Description
                              </button>
                          </h2>
                          <div id="collapse${index}" class="accordion-collapse collapse" aria-labelledby="headingOne">
                              <div class="accordion-body">
                                  <p class="book-description">${book.description}</p>
                              </div>
                          </div>
                      </div>
                  </div>
                </div>
            </li>`
}

async function get(request) {
    let response = await fetch(`https://www.googleapis.com/books/v1/volumes?q=${request}`);

    if (response.ok) return response.json();
    return undefined;
}

