document.getElementById('total-search-found').style.display = 'none';

const toggleSpinner = displayStyle => {
    document.getElementById('spinner').style.display = displayStyle;
}

const loadData = () => {
    const searchField = document.getElementById('search-field');
    const searchText = searchField.value;
    searchField.value = '';
    toggleSpinner('block');

    const url = `https://openlibrary.org/search.json?q=${searchText}`;
    if (searchText == '') {
        window.alert('write a book name');
    }
    else {
        fetch(url)
            .then(res => res.json())
            .then(data => displayData(data));

    }
    document.getElementById('no-result').style.display = 'none';
}




const displayData = data => {
    document.getElementById('total-search').innerText = data.numFound;

    if (data.numFound == 0) {
        document.getElementById('no-result').style.display = 'block';
        toggleSpinner('none');
    }

    data = data.docs;
    const cardSection = document.getElementById('card-section');
    cardSection.textContent = '';

    data.forEach(book => {
        const imageUrl = `https://covers.openlibrary.org/b/id/${book.cover_i}-L.jpg`
        const card = document.createElement('div');
        card.classList.add('col');
        card.innerHTML = `
            <div class="card h-100">
                <img src="${imageUrl}" class="card-img-top" alt="Not Found">
                <div class="card-body">
                    <h5 class="card-title text-center">${book.title}</h5>
                    <small class="card-text fst-italic text-secondary">By ${book.author_name?.find(name => name)}</small>
                    <br><br>
                    <small class="card-text d-block fw-bold">Publisher ${book.publisher?.find(publisher => publisher)}</small>
                    <br>
                    <small class="card-text d-block fw-bold">First Published in ${book.first_publish_year} </small>
                </div>
            </div>
        `;
        cardSection.appendChild(card);
        document.getElementById('total-search-found').style.display = 'block';
        document.getElementById('no-result').style.display = 'none';
        toggleSpinner('none');
    });
}