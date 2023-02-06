import { controlVideo } from './controlVideo';

export const controlAllVideos = (action: 'play' | 'pause') => {
  const videos = [...document.querySelectorAll('video')];
  videos.forEach((video) => {
    controlVideo(video, action);
  });
};
