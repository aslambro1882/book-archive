// Total Search Display None Here
document.getElementById('total-search-found').style.display = 'none';

// Function for Toggle Spinner
const toggleSpinner = displayStyle => {
    document.getElementById('spinner').style.display = displayStyle;
}

// Data Load Function Here
const loadData = () => {
    const searchField = document.getElementById('search-field');
    const searchText = searchField.value;
    searchField.value = '';
    toggleSpinner('block');

    const url = `https://openlibrary.org/search.json?q=${searchText}`;
    // Applying Condition for Empty Data
    if (searchText == '') {
        window.alert('write a book name');
    }
    else {
        // Fetching URL Here
        fetch(url)
            .then(res => res.json())
            .then(data => displayData(data));

    }
    // No Result Display Hiding Here
    document.getElementById('no-result').style.display = 'none';
}

// Function for Displaying Data 
const displayData = data => {
    document.getElementById('total-search').innerText = data.numFound;

    // Applying Condition for Miss Match Result
    if (data.numFound == 0) {

        // On Condition Displaying No Result Message here
        document.getElementById('no-result').style.display = 'block';
        // and Hiding Toggle Spinner Here
        toggleSpinner('none');
    }

    data = data.docs;
    const cardSection = document.getElementById('card-section');
    cardSection.textContent = '';

    data.forEach(book => {
        // Assigning URL For Cover Image
        const imageUrl = `https://covers.openlibrary.org/b/id/${book.cover_i}-L.jpg`
        const card = document.createElement('div');
        card.classList.add('col');
        // Adding Inner HTML with Template String and Dynamic Value
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
        // Appending Card to his Parent
        cardSection.appendChild(card);
        // total search resul showing while no result message hiding.
        document.getElementById('total-search-found').style.display = 'block';
        document.getElementById('no-result').style.display = 'none';
        // hiding toggle spinner
        toggleSpinner('none');
    });
}