export interface Config {
  timeline: {
    trigger: HTMLElement;
    scroller?: HTMLElement;
    target: HTMLElement;
    start: string;
    end: string;
    scrub?: number;
  };
  options: {
    [key: string]: string | number;
  };
}

export const scrollAnimation = (config: Config) => {
  const { scrub } = config.timeline;
  config.timeline.scrub = scrub ? scrub : 1;

  const timeline = gsap.timeline({
    scrollTrigger: config.timeline,
  });

  const { duration } = config.options;
  config.options.duration = duration ? duration : 1;
  timeline.to(config.timeline.target, config.options);
};
