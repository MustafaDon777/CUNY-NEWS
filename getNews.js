// Function to create HTML element based on input data
function createHtmlElement(imageLink, postTitle, description, readMoreLink) {
    // Create the outer div with class "gridP-item"
    const gridItem = document.createElement('div');
    gridItem.classList.add('gridP-item');
    
    // Create the image div with the background image set to imageLink
    const imageDiv = document.createElement('div');
    imageDiv.classList.add('imageDP');
    imageDiv.style.backgroundImage = `url(${imageLink})`;
    
    // Create the inner content div
    const contentDiv = document.createElement('div');
    
    // Create and append the title (h3)
    const titleElement = document.createElement('h3');
    titleElement.innerText = postTitle;
    
    // Create and append the description (p)
    const descriptionElement = document.createElement('p');
    descriptionElement.innerText = description;
    
    // Create and append the "Read more" link (a)
    const readMoreLinkElement = document.createElement('a');
    readMoreLinkElement.href = readMoreLink;
    readMoreLinkElement.target = '_blank';
    readMoreLinkElement.style.color = 'inherit';
    readMoreLinkElement.innerText = 'Read more';
    
    // Append elements to the content div
    contentDiv.appendChild(titleElement);
    contentDiv.appendChild(descriptionElement);
    contentDiv.appendChild(readMoreLinkElement);
    
    // Append the image div and content div to the grid item
    if (imageLink.slice(-3)!="..."){
        gridItem.appendChild(imageDiv);
    }
    gridItem.appendChild(contentDiv);
    
    // Return the generated HTML element
    return gridItem;
}
// Function to fetch the JSON data and create HTML elements
async function fetchAndDisplayNews() {
    const jsonLink = 'https://mustafadon777.github.io/CUNY-NEWS/cuny_news.json'; // Replace with your actual JSON link

    try {
        const response = await fetch(jsonLink);
        const data = await response.json();

        const newsContainer = document.getElementById('gridContainer');
        const collegeName = newsContainer.innerHTML
        newsContainer.innerHTML = ""
        // Loop through each item in the "mec" array and create HTML elements
        data[collegeName].forEach(newsItem => {
            const [image, title, description, link] = newsItem;

            // Create HTML elements
            const newsArticle = createHtmlElement(image, title, description, link)

            // Append the news article to the container
            newsContainer.appendChild(newsArticle);
        });
    } catch (error) {
        console.error('Error fetching the JSON:', error);
    }
}

// Call the function to fetch and display the news
fetchAndDisplayNews();

function searchGrid() {
    const searchTerm = document.getElementById("searchInput").value.toLowerCase();
    const gridItems = document.querySelectorAll(".gridP-item");

    // Reset the grid by removing all previous highlights and orders
    gridItems.forEach(item => {
        item.classList.remove("highlightP");
        item.style.order = ""; // Reset the order
    });

    let found = false;

    // Loop through each grid item and check if it contains the search term
    gridItems.forEach(item => {
        if (item.textContent.toLowerCase().includes(searchTerm)) {
            // Highlight the matched item
            item.classList.add("highlightP");
            // Move the matched item to the top of the grid
            item.style.order = "-1"; // Move it to the top
            found = true;
        }
    });

    // Scroll the first matched item into view
    if (found) {
        const firstMatchedItem = document.querySelector(".highlightP");
        firstMatchedItem.scrollIntoView({ behavior: 'smooth', block: 'center' });
    } else {
        alert("No match found!");
    }
}

// Check if the Enter key was pressed
function checkEnter(event) {
    if (event.key === 'Enter') {
        searchGrid(); // Call the search function when Enter is pressed
    }
}