function addToWatchlist(movieName) {
  alert(`✅ "${movieName}" has been added to your watchlist!`);
}

const stars = document.querySelectorAll('#stars span');
const ratingMsg = document.getElementById('rating-msg');

stars.forEach(star => {
  star.addEventListener('click', () => {
    let rating = star.getAttribute('data-value');
    stars.forEach(s => s.classList.remove('selected'));
    for (let i = 0; i < rating; i++) {
      stars[i].classList.add('selected');
    }
    ratingMsg.textContent = `You rated this movie ${rating} star${rating > 1 ? 's' : ''}!`;
  });
});
