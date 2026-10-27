const photos = [...document.querySelectorAll('[data-photo]')];
const lightbox = document.querySelector('.lightbox');
const lightboxImage = lightbox.querySelector('img');
const previous = lightbox.querySelector('.previous');
const next = lightbox.querySelector('.next');
const counter = lightbox.querySelector('.slide-count');
let current = 0;

function showPhoto(index) {
  current = (index + photos.length) % photos.length;
  const image = photos[current].querySelector('img');
  lightboxImage.src = image.src;
  lightboxImage.alt = image.alt;
  counter.textContent = photos[current].dataset.title;
}

photos.forEach((button, index) => {
  button.addEventListener('click', () => {
    showPhoto(index);
    lightbox.showModal();
  });
});

previous.addEventListener('click', () => showPhoto(current - 1));
next.addEventListener('click', () => showPhoto(current + 1));
lightbox.addEventListener('keydown', (event) => {
  if (!['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(event.key)) return;
  event.preventDefault();
  if (event.key === 'Home') showPhoto(0);
  else if (event.key === 'End') showPhoto(photos.length - 1);
  else showPhoto(current + (event.key === 'ArrowRight' ? 1 : -1));
});

let touchStart;
lightboxImage.addEventListener('touchstart', (event) => {
  touchStart = event.touches.length === 1 ? event.touches[0] : undefined;
}, { passive: true });
lightboxImage.addEventListener('touchend', (event) => {
  if (!touchStart || event.touches.length) return;
  const dx = event.changedTouches[0].clientX - touchStart.clientX;
  const dy = event.changedTouches[0].clientY - touchStart.clientY;
  if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy)) {
    showPhoto(current + (dx < 0 ? 1 : -1));
  }
  touchStart = undefined;
}, { passive: true });
lightboxImage.addEventListener('touchcancel', () => { touchStart = undefined; });

lightbox.querySelector('.lightbox-close').addEventListener('click', () => lightbox.close());
lightbox.addEventListener('click', (event) => {
  if (event.target === lightbox) lightbox.close();
});
document.querySelector('#year').textContent = new Date().getFullYear();
