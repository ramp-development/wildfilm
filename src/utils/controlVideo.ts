export const controlVideo = (video: HTMLVideoElement, action: 'play' | 'pause') => {
  if (action === 'play') {
    video.play();
  } else if (action === 'pause') {
    video.pause();
  }
};
