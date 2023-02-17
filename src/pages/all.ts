import { getCurrentBreakpoint, simulateEvent } from '@finsweet/ts-utils';

import { controlVideo } from '$utils/controlVideo';

export const all = () => {
  registerGSAP();
  initNav();
  videos();

  function registerGSAP() {
    gsap.registerPlugin(ScrollTrigger);
    ScrollTrigger.defaults({
      markers: false,
    });
  }

  function initNav() {
    const navComponent = document.querySelector('.nav_component');

    const contactTrigger = navComponent.querySelector('[data-contact="trigger"]');
    const contactButtons = [...navComponent.querySelectorAll('[data-contact="button"]')];
    contactButtons.forEach((button) => {
      button.addEventListener('click', () => {
        simulateEvent(contactTrigger, 'click');
      });
    });

    const navForm = navComponent.querySelector('form');
    const navFormButton = navForm.querySelector('.button');
    navFormButton.addEventListener('click', () => {
      navForm.requestSubmit();
    });
  }

  function videos() {
    const videoWrappers = [...document.querySelectorAll('.video_embed, .services_item')];
    if (getCurrentBreakpoint() === 'main') {
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
    }
  }
};
