 
// Initialize data from local storage or empty object
let linkData = JSON.parse(localStorage.getItem('myLinks')) || { "Motivation": [] };

const displayArea = document.getElementById('displayArea');
const categorySelect = document.getElementById('categorySelect');

function render() {
    displayArea.innerHTML = '';
    categorySelect.innerHTML = '';
    
    for (const category in linkData) {
        // Update Dropdown
        const opt = document.createElement('option');
        opt.value = category;
        opt.innerText = category;
        categorySelect.appendChild(opt);

        // Update List View
        const section = document.createElement('div');
        section.className = 'category-block';
        section.innerHTML = `<h3>${category}</h3><ul>${linkData[category].map(link => `<li><a href="${link}" target="_blank">${link}</a></li>`).join('')}</ul>`;
        displayArea.appendChild(section);
    }
}

document.getElementById('saveBtn').addEventListener('click', () => {
    const url = document.getElementById('linkInput').value;
    const cat = categorySelect.value;
    
    if (url) {
        linkData[cat].push(url);
        localStorage.setItem('myLinks', JSON.stringify(linkData));
        document.getElementById('linkInput').value = '';
        render();
    }
});

function addNewCategory() {
    const newCat = prompt("Enter new category name:");
    if (newCat && !linkData[newCat]) {
        linkData[newCat] = [];
        localStorage.setItem('myLinks', JSON.stringify(linkData));
        render();
    }
}

render();
