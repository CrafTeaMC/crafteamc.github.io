document.addEventListener('DOMContentLoaded', () => {
    fetch('blog.json')
        .then(response => response.json())
        .then(data => {
            const blogPostsContainer = document.getElementById('blog-posts');
            const searchBar = document.getElementById('search-bar');

            const createPostElement = (post) => {
                const postElement = document.createElement('div');
                postElement.className = 'blog-post';

                // Thumbnail kısmı
                if (post.thumbnail) {
                    const thumbnailImg = document.createElement('img');
                    thumbnailImg.src = post.thumbnail;
                    thumbnailImg.alt = `${post.title} thumbnail`;
                    thumbnailImg.className = 'normal-blog-thumbnail';
                    postElement.appendChild(thumbnailImg);
                }

                // İçerik konteynırı
                const contentContainer = document.createElement('div');
                contentContainer.className = 'blog-content-container';

                // Başlık
                const titleLink = document.createElement('a');
                titleLink.href = `map-detail.html?post=${post.index}`;
                const title = document.createElement('h2');
                title.textContent = post.title;
                titleLink.appendChild(title);

                // Tarih
                const date = document.createElement('p');
                date.className = 'blog-date';
                date.textContent = new Date(post.date).toLocaleDateString('tr-TR', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                });

                // İçerik
                const content = document.createElement('div');
                content.className = 'blog-content';
                const truncatedContent = post.content.length > 100 
                    ? `${post.content.substring(0, 100)}...` 
                    : post.content;
                content.innerHTML = truncatedContent;

                // Detay butonu
                const readMore = document.createElement('a');
                readMore.className = 'read-more';
                readMore.href = `map-detail.html?post=${post.index}`;
                readMore.textContent = 'Haritayı İncele';

                // Elemanları birleştirme
                contentContainer.appendChild(titleLink);
                contentContainer.appendChild(date);
                contentContainer.appendChild(content);
                contentContainer.appendChild(readMore);
                postElement.appendChild(contentContainer);

                return postElement;
            };

            const renderPosts = (posts) => {
                blogPostsContainer.innerHTML = '';
                posts.forEach(post => {
                    blogPostsContainer.appendChild(createPostElement(post));
                });
            };

            // Arama fonksiyonu
            const handleSearch = (searchTerm) => {
                const filtered = data
                    .map((post, index) => ({ ...post, index }))
                    .filter(post => 
                        post.title.toLowerCase().includes(searchTerm) || 
                        post.content.toLowerCase().includes(searchTerm)
                    );
                renderPosts(filtered);
            };

            // İlk yükleme
            renderPosts(data.map((post, index) => ({ ...post, index })));

            // Arama input event listener
            searchBar.addEventListener('input', (e) => {
                handleSearch(e.target.value.toLowerCase());
            });

            // URL'de search parametresi varsa
            const urlParams = new URLSearchParams(window.location.search);
            if (urlParams.has('search')) {
                searchBar.value = urlParams.get('search');
                handleSearch(urlParams.get('search').toLowerCase());
            }
        })
        .catch(error => console.error('Veri yüklenirken hata oluştu:', error));
});