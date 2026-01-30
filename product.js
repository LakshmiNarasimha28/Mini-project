let productcontainer = document.getElementById("products-container");

function displayProducts(data) {

    productcontainer.style.display = 'grid';
    productcontainer.style.gridTemplateColumns = 'repeat(auto-fill, minmax(200px, 1fr))';
    productcontainer.style.gap = '20px';
    data.forEach(product =>{
        let productDiv = document.createElement('div');
        productDiv.classList.add('product');
        productDiv.innerHTML = `
            <img src="${product.thumbnail}" alt="${product.title}" />
            <h3>${product.title}</h3>
            <p>Price: $${product.price}</p>
        `;
        productcontainer.appendChild(productDiv);
    });
}
async function fetchProducts() {
    try {
        let response = await fetch("https://dummyjson.com/products");
        let data = await response.json();
        console.log(data.products);
        displayProducts(data.products);
    } catch (error) {
        console.error("Error fetching products:", error);
    }
}

fetchProducts();



const searchbtn = document.getElementById("searchbtn");
const searchinput = document.getElementById("searchinput");
searchbtn.addEventListener("click", () => {
    const query = searchinput.value.trim();
    console.log("Searching for:", query);
    if (!query) return;
    
    // save to local storage
    let history = JSON.parse(localStorage.getItem("searchHistory")) || [];
    
    // Check if query already exists
    const existingIndex = history.findIndex(item => item.query === query);
    if (existingIndex === -1) {
        history.push({
            query: query,
            time: Date.now()
        });
        localStorage.setItem("searchHistory", JSON.stringify(history));
    }
    
    window.location.href = `search.html?q=${encodeURIComponent(query)}`;
    searchinput.value="";
});


const suggestionsbox = document.getElementById("suggestions");
searchinput.addEventListener("input", () => {
    console.log("Suggestion triggered");

    const text = searchinput.value.trim().toLowerCase();
    const history = JSON.parse(localStorage.getItem("searchHistory")) || [];


    //filter based on query field
    const matches = history.filter(item => item.query.toLowerCase().includes(text));

    // Clear previous suggestions
    suggestionsbox.innerHTML = '';

    //show suggestions
    matches.forEach(item => {
        const suggestionDiv = document.createElement("div");
        suggestionDiv.className = "suggestion-item";
        suggestionDiv.innerText = item.query;

        suggestionDiv.addEventListener("click", () => {
            searchinput.value = item.query;
            suggestionsbox.innerHTML = '';
        });

        suggestionsbox.appendChild(suggestionDiv);
    });
});