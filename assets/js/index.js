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
            <img src="${preview.image}" alt="${preview.title}" />
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
