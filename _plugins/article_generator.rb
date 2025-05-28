# _plugins/article_generator.rb
require 'net/http'
require 'uri'
require 'json'

module Jekyll
  class ArticleGenerator < Generator
    safe true

    def generate(site)
      article_urls = [
        "https://www.linkedin.com/pulse/from-zero-chatgpt-hero-5-minutes-andy-weir-epire/",
        "https://www.headforwards.com/insights/got-bugs/",
        "https://www.linkedin.com/pulse/where-start-andy-weir/",
        "https://www.headforwards.com/insights/5-lessons-i-learned-supporting-a-healthtech-transformation/"
      ]

      articles_html = generate_articles_html(article_urls)

      # Store in site data for use in templates
      site.data['articles_html'] = articles_html
    end

    def fetch_og_data(url)
      uri = URI("https://api.microlink.io?url=#{URI.encode_www_form_component(url)}")
      response = Net::HTTP.get(uri)
      data = JSON.parse(response)

      {
        'url' => url,
        'title' => data.dig('data', 'title') || 'Article',
        'image' => data.dig('data', 'image', 'url') || '',
        'description' => data.dig('data', 'description') || 'No description available'
      }
    rescue => e
      puts "Error fetching data for #{url}: #{e.message}"
      {
        'url' => url,
        'title' => 'Failed to load article',
        'image' => '',
        'description' => 'Could not retrieve article data'
      }
    end

    def generate_articles_html(urls)
      articles_html = ""

      urls.each do |url|
        article = fetch_og_data(url)
        articles_html += <<~HTML
          <article class="article-item">
            <a href="#{article['url']}" target="_blank">
              <img
                src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='1' height='1'%3E%3Crect width='1' height='1' fill='whitesmoke'/%3E%3C/svg%3E"
                data-src="#{article['image']}"
                class="placeholder-image"
                alt="Article Image"
                loading="lazy"
                onload="loadFullImage(this)"/>
              <h3>#{article['title']}</h3>
              <p>#{article['description']}</p>
            </a>
          </article>
        HTML
      end

      articles_html
    end
  end
end