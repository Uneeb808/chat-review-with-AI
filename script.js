document.addEventListener('DOMContentLoaded', () => {
    const authPage = document.getElementById('authPage');
    const mainPage = document.getElementById('mainPage');
    const gmailLoginButton = document.getElementById('gmailLogin');
    const steamLoginButton = document.getElementById('steamLogin');
    const logoutButton = document.getElementById('logout');
    const submitReviewButton = document.getElementById('submitReview');
    const reviewList = document.getElementById('reviewList');
    const sortSelect = document.getElementById('sortReviews');
    const clearReviewsButton = document.getElementById('clearReviews');

    let currentUser = null; 

    
    function showAuthPage() {
        authPage.classList.remove('hidden');
        mainPage.classList.add('hidden');
    }

    
    function showMainPage() {
        authPage.classList.add('hidden');
        mainPage.classList.remove('hidden');
    }

    
    gmailLoginButton.addEventListener('click', () => {
        currentUser = {
            id: 'gmail_user_123',
            name: 'Gmail User',
            platform: 'Gmail',
        };
        showMainPage();
    });

   
    steamLoginButton.addEventListener('click', () => {
        currentUser = {
            id: 'steam_user_456',
            name: 'Steam User',
            platform: 'Steam',
        };
        showMainPage();
    });

    
    logoutButton.addEventListener('click', () => {
        currentUser = null;
        showAuthPage();
    });

    loadReviews();

    
    submitReviewButton.addEventListener('click', () => {
        if (!currentUser) {
            alert('You must log in to submit a review.');
            return;
        }

        const gameTitle = document.getElementById('gameTitle').value.trim();
        const reviewText = document.getElementById('reviewText').value.trim();
        const photoInput = document.getElementById('photoInput');
        const reviewType = document.getElementById('reviewType').value;

        if (!gameTitle) {
            alert('Please enter the game title.');
            return;
        }
        if (!reviewText) {
            alert('Please enter the review text.');
            return;
        }
        if (!reviewType) {
            alert('Please select the review type.');
            return;
        }

        const photos = Array.from(photoInput.files).map(file => URL.createObjectURL(file));
        const review = {
            id: Date.now(), 
            authorId: currentUser.id,
            authorName: currentUser.name,
            gameTitle,
            reviewText,
            reviewType,
            photos,
            upvotes: 0,
            upvotedBy: [],
        };

        saveReview(review);
        displayReview(review);

        document.getElementById('gameTitle').value = '';
        document.getElementById('reviewText').value = '';
        photoInput.value = '';
        document.getElementById('reviewType').value = '';
    });

    
    function saveReview(review) {
        const reviews = getReviews();
        reviews.push(review);
        localStorage.setItem('reviews', JSON.stringify(reviews));
    }


    function getReviews() {
        return JSON.parse(localStorage.getItem('reviews')) || [];
    }


    function loadReviews() {
        reviewList.innerHTML = ''; 
        const reviews = getReviews();
        reviews.forEach(displayReview);
    }


    function displayReview(review) {
        const reviewDiv = document.createElement('div');
        reviewDiv.classList.add('review-item');

        const titleElement = document.createElement('h3');
        titleElement.textContent = review.gameTitle;

        const authorElement = document.createElement('p');
        authorElement.textContent = `By: ${review.authorName}`;

        const typeElement = document.createElement('p');
        typeElement.textContent = `Review Type: ${review.reviewType}`;

        const textElement = document.createElement('p');
        textElement.textContent = review.reviewText;

        const photoContainer = document.createElement('div');
        photoContainer.classList.add('photo-container');
        review.photos.forEach(photo => {
            const img = document.createElement('img');
            img.src = photo;
            photoContainer.appendChild(img);
        });

        const upvoteButton = document.createElement('button');
        upvoteButton.classList.add('upvote-button');
        upvoteButton.textContent = `Upvotes: ${review.upvotes}`;

       
        upvoteButton.addEventListener('click', () => {
            if (!currentUser) {
                alert('You must log in to upvote.');
                return;
            }
            if (review.upvotedBy.includes(currentUser.id)) {
                alert('You have already upvoted this review.');
                return;
            }

            review.upvotes++;
            review.upvotedBy.push(currentUser.id);
            upvoteButton.textContent = `Upvotes: ${review.upvotes}`;
            updateLocalStorage(review);
        });

       
        if (currentUser && review.authorId === currentUser.id) {
            const editButton = document.createElement('button');
            editButton.textContent = 'Edit';
            editButton.classList.add('edit-button');
            editButton.addEventListener('click', () => editReview(review));

            const deleteButton = document.createElement('button');
            deleteButton.textContent = 'Delete';
            deleteButton.classList.add('delete-button');
            deleteButton.addEventListener('click', () => deleteReview(review.id));

            reviewDiv.appendChild(editButton);
            reviewDiv.appendChild(deleteButton);
        }

        reviewDiv.appendChild(titleElement);
        reviewDiv.appendChild(authorElement);
        reviewDiv.appendChild(typeElement);
        reviewDiv.appendChild(textElement);
        reviewDiv.appendChild(photoContainer);
        reviewDiv.appendChild(upvoteButton);

        reviewList.appendChild(reviewDiv);
    }

    
    function updateLocalStorage(updatedReview) {
        const reviews = getReviews();
        const index = reviews.findIndex(review => review.id === updatedReview.id);
        if (index !== -1) {
            reviews[index] = updatedReview; 
            localStorage.setItem('reviews', JSON.stringify(reviews));
        }
    }

   
    function editReview(review) {
        const newText = prompt('Edit your review:', review.reviewText);
        if (newText) {
            review.reviewText = newText;
            updateLocalStorage(review);
            loadReviews();
        }
    }

   
    function deleteReview(reviewId) {
        const reviews = getReviews().filter(review => review.id !== reviewId);
        localStorage.setItem('reviews', JSON.stringify(reviews));
        loadReviews();
    }

    
    clearReviewsButton.addEventListener('click', () => {
        if (confirm('Are you sure you want to clear all reviews?')) {
            localStorage.removeItem('reviews');
            loadReviews();
        }
    });

   
    sortSelect.addEventListener('change', () => {
        const reviews = getReviews();
        if (sortSelect.value === 'mostRecent') {
            reviews.sort((a, b) => b.id - a.id);
        } else if (sortSelect.value === 'mostUpvotes') {
            reviews.sort((a, b) => b.upvotes - a.upvotes);
        }
        reviewList.innerHTML = '';
        reviews.forEach(displayReview);
    });
});



