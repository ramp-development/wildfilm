import { controlVideo } from './controlVideo';

export const controlVideos = (videos: HTMLVideoElement[], action: 'play' | 'pause') => {
  videos.forEach((video) => {
    controlVideo(video, action);
  });
};
