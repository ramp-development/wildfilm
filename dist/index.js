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
    const breakpoint = getCurrentBreakpoint();
    switch (breakpoint) {
      case "main":
        videos();
        break;
      case "medium":
        break;
      case "small":
        break;
      case "tiny":
        break;
    }
    function registerGSAP() {
      gsap.registerPlugin(ScrollTrigger);
      ScrollTrigger.defaults({
        markers: false
      });
    }
    function initNav() {
      const navComponent = document.querySelector(".nav_component");
      if (!navComponent)
        return;
      const contactTrigger = navComponent.querySelector(
        '[data-contact="trigger"]'
      );
      const contactButtons = [
        ...navComponent.querySelectorAll('[data-contact="button"]')
      ];
      if (contactTrigger && contactButtons && contactButtons.length > 0) {
        contactButtons.forEach((button) => {
          button.addEventListener("click", () => {
            simulateEvent(contactTrigger, "click");
          });
        });
      }
      const navForm = navComponent.querySelector("form");
      if (!navForm)
        return;
      const navFormButton = navForm.querySelector(".button");
      if (!navFormButton)
        return;
      navFormButton.addEventListener("click", () => {
        navForm.requestSubmit();
      });
    }
    function videos() {
      const videoWrappers = [...document.querySelectorAll(".video_embed, .services_item")];
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
  };

  // src/pages/blog.ts
  var blog = () => {
  };

  // src/pages/careersList.ts
  var careersList = () => {
  };

  // src/utils/imagesLoaded.ts
  var imagesLoaded = (toCheck, callback) => {
    if (!toCheck)
      toCheck = [...document.querySelectorAll("img")];
    if (!Array.isArray(toCheck))
      toCheck = [...toCheck];
    const numberOfImages = toCheck.length;
    let numberLoaded = 0;
    toCheck.forEach((image) => {
      const tempImage = new Image();
      tempImage.src = image.src;
      tempImage.onload = function() {
        numberLoaded += 1;
        if (numberLoaded === numberOfImages)
          callback();
      };
    });
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
      const hero = document.querySelector(".hero");
      if (!hero)
        return;
      const images = [...hero.querySelectorAll("img")];
      if (images.length === 0)
        return;
      imagesLoaded(images, init);
      function init() {
        const component = document.querySelector(".sticky_component");
        if (!component)
          return;
        const hero2 = component.querySelector(".hero");
        if (!hero2)
          return;
        const track = hero2.querySelector(".horizontal_track");
        if (!track)
          return;
        const move = track.querySelector(".horizontal_list");
        if (!move)
          return;
        const heroHeight = hero2.offsetHeight;
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
            x: () => (moveWidth - windowWidth) * -1
          }
        });
      }
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
            rootMargin: "0px 0px -20% 0px",
            threshold: 0.5
          }
        ).observe(trigger);
      });
    }
    function processScroll() {
      const target = document.querySelector(".section_how");
      if (!target)
        return;
      const observer = new IntersectionObserver(init);
      observer.observe(target);
      function init() {
        const wrapper = document.querySelector(".process_wrapper");
        if (!wrapper)
          return;
        const sticky = wrapper.querySelector(".process_sticky");
        if (!sticky)
          return;
        const track = sticky.querySelector(".process_track");
        if (!track)
          return;
        const move = track.querySelector(".horizontal_list");
        if (!move)
          return;
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
            x: () => (moveWidth - windowWidth) * -1
          }
        });
      }
    }
  };

  // src/pages/home.ts
  var home = () => {
    heroScroll();
    const breakpoint = getCurrentBreakpoint();
    switch (breakpoint) {
      case "main":
        featuredWork();
        services();
        break;
      case "medium":
        services();
        break;
      case "small":
        break;
      case "tiny":
        break;
    }
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
        featuredWorkItems.forEach((featuredWorkItem) => {
          const featuredWorkLink = featuredWorkItem.querySelector("a");
          const destination = featuredWorkLink.href;
          const featuredWorkMetaItem = featuredWorkMetaLinks.find((link) => {
            return link.href === destination;
          });
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
