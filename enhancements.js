import { animate, inView, scroll } from 'motion';
import Swiper from 'swiper';
import { A11y, Keyboard, Navigation, Pagination } from 'swiper/modules';

const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;

document.querySelectorAll('[data-carousel]').forEach(carousel => {
  const windowElement = carousel.querySelector('.post-window');
  const count = carousel.querySelector('[data-carousel-count]');
  const swiper = new Swiper(windowElement, {
    modules: [A11y, Keyboard, Navigation, Pagination],
    wrapperClass: 'post-track',
    slideClass: 'post-slide',
    slidesPerView: 1,
    speed: reducedMotion ? 0 : 620,
    resistanceRatio: 0.7,
    grabCursor: true,
    watchOverflow: true,
    keyboard: { enabled: true, onlyInViewport: true },
    navigation: {
      previousEl: carousel.querySelector('[data-carousel-prev]'),
      nextEl: carousel.querySelector('[data-carousel-next]')
    },
    pagination: {
      el: carousel.querySelector('[data-carousel-dots]'),
      clickable: true,
      bulletElement: 'button',
      bulletClass: 'post-dot',
      bulletActiveClass: 'active'
    },
    a11y: { enabled: true }
  });
  const updateCount = () => { count.textContent = `${swiper.activeIndex + 1} / ${swiper.slides.length}`; };
  swiper.on('slideChange', updateCount);
  updateCount();
  carousel.querySelector('[aria-label="Like this photo"]')?.addEventListener('click', event => {
    const liked = event.currentTarget.getAttribute('aria-pressed') === 'true';
    event.currentTarget.setAttribute('aria-pressed', String(!liked));
    event.currentTarget.textContent = liked ? '♡' : '♥';
  });
});

if (!reducedMotion) {
  document.querySelectorAll('.project-row, .cert').forEach(target => {
    target.addEventListener('pointerenter', () => animate(target, { y: -7 }, { type: 'spring', stiffness: 240, damping: 19, mass: 0.75 }));
    target.addEventListener('pointerleave', () => animate(target, { y: 0 }, { type: 'spring', stiffness: 210, damping: 22, mass: 0.8 }));
  });

  inView('.project-card', card => {
    const frame = card.querySelector('.project-image');
    if (frame) animate(frame, { opacity: [0, 1], y: [70, 0], rotate: [-1.4, 0] }, { duration: 0.9, easing: [0.16, 0.75, 0.22, 1] });
  }, { margin: '0px 0px -12% 0px' });

  inView('.social-post', post => {
    animate(post, { opacity: [0, 1], scale: [0.94, 1], rotate: [-1.5, 0] }, { duration: 0.85, easing: [0.16, 0.75, 0.22, 1] });
  }, { margin: '0px 0px -10% 0px' });

  const signal = document.querySelector('.hero-signal');
  const hero = document.querySelector('.hero');
  if (signal && hero) scroll(animate(signal, { y: [0, -90], rotate: [-3, 4] }, { easing: 'linear' }), { target: hero, offset: ['start start', 'end start'] });
}
