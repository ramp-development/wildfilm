"use strict";
(() => {
  // bin/live-reload.js
  new EventSource(`http://localhost:${3e3}/esbuild`).addEventListener(
    "change",
    () => location.reload()
  );

  // node_modules/.pnpm/@finsweet+ts-utils@0.37.3/node_modules/@finsweet/ts-utils/dist/helpers/simulateEvent.js
  var simulateEvent = (target, events) => {
    if (!Array.isArray(events))
      events = [events];
    const eventsSuccess = events.map((event) => target.dispatchEvent(new Event(event, { bubbles: true })));
    return eventsSuccess.every((success) => success);
  };

  // node_modules/.pnpm/@finsweet+ts-utils@0.37.3/node_modules/@finsweet/ts-utils/dist/webflow/breakpoints.js
  var WEBFLOW_BREAKPOINTS = /* @__PURE__ */ new Map([
    ["tiny", "(max-width: 479px)"],
    ["small", "(max-width: 767px)"],
    ["medium", "(max-width: 991px)"],
    ["main", "(min-width: 992px)"]
  ]);

  // node_modules/.pnpm/@finsweet+ts-utils@0.37.3/node_modules/@finsweet/ts-utils/dist/webflow/getCurrentBreakpoint.js
  var getCurrentBreakpoint = () => {
    for (const [breakpoint, mediaQuery] of WEBFLOW_BREAKPOINTS) {
      if (window.matchMedia(mediaQuery).matches) {
        return breakpoint;
      }
    }
    return "main";
  };

  // src/utils/controlVideo.ts
  var controlVideo = (video, action) => {
    if (action === "play") {
      video.play();
    } else if (action === "pause") {
      video.pause();
    }
  };

  // src/pages/all.ts
  var all = () => {
    registerGSAP();
    initNav();
    videos();
    function registerGSAP() {
      gsap.registerPlugin(ScrollTrigger);
      ScrollTrigger.defaults({
        markers: false
      });
    }
    function initNav() {
      const navComponent = document.querySelector(".nav_component");
      const contactTrigger = navComponent.querySelector('[data-contact="trigger"]');
      const contactButtons = [...navComponent.querySelectorAll('[data-contact="button"]')];
      contactButtons.forEach((button) => {
        button.addEventListener("click", () => {
          simulateEvent(contactTrigger, "click");
        });
      });
      const navForm = navComponent.querySelector("form");
      const navFormButton = navForm.querySelector(".button");
      navFormButton.addEventListener("click", () => {
        navForm.requestSubmit();
      });
    }
    function videos() {
      const videoWrappers = [...document.querySelectorAll(".video_embed, .services_item")];
      if (getCurrentBreakpoint() === "main") {
        videoWrappers.forEach((videoWrapper) => {
          const video = videoWrapper.querySelector("video");
          controlVideo(video, "pause");
          videoWrapper.addEventListener("mouseover", () => {
            controlVideo(video, "play");
          });
          videoWrapper.addEventListener("mouseout", () => {
            controlVideo(video, "pause");
          });
        });
      }
    }
  };

  // src/pages/blog.ts
  var blog = () => {
  };

  // src/pages/careersList.ts
  var careersList = () => {
  };

  // src/utils/scrollAnimation.ts
  var scrollAnimation = (config) => {
    const { scrub } = config.timeline;
    config.timeline.scrub = scrub ? scrub : 1;
    const timeline = gsap.timeline({
      scrollTrigger: config.timeline
    });
    const { duration } = config.options;
    config.options.duration = duration ? duration : 1;
    timeline.to(config.timeline.target, config.options);
  };

  // src/pages/culture.ts
  var culture = () => {
    heroScroll();
    storyTextHighlight();
    processScroll();
    function heroScroll() {
      const component = document.querySelector(".sticky_component");
      const hero = document.querySelector(".hero");
      const track = hero.querySelector(".horizontal_track");
      const move = track.querySelector(".horizontal_list");
      const heroHeight = hero.offsetHeight;
      const moveWidth = move.offsetWidth;
      const windowWidth = window.innerWidth;
      component.style.height = `${heroHeight + (moveWidth - windowWidth)}px`;
      scrollAnimation({
        timeline: {
          trigger: component,
          target: move,
          start: `top top`,
          end: `bottom bottom`
        },
        options: {
          x: function() {
            return (moveWidth - windowWidth) * -1;
          }
        }
      });
    }
    function storyTextHighlight() {
      const storyTexts = [...document.querySelectorAll(".story_text")];
      storyTexts.forEach((trigger) => {
        new IntersectionObserver(
          (entries, observer) => {
            entries.forEach((entry) => {
              if (entry.isIntersecting) {
                entry.target.classList.add("is-active");
              }
            });
          },
          {
            rootMargin: "0px 0px -45% 0px",
            threshold: 0.5
          }
        ).observe(trigger);
      });
    }
    function processScroll() {
      const wrapper = document.querySelector(".process_wrapper");
      const sticky = wrapper.querySelector(".process_sticky");
      const track = sticky.querySelector(".process_track");
      const move = track.querySelector(".horizontal_list");
      const windowHeight = window.innerHeight;
      const listHeight = move.offsetHeight;
      const stickyTop = `${windowHeight / 2 - listHeight / 2}px`;
      const stickyBottom = `${windowHeight / 2 + listHeight / 2}px`;
      sticky.style.top = stickyTop;
      const moveWidth = move.offsetWidth;
      const windowWidth = window.innerWidth;
      wrapper.style.height = `${moveWidth - windowWidth}px`;
      scrollAnimation({
        timeline: {
          trigger: wrapper,
          target: move,
          start: `top ${stickyTop}`,
          end: `bottom ${stickyBottom}`
        },
        options: {
          x: function() {
            return (moveWidth - windowWidth) * -1;
          }
        }
      });
    }
  };

  // src/pages/home.ts
  var home = () => {
    heroScroll();
    const breakpoint = getCurrentBreakpoint();
    if (breakpoint === "main")
      featuredWork();
    services();
    function heroScroll() {
      const track = document.querySelector(".home-hero_track");
      const target = track.querySelector(".home-hero_video");
      const bound = target.getBoundingClientRect();
      const distanceToBottom = window.innerHeight - bound.bottom;
      scrollAnimation({
        timeline: {
          trigger: track,
          target,
          start: "top top",
          end: "bottom bottom"
        },
        options: {
          y: distanceToBottom,
          width: "100vw",
          height: "100vh"
        }
      });
    }
    function featuredWork() {
      const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const featuredWorkRows = [...document.querySelectorAll(".featured-work_row")];
      featuredWorkRows.forEach((featuredWorkRow) => {
        const featuredWorkMetaList = featuredWorkRow.querySelector(".featured-meta_list");
        if (!featuredWorkMetaList)
          return;
        const featuredWorkMetaLinks = [
          ...featuredWorkMetaList.querySelectorAll(".featured-meta_link")
        ];
        const featuredWorkItems = [...featuredWorkRow.querySelectorAll(".featured-work_item")];
        featuredWorkItems.forEach((featuredWorkItem, index) => {
          const featuredWorkMetaItem = featuredWorkMetaLinks[index];
          featuredWorkItem.addEventListener("mouseover", () => {
            const offset = featuredWorkMetaItem.offsetTop;
            featuredWorkMetaList.scrollTo({
              top: offset,
              behavior: prefersReducedMotion ? "auto" : "smooth"
            });
          });
        });
      });
    }
    function services() {
      const servicesList = document.querySelector(".services_list");
      if (!servicesList)
        return;
      let currentOffset = 0;
      let rows = 1;
      const serviceItems = [...servicesList?.querySelectorAll(".services_item")];
      serviceItems.forEach((item) => {
        const itemOffsetTop = item.offsetTop;
        if (itemOffsetTop > currentOffset) {
          if (rows % 2)
            item.style.marginLeft = "auto";
          currentOffset = itemOffsetTop;
          rows += 1;
        }
      });
    }
  };

  // src/pages/worklist.ts
  var workList = () => {
  };

  // src/pages/workTemplate.ts
  var workTemplate = () => {
  };

  // src/index.ts
  window.Webflow ||= [];
  window.Webflow.push(() => {
    const { pathname } = window.location;
    all();
    switch (pathname) {
      case "/":
        home();
        break;
      case "/work":
        workList();
        break;
      case "/culture":
        culture();
        break;
      case "/blog":
        blog();
        break;
      case "/careers":
        careersList();
        break;
      case pathname.includes("/work/"):
        workTemplate();
        break;
    }
  });
})();
//# sourceMappingURL=index.js.map
