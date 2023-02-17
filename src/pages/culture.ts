import { scrollAnimation } from '../utils/scrollAnimation';

export const culture = () => {
  heroScroll();
  storyTextHighlight();
  processScroll();

  function heroScroll() {
    const component: HTMLElement = document.querySelector('.sticky_component');
    const hero: HTMLElement = document.querySelector('.hero');
    const track: HTMLElement = hero.querySelector('.horizontal_track');
    const move: HTMLElement = track.querySelector('.horizontal_list');
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
        x: function () {
          return (moveWidth - windowWidth) * -1;
        },
      },
    });
  }

  function storyTextHighlight() {
    const storyTexts = [...document.querySelectorAll('.story_text')];
    storyTexts.forEach((trigger) => {
      new IntersectionObserver(
        (entries, observer) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add('is-active');
            }
          });
        },
        {
          rootMargin: '0px 0px -45% 0px',
          threshold: 0.5,
        }
      ).observe(trigger);
    });
  }

  function processScroll() {
    const wrapper: HTMLElement = document.querySelector('.process_wrapper');
    const sticky: HTMLElement = wrapper.querySelector('.process_sticky');
    const track: HTMLElement = sticky.querySelector('.process_track');
    const move: HTMLElement = track.querySelector('.horizontal_list');

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
        x: function () {
          return (moveWidth - windowWidth) * -1;
        },
      },
    });
  }
};
