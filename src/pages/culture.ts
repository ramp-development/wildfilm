import { imagesLoaded } from '$utils/imagesLoaded';

import { scrollAnimation } from '../utils/scrollAnimation';

export const culture = () => {
  heroScroll();
  storyTextHighlight();
  processScroll();

  function heroScroll() {
    const hero = document.querySelector('.hero');
    if (!hero) return;

    const images = [...hero.querySelectorAll('img')];
    if (images.length === 0) return;

    imagesLoaded(images, init);
    function init() {
      const component: HTMLElement | null = document.querySelector('.sticky_component');
      if (!component) return;

      const hero: HTMLElement | null = component.querySelector('.hero');
      if (!hero) return;

      const track: HTMLElement | null = hero.querySelector('.horizontal_track');
      if (!track) return;

      const move: HTMLElement | null = track.querySelector('.horizontal_list');
      if (!move) return;

      const heroHeight = hero.offsetHeight;
      const moveWidth = move.offsetWidth;
      const windowWidth = window.innerWidth;
      component.style.height = `${heroHeight + (moveWidth - windowWidth)}px`;

      scrollAnimation({
        timeline: {
          trigger: component,
          target: move,
          start: `top top`,
          end: `bottom bottom`,
        },
        options: {
          x: (): number => (moveWidth - windowWidth) * -1,
        },
      });
    }
  }

  function storyTextHighlight() {
    const storyTexts = [...document.querySelectorAll('.story_text')];
    storyTexts.forEach((trigger) => {
      new IntersectionObserver(
        (entries, observer) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add('is-active');
              observer.unobserve(entry.target);
            }
          });
        },
        {
          rootMargin: '0px 0px -20% 0px',
          threshold: 0.5,
        }
      ).observe(trigger);
    });
  }

  function processScroll() {
    const target = document.querySelector('.section_how');
    if (!target) return;

    const observer = new IntersectionObserver(callback);
    observer.observe(target);

    function callback(entries, observer) {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;

        init();
        observer.unobserve(entry.target);
      });
    }

    function init() {
      const wrapper: HTMLElement | null = document.querySelector('.process_wrapper');
      if (!wrapper) return;

      const sticky: HTMLElement | null = wrapper.querySelector('.process_sticky');
      if (!sticky) return;

      const track: HTMLElement | null = sticky.querySelector('.process_track');
      if (!track) return;

      const move: HTMLElement | null = track.querySelector('.horizontal_list');
      if (!move) return;

      const windowHeight = window.innerHeight;
      const listHeight = move.offsetHeight;

      const stickyTop = `${windowHeight / 2 - listHeight / 2}px`;
      const stickyBottom = `${windowHeight / 2 + listHeight / 2}px`;

      sticky.style.top = stickyTop;

      const moveWidth = move.offsetWidth;
      const windowWidth = window.innerWidth;
      wrapper.style.height = `${moveWidth - windowWidth}px`;

      scrollAnimation({
        timeline: {
          trigger: wrapper,
          target: move,
          start: `top ${stickyTop}`,
          end: `bottom ${stickyBottom}`,
        },
        options: {
          x: (): number => (moveWidth - windowWidth) * -1,
        },
      });
    }
  }
};
