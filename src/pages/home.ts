import { scrollAnimation } from '../utils/scrollAnimation';

export const home = () => {
  heroScroll();
  featuredWork();

  function heroScroll() {
    const track: HTMLElement = document.querySelector('.home-hero_track');
    const target: HTMLElement = track.querySelector('.home-hero_video');

    const bound = target.getBoundingClientRect();
    const distanceToBottom = window.innerHeight - bound.bottom;

    scrollAnimation({
      timeline: {
        trigger: track,
        target,
        start: 'top top',
        end: 'bottom bottom',
      },
      options: {
        y: distanceToBottom,
        width: '100vw',
        height: '100vh',
      },
    });
  }

  function featuredWork() {
    const workMetaWrapper = document.querySelector('.featured-meta_wrapper');
    if (!workMetaWrapper) return;
    const workMetaLinks = [...workMetaWrapper.querySelectorAll('.featured-meta_link')];
    const workItems = [...document.querySelectorAll('.featured-work_item')];

    const padding = workMetaLinks[0].offsetLeft;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    workItems.forEach((item, index) => {
      const workMetaItem = workMetaLinks[index];

      item.addEventListener('mouseover', () => {
        const offset = workMetaItem.offsetLeft;

        workMetaLinks.forEach((link) => {
          link.style.opacity = link === workMetaItem ? '1' : '0.1';
        });

        workMetaWrapper.scrollTo({
          left: offset - padding,
          behavior: prefersReducedMotion ? 'auto' : 'smooth',
        });
      });

      item.addEventListener('mouseout', () => {
        workMetaLinks.forEach((link) => {
          link.style.opacity = '1';
        });
      });
    });
  }
};
