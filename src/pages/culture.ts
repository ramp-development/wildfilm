import { getDistanceFromTop } from '../utils/getDistanceFromTop';
import { scrollAnimation } from '../utils/scrollAnimation';

export const culture = () => {
  heroScroll();
  storyTextHighlight();
  processScroll();

  function heroScroll() {
    const hero: HTMLElement = document.querySelector('.hero');
    const track: HTMLElement = hero.querySelector('.horizontal_track');
    const sticky: HTMLElement = track.querySelector('.horizontal_sticky');
    const move: HTMLElement = sticky.querySelector('.horizontal_list');

    const stickyTop = `${getDistanceFromTop(track)}px`;
    sticky.style.top = stickyTop;
    const stickyBottom = `${getDistanceFromTop(track) + sticky.offsetHeight}px`;

    const moveWidth = move.offsetWidth;
    const windowWidth = window.innerWidth;
    track.style.height = `${moveWidth - windowWidth}px`;

    scrollAnimation({
      timeline: {
        trigger: track,
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
    const track: HTMLElement = wrapper.querySelector('.horizontal_track');
    const sticky: HTMLElement = track.querySelector('.horizontal_sticky');
    const move: HTMLElement = sticky.querySelector('.horizontal_list');

    const windowHeight = window.innerHeight;
    const listHeight = move.offsetHeight;

    const stickyTop = `${windowHeight / 2 - listHeight / 2}px`;
    const stickyBottom = `${windowHeight / 2 + listHeight / 2}px`;

    sticky.style.top = stickyTop;

    const moveWidth = move.offsetWidth;
    const windowWidth = window.innerWidth;
    track.style.height = `${moveWidth - windowWidth}px`;

    scrollAnimation({
      timeline: {
        trigger: track,
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
