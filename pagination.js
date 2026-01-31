let currentpage = 1;
let itemsperpage = 10;
let allproducts = [];
let container = document.getElementById("productList");
let prevbtn = document.getElementById("prevbtn");
let nextbtn = document.getElementById("nextbtn");
let pageinfo = document.getElementById("pageinfo");

fetch("https://dummyjson.com/products")
    .then(response => response.json())
    .then(data => { 
        allproducts = data.products;
        if(allproducts.length ===0) {
            container.innerHTML = '<p>No products available.</p>';
            prevbtn.disabled = true;
            nextbtn.disabled = true;
            pageinfo.innerText = '';
            return;
        }
        renderpage();
    });

    function renderpage() {
    container.innerHTML = '';
    let startindex = (currentpage - 1) * itemsperpage;
    // let endindex = Math.min(startindex + itemsperpage, allproducts.length);
    let endindex = startindex + itemsperpage;
    let pageitems = allproducts.slice(startindex, endindex);   

    pageitems.forEach(product => {
        let card = document.createElement('div');
        card.classList.add('product-card');
        card.innerHTML = `
            <img src="${product.thumbnail}" alt="${product.title}" />
            <h3>${product.title}</h3>
            <p>Price: $${product.price}</p>
        `;
        container.appendChild(card);

        let totalPages = Math.ceil(allproducts.length / itemsperpage);
        pageinfo.innerText = `Page ${currentpage} of ${totalPages}`;

        prevbtn.disabled = currentpage === 1;
        nextbtn.disabled = currentpage === totalPages;
        
        card.addEventListener("click", ()=>{
            window.location.href = `productdetails.html?id=${product.id}`;
        });
        // prevbtn.addEventListener("click", ()=>{
        //     if (currentpage > 1) {
        //         currentpage--;
        //         renderpage();
        //         window.scrollTo({top:0, behavior: "smooth"});
        //     }
        // });
        // nextbtn.addEventListener("click", ()=>{
        //     if (currentpage < totalPages) {
        //         currentpage++;
        //         renderpage();
        //         window.scrollTo({top:0, behavior: "smooth"});
        //     }
        // });
        prevbtn.addEventListener("click", ()=>{
            currentpage--;
            renderpage();
            window.scrollTo({top:0, behavior: "smooth"});
        });
        nextbtn.addEventListener("click", ()=>{
            currentpage++;
            renderpage();
            window.scrollTo({top:0, behavior: "smooth"});
        });

    });
}