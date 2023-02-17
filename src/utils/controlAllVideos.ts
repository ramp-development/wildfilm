import { controlVideo } from './controlVideo';

export const controlAllVideos = (action: 'play' | 'pause') => {
  const videos = [...document.querySelectorAll('video')];
  videos.forEach((video) => {
    const control = video.closest('[data-control="true"]');
    if (!control) controlVideo(video, action);
  });

  return videos;
};
