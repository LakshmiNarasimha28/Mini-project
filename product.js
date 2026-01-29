let productcontainer = document.getElementById("products-container");

function dispalyProducts(data) {

    productcontainer.style.display = 'grid';
    productcontainer.style.gridTemplateColumns = 'repeat(auto-fill, minmax(200px, 1fr))';
    productcontainer.style.gap = '20px';
    data.forEach(product =>{
        let productDiv = document.createElement('div');
        productDiv.classList.add('product');
        productDiv.innerHTML = `
            <img src="${product.thumbnail}" alt="${product.title}" />
            <h2>${product.title}</h2>
            <p>Price: $${product.price}</p>
            <button>Add to Cart</button>
        `;
        productcontainer.appendChild(productDiv);
    });
}
async function fetchProducts() {
    try {
        let response = await fetch("https://dummyjson.com/products");
        let data = await response.json();
        console.log(data.products);
        dispalyProducts(data.products);
    } catch (error) {
        console.error("Error fetching products:", error);
    }
}

fetchProducts();


