
// const seacrhbtn = document.getElementById("searchbtn");
// const searchinput = document.getElementById("searchinput");
// seacrhbtn.addEventListener("click", () => {
//     const query = searchinput.value.trim();
//     console.log("Searching for:", query);
//     if (!query) return;
//     window.location.href = `search.html?q=${encodeURIComponent(query)}`;
//     searchinput.value="";
// });

let params = new URLSearchParams(window.location.search);
let query = params.get("q");

fetch(`https://dummyjson.com/products`)
    .then(response => response.json())
    .then(data => {
        let products = data.products;
        let filteredProducts = products.filter((p)=>{
            return p.title.toLowerCase().includes(query.toLowerCase());
    })
    let container = document.getElementById("results");
});

