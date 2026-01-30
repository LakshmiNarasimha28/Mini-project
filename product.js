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



const seacrhbtn = document.getElementById("searchbtn");
const searchinput = document.getElementById("searchinput");
seacrhbtn.addEventListener("click", () => {
    const query = searchinput.value.trim();
    console.log("Searching for:", query);
    if (!query) return;
    window.location.href = `search.html?query=${encodeURIComponent(query)}`;
    searchinput.value="";
});
