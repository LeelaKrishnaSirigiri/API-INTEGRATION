class NewsApp {
    constructor() {
        this.apiKey = 'YOUR_API_KEY_HERE'; // Replace with your NewsAPI key
        this.baseUrl = 'https://newsapi.org/v2/top-headlines';
        this.currentCategory = 'general';
        this.newsContainer = document.getElementById('newsContainer');
        this.loadingSpinner = document.getElementById('loadingSpinner');
        this.errorMessage = document.getElementById('errorMessage');
        this.categorySelect = document.getElementById('categorySelect');
        this.refreshBtn = document.getElementById('refreshBtn');
        
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.loadNews();
    }

    setupEventListeners() {
        this.categorySelect.addEventListener('change', (e) => {
            this.currentCategory = e.target.value;
            this.loadNews();
        });

        this.refreshBtn.addEventListener('click', () => {
            this.loadNews();
        });
    }

    async loadNews() {
        this.showLoading();
        this.hideError();
        
        try {
            const news = await this.fetchNews();
            this.displayNews(news);
        } catch (error) {
            console.error('Error fetching news:', error);
            this.showError();
        } finally {
            this.hideLoading();
        }
    }

    async fetchNews() {
        // For demo purposes, we'll use a mock API response
        // In production, uncomment the real API call below
        
        // Real API call (requires API key):
        // const response = await fetch(`${this.baseUrl}?country=us&category=${this.currentCategory}&apiKey=${this.apiKey}`);
        // if (!response.ok) throw new Error('Failed to fetch news');
        // return await response.json();
        
        // Mock data for demonstration
        return this.getMockNews();
    }

    getMockNews() {
        const mockArticles = [
            {
                title: "Breaking: Major Technology Breakthrough Announced",
                description: "Scientists have made a significant breakthrough in quantum computing that could revolutionize the tech industry. The new development promises faster processing speeds and enhanced security features.",
                urlToImage: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=400&h=250&fit=crop",
                url: "https://example.com/article1",
                source: { name: "Tech News Daily" },
                publishedAt: "2024-07-18T10:30:00Z"
            },
            {
                title: "Global Climate Summit Reaches Historic Agreement",
                description: "World leaders have reached a groundbreaking agreement on climate action during the international summit. The deal includes ambitious targets for renewable energy adoption and carbon reduction.",
                urlToImage: "https://images.unsplash.com/photo-1569163139394-de4e4f43e4e5?w=400&h=250&fit=crop",
                url: "https://example.com/article2",
                source: { name: "World Report" },
                publishedAt: "2024-07-18T09:15:00Z"
            },
            {
                title: "Space Exploration Milestone: New Mars Discovery",
                description: "NASA's latest Mars rover has discovered evidence of ancient water systems on the Red Planet. This finding could provide crucial insights into the possibility of past life on Mars.",
                urlToImage: "https://images.unsplash.com/photo-1446776653964-20c1d3a81b06?w=400&h=250&fit=crop",
                url: "https://example.com/article3",
                source: { name: "Space Explorer" },
                publishedAt: "2024-07-18T08:45:00Z"
            },
            {
                title: "Economic Markets Show Strong Recovery Signs",
                description: "Stock markets worldwide are showing positive trends as economic indicators point to a robust recovery. Experts predict continued growth in the coming quarters.",
                urlToImage: "https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?w=400&h=250&fit=crop",
                url: "https://example.com/article4",
                source: { name: "Financial Times" },
                publishedAt: "2024-07-18T07:30:00Z"
            },
            {
                title: "Healthcare Innovation: New Treatment Shows Promise",
                description: "A revolutionary new treatment for chronic diseases has shown remarkable results in clinical trials. The therapy could potentially help millions of patients worldwide.",
                urlToImage: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400&h=250&fit=crop",
                url: "https://example.com/article5",
                source: { name: "Health Today" },
                publishedAt: "2024-07-18T06:20:00Z"
            },
            {
                title: "Sports Championship Delivers Thrilling Final",
                description: "The championship final delivered an unforgettable performance with record-breaking attendance. Fans witnessed one of the most exciting matches in recent history.",
                urlToImage: "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=400&h=250&fit=crop",
                url: "https://example.com/article6",
                source: { name: "Sports Central" },
                publishedAt: "2024-07-18T05:10:00Z"
            }
        ];

        return {
            articles: mockArticles,
            totalResults: mockArticles.length
        };
    }

    displayNews(newsData) {
        this.newsContainer.innerHTML = '';
        
        if (!newsData.articles || newsData.articles.length === 0) {
            this.newsContainer.innerHTML = '<p class="no-news">No news articles found.</p>';
            return;
        }

        newsData.articles.forEach(article => {
            const newsCard = this.createNewsCard(article);
            this.newsContainer.appendChild(newsCard);
        });
    }

    createNewsCard(article) {
        const card = document.createElement('div');
        card.className = 'news-card';
        card.innerHTML = `
            ${article.urlToImage ? 
                `<img src="${article.urlToImage}" alt="${article.title}" class="news-image" onerror="this.style.display='none';">` : 
                `<div class="news-image no-image">📰</div>`
            }
            <h3 class="news-title">${article.title}</h3>
            <p class="news-description">${article.description || 'No description available.'}</p>
            <div class="news-meta">
                <span class="news-source">${article.source.name}</span>
                <span class="news-date">${this.formatDate(article.publishedAt)}</span>
            </div>
            <a href="${article.url}" target="_blank" class="read-more">Read More</a>
        `;
        return card;
    }

    formatDate(dateString) {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    }

    showLoading() {
        this.loadingSpinner.style.display = 'block';
        this.newsContainer.style.display = 'none';
    }

    hideLoading() {
        this.loadingSpinner.style.display = 'none';
        this.newsContainer.style.display = 'grid';
    }

    showError() {
        this.errorMessage.style.display = 'block';
        this.newsContainer.style.display = 'none';
    }

    hideError() {
        this.errorMessage.style.display = 'none';
    }
}

// Initialize the app when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new NewsApp();
});

// Instructions for using a real API:
/*
To use with a real news API:

1. Sign up for a free API key at https://newsapi.org/
2. Replace 'YOUR_API_KEY_HERE' with your actual API key
3. Uncomment the real API call in the fetchNews() method
4. Comment out or remove the getMockNews() method call

Example with real API:
async fetchNews() {
    const response = await fetch(`${this.baseUrl}?country=us&category=${this.currentCategory}&apiKey=${this.apiKey}`);
    if (!response.ok) throw new Error('Failed to fetch news');
    return await response.json();
}
*/