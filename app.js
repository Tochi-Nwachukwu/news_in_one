// INITIALIZATION
let head = document.getElementById("news-heading")
let anchor = document.getElementById("news-link")
let author = document.getElementById("news-author")
let newsDate = document.getElementById("news-date")
let body = document.querySelector('body')
const searchInput = document.querySelector('#search-input')
const resultBox = document.querySelector('.results')
let newsData = []



const getNews = (term = '', url = "news_table.json") => {
    fetch(url)
        .then(response => response.json())
        .then(data => {
            let main_data = data[2].data;
            newsData = [...main_data];
            let filteredData = main_data.filter(data => data.headline.toLowerCase().includes(term.toLowerCase()))

            if (!term) {
                emptyState()
            } else {
                showNews(filteredData)
            }
        })
}

window.onload = getNews();

function emptyState() {
    return resultBox.innerHTML = `
    <h1 class = "empty-state">Search for your favorite News</h1>
    `;
}


function showNews(data) {

    let cards = data.map(element => {
        return `
        <div class="card">
            <div class="image" style="background-image: url('${element.image_links}'); background-position: center;
            background-repeat: no-repeat;
            background-size: cover;">
                
            </div>
            <div class="content">
                <p> Headline </p>
                <h1 id="news-heading">${element.headline}</h1>    
                <p class = "util-bold">Publisher: </p>
                <p id="news-author">${element.news_authors}</p>
                

                <div class="bottom">
                    <div class="publish-date">
                        <p class = "util-bold">Publish date: </p>
                        <p id="news-date">${element.published_date}</p>
                    
                    </div>
                <a href="${element.news_link}" id="news-link" target="_blank">View news from source</a>
                
                </div>
            </div>
        </div>
                `;
    }).join('');

    resultBox.innerHTML = cards;
}

searchInput.addEventListener('keyup', (e) => {
    getNews(e.target.value)
})


{/* <img src="${element.image_links}" alt="image" id = "image" /> */ }