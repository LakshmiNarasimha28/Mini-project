
let historydiv = document.getElementById("history-container");
let history = JSON.parse(localStorage.getItem("searchHistory")) || [];

if (history.length === 0) {
    historydiv.innerHTML = '<p>No search history found.</p>';
} else {
    // Sort history by time, most recent first
    history.sort((a, b) => b.time - a.time);
    history.forEach(item => {
        let itemDiv = document.createElement("div");
        itemDiv.className = "history-item";
        let date = new Date(item.time);
        itemDiv.innerHTML = `
            <strong>${item.query}</strong><br/>
            <small>${date.toLocaleString()}</small>
            <input type="checkbox" id="clearhistorycheckbox" title="Clear this history item"/>
        `;
        historydiv.appendChild(itemDiv);
    });


}
//clear history functionality

const clearbtn = document.getElementById("clearhistorybtn");
clearbtn.addEventListener("click", () => {
    localStorage.removeItem("searchHistory");
    historydiv.innerHTML = '<p>No search history found.</p>';
});

//clear history using checkbox click
const clearcheckbox = document.getElementById("clearhistorycheckbox");
clearcheckbox.addEventListener("change", () => {
    if (clearcheckbox.checked) {
        localStorage.removeItem("searchHistory");
        historydiv.innerHTML = '<p>No search history found.</p>';
    }
});