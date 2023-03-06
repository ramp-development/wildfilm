import { getCurrentBreakpoint, simulateEvent } from '@finsweet/ts-utils';

import { controlVideo } from '$utils/controlVideo';

export const all = () => {
  registerGSAP();
  initNav();

  // run breakpoint specific code
  const breakpoint = getCurrentBreakpoint();
  switch (breakpoint) {
    case 'main':
      videos();
      break;
    case 'medium':
      break;
    case 'small':
      break;
    case 'tiny':
      break;
  }

  function registerGSAP() {
    gsap.registerPlugin(ScrollTrigger);
    ScrollTrigger.defaults({
      markers: false,
    });
  }

  function initNav() {
    const navComponent: HTMLElement | null = document.querySelector('.nav_component');
    if (!navComponent) return;

    const contactTrigger: HTMLElement | null = navComponent.querySelector(
      '[data-contact="trigger"]'
    );
    const contactButtons: HTMLElement[] | null = [
      ...navComponent.querySelectorAll('[data-contact="button"]'),
    ];

    if (contactTrigger && contactButtons && contactButtons.length > 0) {
      contactButtons.forEach((button) => {
        button.addEventListener('click', () => {
          simulateEvent(contactTrigger, 'click');
        });
      });
    }

    const navForm: HTMLFormElement | null = navComponent.querySelector('form');
    if (!navForm) return;
    const navFormButton: HTMLElement | null = navForm.querySelector('.button');
    if (!navFormButton) return;
    navFormButton.addEventListener('click', () => {
      navForm.requestSubmit();
    });
  }

  function videos() {
    const videoWrappers = [...document.querySelectorAll('.video_embed, .services_item')];
    videoWrappers.forEach((videoWrapper) => {
      const video: HTMLVideoElement = videoWrapper.querySelector('video');
      controlVideo(video, 'pause');

      videoWrapper.addEventListener('mouseover', () => {
        controlVideo(video, 'play');
      });

      videoWrapper.addEventListener('mouseout', () => {
        controlVideo(video, 'pause');
      });
    });

    videoWrappers.forEach((videoWrapper) => {
      const item = videoWrapper.querySelector('[data-video-timestamp]');
      if (!item) return;

      const timestamp = item.dataset.videoTimestamp;
      const video = videoWrapper.querySelector('video');
      video.currentTime = timestamp;
    });
  }
};
