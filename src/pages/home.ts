import { getCurrentBreakpoint } from '@finsweet/ts-utils';

import { scrollAnimation } from '../utils/scrollAnimation';

export const home = () => {
  heroScroll();

  const breakpoint = getCurrentBreakpoint();
  if (breakpoint === 'main') featuredWork();

  services();

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
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const featuredWorkRows = [...document.querySelectorAll('.featured-work_row')];
    featuredWorkRows.forEach((featuredWorkRow) => {
      const featuredWorkMetaList = featuredWorkRow.querySelector('.featured-meta_list');
      if (!featuredWorkMetaList) return;

      const featuredWorkMetaLinks = [
        ...featuredWorkMetaList.querySelectorAll('.featured-meta_link'),
      ];
      const featuredWorkItems = [...featuredWorkRow.querySelectorAll('.featured-work_item')];

      featuredWorkItems.forEach((featuredWorkItem, index) => {
        const featuredWorkMetaItem = featuredWorkMetaLinks[index];

        featuredWorkItem.addEventListener('mouseover', () => {
          const offset = featuredWorkMetaItem.offsetTop;

          featuredWorkMetaList.scrollTo({
            top: offset,
            behavior: prefersReducedMotion ? 'auto' : 'smooth',
          });
        });
      });
    });
  }

  function services() {
    const servicesList = document.querySelector('.services_list');
    if (!servicesList) return;

    let currentOffset = 0;
    let rows = 1;
    const serviceItems = [...servicesList?.querySelectorAll('.services_item')];
    serviceItems.forEach((item) => {
      // align the items
      const itemOffsetTop = item.offsetTop;
      if (itemOffsetTop > currentOffset) {
        if (rows % 2) item.style.marginLeft = 'auto';
        currentOffset = itemOffsetTop;
        rows += 1;
      }
    });
  }
};
