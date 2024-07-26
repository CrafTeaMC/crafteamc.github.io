document.addEventListener('DOMContentLoaded', () => {
    const params = new URLSearchParams(window.location.search);
    const postIndex = params.get('post');

    fetch('blog.json')
        .then(response => response.json())
        .then(data => {
            const post = data[postIndex];
            const blogPostContainer = document.getElementById('blog-post');
            
            const headerElement = document.createElement('div');
            headerElement.classList.add('blog-header');

            const titleDateContainer = document.createElement('div');
            titleDateContainer.classList.add('title-date-container');

            const titleElement = document.createElement('h1');
            titleElement.textContent = post.title;

            const dateElement = document.createElement('p');
            dateElement.textContent = post.date;
            dateElement.classList.add('blog-date');

            titleDateContainer.appendChild(titleElement);
            titleDateContainer.appendChild(dateElement);
            headerElement.appendChild(titleDateContainer);

            if (post.thumbnail) {
                const thumbnailElement = document.createElement('img');
                thumbnailElement.src = post.thumbnail;
                thumbnailElement.alt = "Blog thumbnail";
                thumbnailElement.classList.add('blog-thumbnail');
                headerElement.appendChild(thumbnailElement);
            }

            blogPostContainer.appendChild(headerElement);

            if (post.images && post.images.length > 0) {
                const imagesContainer = document.createElement('div');
                imagesContainer.classList.add('blog-images');
                
                post.images.forEach(image => {
                    const imgElement = document.createElement('img');
                    imgElement.src = image;
                    imgElement.alt = "Blog image";
                    imagesContainer.appendChild(imgElement);
                });

                const galleryElement = document.createElement('div');
                galleryElement.classList.add('gallery-container');

                const leftArrow = document.createElement('span');
                leftArrow.classList.add('gallery-arrow', 'left-arrow');
                leftArrow.innerHTML = '&#10094;';
                leftArrow.addEventListener('click', () => showSlides(-1));

                const rightArrow = document.createElement('span');
                rightArrow.classList.add('gallery-arrow', 'right-arrow');
                rightArrow.innerHTML = '&#10095;';
                rightArrow.addEventListener('click', () => showSlides(1));

                galleryElement.appendChild(leftArrow);
                galleryElement.appendChild(imagesContainer);
                galleryElement.appendChild(rightArrow);

                blogPostContainer.appendChild(galleryElement);
            }

            const contentElement = document.createElement('div');
            contentElement.classList.add('blog-content');
            contentElement.innerHTML = post.content; // HTML olarak içerik ekleniyor

            blogPostContainer.appendChild(contentElement);

            // Gallery functionality
            let slideIndex = 0;
            const showSlides = (n) => {
                const slides = document.querySelectorAll('.blog-images img');
                slideIndex += n;

                if (slideIndex >= slides.length) {
                    slideIndex = 0;
                } else if (slideIndex < 0) {
                    slideIndex = slides.length - 1;
                }

                slides.forEach((slide, index) => {
                    slide.style.display = (index === slideIndex) ? 'block' : 'none';
                });
            };

            if (post.images && post.images.length > 0) {
                showSlides(0); // Initialize the gallery to show the first image
            }
        })
        .catch(error => console.error('Error fetching blog post:', error));
});
