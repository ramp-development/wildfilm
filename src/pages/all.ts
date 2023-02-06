import { getCurrentBreakpoint } from '@finsweet/ts-utils';

import { controlAllVideos } from '$utils/controlAllVideos';

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
    const navForm = navComponent.querySelector('form');
    const navFormButton = navForm.querySelector('.button');
    navFormButton.addEventListener('click', () => {
      navForm.requestSubmit();
    });
  }

  function videos() {
    const videoWrappers = [...document.querySelectorAll('.video_embed')];
    if (getCurrentBreakpoint() === 'main') {
      videoWrappers.forEach((videoWrapper) => {
        const video = videoWrapper.querySelector('video');

        videoWrapper.addEventListener('mouseover', () => {
          controlAllVideos('pause');
          video.play();
        });

        videoWrapper.addEventListener('mouseout', () => {
          controlAllVideos('play');
        });
      });
    }
  }
};
