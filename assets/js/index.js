const articleUrls = [
  "https://www.linkedin.com/pulse/from-zero-chatgpt-hero-5-minutes-andy-weir-epire/",
  "https://www.headforwards.com/insights/got-bugs/",
  "https://www.linkedin.com/pulse/where-start-andy-weir/",
  "https://www.headforwards.com/insights/5-lessons-i-learned-supporting-a-healthtech-transformation/",
];

const articleContainer =
  document.getElementsByClassName("article-container")[0];

Promise.resolve()
  .then(fetchArticleElements)
  .then(populateArticleContainer)
  .then(showArticles);

function fetchOGData(url) {
  return fetch(`https://api.microlink.io?url=${url}`)
    .then((response) => response.json())
    .then((data) => ({
      title: data.data.title,
      image: data.data.image.url,
      description: data.data.description,
    }));
}

function fetchArticleElements() {
  return Promise.all(
    articleUrls.map((element) =>
      fetchOGData(element).then((preview) => {
        const articleItem = document.createElement("article");
        articleItem.className = "article-item";

        articleItem.innerHTML = `
          <a href="${element}" target="_blank">
            <img
              src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='1' height='1'%3E%3Crect width='1' height='1' fill='whitesmoke'/%3E%3C/svg%3E"
              data-src="${preview.image}"
              class="placeholder-image"
              alt="Article Image"
              loading="lazy"
              onload="loadFullImage(this)"/>
            <h3>${preview.title}</h3>
            <p>${preview.description}</p>
          </a>
      `;
        return articleItem;
      }),
    ),
  );
}

function populateArticleContainer(articleElements) {
  articleElements.forEach((article) => articleContainer.appendChild(article));
}

function showArticles() {
  articleContainer.style.display = "grid";
}
