const cards = [...document.querySelectorAll('.gallery-card')];
const filters = [...document.querySelectorAll('.filter')];
const lightbox = document.querySelector('#lightbox');
const lightboxImage = document.querySelector('#lightboxImage');
const lightboxTitle = document.querySelector('#lightboxTitle');
const lightboxLocation = document.querySelector('#lightboxLocation');
const lightboxCounter = document.querySelector('#lightboxCounter');
let visibleCards = cards;
let currentIndex = 0;

function updateCount() { document.querySelector('#visibleCount').textContent = visibleCards.length; }
function setLightboxImage(index) {
  currentIndex = (index + visibleCards.length) % visibleCards.length;
  const card = visibleCards[currentIndex];
  const image = card.querySelector('img');
  lightboxImage.src = image.currentSrc || image.src;
  lightboxImage.alt = image.alt;
  lightboxTitle.textContent = card.dataset.title;
  lightboxLocation.textContent = card.dataset.location;
  lightboxCounter.textContent = `${currentIndex + 1} / ${visibleCards.length}`;
}
function openLightbox(card) {
  visibleCards = cards.filter(item => !item.classList.contains('hidden'));
  setLightboxImage(visibleCards.indexOf(card));
  lightbox.classList.add('open');
  lightbox.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
  document.querySelector('.close-lightbox').focus();
}
function closeLightbox() { lightbox.classList.remove('open'); lightbox.setAttribute('aria-hidden', 'true'); document.body.style.overflow = ''; }

filters.forEach(button => button.addEventListener('click', () => {
  const category = button.dataset.filter;
  filters.forEach(filter => filter.classList.toggle('active', filter === button));
  cards.forEach(card => card.classList.toggle('hidden', category !== 'all' && card.dataset.category !== category));
  // visibleCards = cards.filter(card => !card.classList.contains('hidden'));
  updateCount();
}));

cards.forEach(card => {
  card.querySelector('.view-button').addEventListener('click', () => openLightbox(card));
  card.addEventListener('dblclick', () => openLightbox(card));
});
document.querySelector('.close-lightbox').addEventListener('click', closeLightbox);
document.querySelector('.previous').addEventListener('click', () => setLightboxImage(currentIndex - 1));
document.querySelector('.next').addEventListener('click', () => setLightboxImage(currentIndex + 1));
lightbox.addEventListener('click', event => { if (event.target === lightbox) closeLightbox(); });
document.addEventListener('keydown', event => {
  if (!lightbox.classList.contains('open')) return;
  if (event.key === 'Escape') closeLightbox();
  if (event.key === 'ArrowLeft') setLightboxImage(currentIndex - 1);
  if (event.key === 'ArrowRight') setLightboxImage(currentIndex + 1);
});
