async function fetchOGData(url) {
  const response = await fetch(`https://api.microlink.io?url=${url}`);
  const data = await response.json();
  return {
    title: data.data.title,
    image: data.data.image.url,
    description: data.data.description,
  };
}

async function populateArticles() {
  const urls = [
    "https://www.headforwards.com/insights/got-bugs/",
    "https://www.linkedin.com/pulse/where-start-andy-weir/",
    "https://www.headforwards.com/insights/5-lessons-i-learned-supporting-a-healthtech-transformation/",
  ];

  for (let i = 0; i < urls.length; i++) {
    const preview = await fetchOGData(urls[i]);
    const articleItem = document.createElement("div");
    articleItem.className = "article-item";

    let summary = preview.description.substring(0, 100);
    if (summary < preview.description) summary += "…";
    articleItem.innerHTML = `
      <article class="article-item">
        <a href="${urls[i]}" target="_blank">
          <img src="${preview.image}" alt="${preview.title}" />
          <h3>${preview.title}</h3>
          <p>${summary}</p>
        </a>
      </article>
    `;
    document
      .getElementsByClassName("article-container")[0]
      .appendChild(articleItem);
  }
}

populateArticles();
