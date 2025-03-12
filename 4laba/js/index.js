document.addEventListener("DOMContentLoaded", () => {
    const square = document.querySelector('.square');
    const top = document.querySelector('.top');
    const reviewsGrid = document.getElementById('reviews-grid');
    const reviewForm = document.getElementById('review-form');
    const sortButton = document.getElementById('sort-reviews');
    const filterSelect = document.getElementById('filter-reviews');

    // Начальные отзывы
    let reviews = [
        { name: "Элмес", text: "Питӗ хӑтлӑ та стильлӗ сӗтел!", rating: 5, image: null },
        { name: "Jack", text: "A practical thing, especially if you live alone.", rating: 4, image: null },
        { name: "هاشم", text: "اشتريتها كهدية لصديق، فهو مسرور!", rating: 3, image: null }
    ];

    // Загрузка отзывов из localStorage
    const savedReviews = localStorage.getItem('reviews');
    if (savedReviews) {
        reviews = JSON.parse(savedReviews);
    }

    function Reviews(reviewList) {
        reviewsGrid.innerHTML = '';
        reviewList.forEach(review => {
            const reviewEl = document.createElement('article');
            reviewEl.classList.add('review');
            reviewEl.innerHTML = `
                <p>${review.text}</p>
                <span>- ${review.name}</span>
                <div class="rating">${'★'.repeat(review.rating)}${'☆'.repeat(5 - review.rating)}</div>
                ${review.image ? `<img src="${review.image}" alt="Review image">` : ''}
            `;
            reviewsGrid.appendChild(reviewEl);
        });
    }

    Reviews(reviews);

    reviewForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const name = document.getElementById('review-name').value.trim();
        const text = document.getElementById('review-text').value.trim();
        const rating = document.getElementById('review-rating').value;
        const imageInput = document.getElementById('review-image');
        let imageData = null;

        // Валидация
        if (!name || name.length < 2) {
            alert('Имя должно содержать минимум 2 символа');
            return;
        }
        if (!text || text.length < 5) { // Здесь вы указали 5, но в сообщении 10 — исправьте, если нужно
            alert('Текст отзыва должен содержать минимум 10 символов');
            return;
        }
        if (!rating) {
            alert('Выберите оценку от 1 до 5');
            return;
        }

        if (imageInput.files && imageInput.files[0]) {
            const reader = new FileReader();
            reader.onload = (event) => {
                imageData = event.target.result;
                const newReview = { name, text, rating: parseInt(rating), image: imageData };
                reviews.push(newReview);
                localStorage.setItem('reviews', JSON.stringify(reviews)); // Сохранение в localStorage
                Reviews(reviews);
                reviewForm.reset();
            };
            reader.readAsDataURL(imageInput.files[0]);
        } else {
            const newReview = { name, text, rating: parseInt(rating), image: null };
            reviews.push(newReview);
            localStorage.setItem('reviews', JSON.stringify(reviews)); // Сохранение в localStorage
            Reviews(reviews);
            reviewForm.reset();
        }
    });

    sortButton.addEventListener('click', () => {
        reviews.sort((a, b) => b.rating - a.rating);
        Reviews(reviews);
    });

    filterSelect.addEventListener('change', (e) => {
        const filterValue = e.target.value;
        if (filterValue === 'all') {
            Reviews(reviews);
        } else {
            const filteredReviews = reviews.filter(review => review.rating === parseInt(filterValue));
            Reviews(filteredReviews);
        }
    });

    if (window.innerWidth < 768) return;
    const reklamaWidth = 200 * 2;
    const maxSquareWidth = window.innerWidth - reklamaWidth;

    window.addEventListener('scroll', () => {
        let scrollPosition = window.scrollY;
        let newWidth = Math.max(700, Math.min(maxSquareWidth, 500 + scrollPosition * 5));
        let newHeight = Math.max(300, Math.min(window.innerHeight, 100 + scrollPosition * 4));
        let opacity = Math.min(0.8 + scrollPosition / 240, 1);
        const isDarkTheme = document.body.classList.contains('dark-theme');
        const baseColor = isDarkTheme ? '50, 50, 50' : '177, 176, 176';

        square.style.width = `${newWidth}px`;
        square.style.height = `${newHeight}px`;
        square.style.borderRadius = `${Math.max(scrollPosition / 50, 30)}px ${Math.max(scrollPosition / 50, 30)}px 0px 0px`;
        square.style.background = `rgba(${baseColor}, ${opacity})`;
        top.style.opacity = opacity;
    });

    setTimeout(showBanner, 3000);
    function showBanner() {
        const banner = document.getElementById('banner');
        const banner1 = document.getElementById('banner1');
        const banner2 = document.getElementById('banner2');
        banner.classList.add('show');
        banner1.classList.add('show1');
        banner2.classList.add('show2');
        setRandomPosition(banner);
        setRandomPosition(banner1);
        setRandomPosition(banner2);
    }

    function setRandomPosition(el) {
        el.style.left = `${Math.random() * (window.innerWidth - el.offsetWidth)}px`;
        el.style.top = `${Math.random() * (window.innerHeight - el.offsetHeight)}px`;
    }

    document.getElementById('dark').addEventListener('click', function() {
        document.body.classList.toggle('dark-theme');
        this.textContent = document.body.classList.contains('dark-theme') ? '☀' : '☾';
    });
});

let count = 0;
function Bonus() {
    document.getElementById('bonus').textContent = count;
    count++;
}