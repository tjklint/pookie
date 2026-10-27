const track = document.querySelector('.book');
const slides = [...track.querySelectorAll('figure')];
const previous = document.querySelector('.previous');
const next = document.querySelector('.next');
const counter = document.querySelector('.slide-count');
let current = 0;

function goToSlide(index) {
  const target = Math.max(0, Math.min(index, slides.length - 1));
  track.scrollTo({
    left: target * track.clientWidth,
    behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth',
  });
}

previous.addEventListener('click', () => goToSlide(current - 1));
next.addEventListener('click', () => goToSlide(current + 1));
track.addEventListener('scroll', () => {
  current = Math.round(track.scrollLeft / track.clientWidth);
  previous.disabled = current === 0;
  next.disabled = current === slides.length - 1;
  counter.textContent = `${String(current + 1).padStart(2, '0')} / ${String(slides.length).padStart(2, '0')}`;
}, { passive: true });
track.addEventListener('keydown', (event) => {
  if (!['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(event.key)) return;
  event.preventDefault();
  if (event.key === 'Home') goToSlide(0);
  else if (event.key === 'End') goToSlide(slides.length - 1);
  else goToSlide(current + (event.key === 'ArrowRight' ? 1 : -1));
});

const lightbox = document.querySelector('.lightbox');
const lightboxImage = lightbox.querySelector('img');
document.querySelectorAll('[data-photo]').forEach((button) => {
  button.addEventListener('click', () => {
    const image = button.querySelector('img');
    lightboxImage.src = image.src;
    lightboxImage.alt = image.alt;
    lightbox.querySelector('p').textContent = button.dataset.title;
    lightbox.showModal();
  });
});
lightbox.querySelector('.lightbox-close').addEventListener('click', () => lightbox.close());
lightbox.addEventListener('click', (event) => {
  if (event.target === lightbox) lightbox.close();
});
document.querySelector('#year').textContent = new Date().getFullYear();
