// Function to create HTML element based on input data
function createHtmlElement(imageLink, postTitle, description, readMoreLink) {
    const gridItem = document.createElement('div');
    gridItem.classList.add('gridP-item');
    
    const imageDiv = document.createElement('div');
    imageDiv.classList.add('imageDP');
    imageDiv.style.backgroundImage = `url(${imageLink})`;
    
    const contentDiv = document.createElement('div');
    
    const titleElement = document.createElement('h3');
    titleElement.innerText = postTitle;
    
    const descriptionElement = document.createElement('p');
    descriptionElement.innerText = description;
    
    const readMoreLinkElement = document.createElement('a');
    readMoreLinkElement.href = readMoreLink;
    readMoreLinkElement.target = '_blank';
    readMoreLinkElement.style.color = 'inherit';
    readMoreLinkElement.innerText = 'Read more';
    
    contentDiv.appendChild(titleElement);
    contentDiv.appendChild(descriptionElement);
    contentDiv.appendChild(readMoreLinkElement);
    
    // Safety check for image link
    if (imageLink && !imageLink.endsWith("...")) {
        gridItem.appendChild(imageDiv);
    }
    gridItem.appendChild(contentDiv);
    
    return gridItem;
}

// Function to fetch the JSON data and create HTML elements
async function fetchAndDisplayNews() {
    const jsonLink = 'https://mustafadon777.github.io/THCN/colleges_data.json'; 

    try {
        const response = await fetch(jsonLink);
        const data = await response.json();

        const newsContainer = document.getElementById('gridContainer');
        // Get the college key (e.g., "bcc") from the container's initial text/ID
        const collegeKey = newsContainer.innerHTML.trim(); 
        newsContainer.innerHTML = "";

        if (data[collegeKey]) {
            data[collegeKey].forEach(newsItem => {
                // CHANGED: Destructuring from Object instead of Array
                const { 
                    image_reference: image, 
                    title, 
                    description, 
                    read_more_link: link 
                } = newsItem;

                const newsArticle = createHtmlElement(image, title, description, link);
                newsContainer.appendChild(newsArticle);
            });
        }
    } catch (error) {
        console.error('Error fetching the JSON:', error);
    }
}

fetchAndDisplayNews();

// --- Search functions remain the same ---
function searchGrid() {
    const searchTerm = document.getElementById("searchInput").value.toLowerCase();
    const gridItems = document.querySelectorAll(".gridP-item");

    gridItems.forEach(item => {
        item.classList.remove("highlightP");
        item.style.order = ""; 
    });

    let found = false;
    gridItems.forEach(item => {
        if (item.textContent.toLowerCase().includes(searchTerm)) {
            item.classList.add("highlightP");
            item.style.order = "-1"; 
            found = true;
        }
    });

    if (found) {
        const firstMatchedItem = document.querySelector(".highlightP");
        firstMatchedItem.scrollIntoView({ behavior: 'smooth', block: 'center' });
    } else {
        alert("No match found!");
    }
}

function checkEnter(event) {
    if (event.key === 'Enter') {
        searchGrid();
    }
}
